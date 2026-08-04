"""Portfolio service for the Nexora platform.

This module belongs to the Service Layer. It orchestrates the retrieval
of on-chain asset holdings and assembles immutable :class:`Portfolio`
domain models by delegating to the Blockchain Infrastructure Layer.
"""

from __future__ import annotations

from app.blockchain.factory import BlockchainFactory, BlockchainProviderError
from app.blockchain.provider import BlockchainProvider
from app.models.asset import Asset
from app.models.network import NetworkType
from app.models.portfolio import Portfolio, PortfolioHolding
from app.models.wallet import Wallet


class PortfolioServiceError(Exception):
    """Raised when a portfolio service operation fails.

    Attributes:
        message: Human-readable description of the failure.
    """

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(self.message)


class PortfolioService:
    """Orchestrates portfolio assembly across supported blockchain networks.

    This service acts as a boundary between the Blockchain
    Infrastructure Layer and higher-level application concerns. It
    delegates all provider-specific operations to the factory-resolved
    :class:`BlockchainProvider` and remains agnostic to concrete
    blockchain implementations.
    """

    def __init__(self, factory: BlockchainFactory) -> None:
        self._factory = factory

    def get_portfolio(self, wallet: Wallet) -> Portfolio:
        """Retrieve and assemble a :class:`Portfolio` for the given wallet.

        Resolves the appropriate blockchain provider for the wallet's
        network, fetches the list of assets, and maps each asset into
        a :class:`PortfolioHolding`. No price discovery, valuation, or
        business analysis is performed.

        Args:
            wallet: A validated :class:`Wallet` domain model.

        Returns:
            An immutable :class:`Portfolio` domain model containing the
            wallet's current on-chain holdings.

        Raises:
            PortfolioServiceError: If the wallet is invalid, the network
                is unsupported, or the provider operation fails.
        """
        if not isinstance(wallet, Wallet):
            raise PortfolioServiceError("Expected a Wallet domain model.")

        cleaned_address = wallet.address.strip() if wallet.address else ""
        if not cleaned_address:
            raise PortfolioServiceError("Wallet address must not be empty.")

        provider = self._resolve_provider(wallet.network)

        try:
            assets = provider.get_assets(cleaned_address)
        except Exception as exc:
            raise PortfolioServiceError(
                f"Failed to retrieve assets for {cleaned_address}: {exc}"
            ) from exc

        holdings = self._map_assets_to_holdings(assets)
        return Portfolio(wallet=wallet, holdings=holdings)

    def _map_assets_to_holdings(
        self,
        assets: list[Asset],
    ) -> list[PortfolioHolding]:
        """Convert provider assets into portfolio holdings.

        Each asset's embedded balance is used as the holding amount.
        Entries that cannot be converted into valid domain holdings are
        skipped gracefully to accommodate provider placeholder data.

        Args:
            assets: List of :class:`Asset` objects returned by the
                blockchain provider.

        Returns:
            A list of :class:`PortfolioHolding` domain models.
        """
        holdings: list[PortfolioHolding] = []
        for asset in assets:
            try:
                holdings.append(
                    PortfolioHolding(asset=asset, amount=asset.balance)
                )
            except Exception:
                # Gracefully skip placeholder or incomplete entries
                # without halting the entire portfolio build.
                continue
        return holdings

    def _resolve_provider(self, network: NetworkType) -> BlockchainProvider:
        """Resolve a blockchain provider for the given network.

        Args:
            network: The target blockchain network type.

        Returns:
            A concrete :class:`BlockchainProvider` instance.

        Raises:
            PortfolioServiceError: If no provider is available for the
                network.
        """
        try:
            return self._factory.get_provider(network)
        except (BlockchainProviderError, TypeError) as exc:
            raise PortfolioServiceError(str(exc)) from exc

        