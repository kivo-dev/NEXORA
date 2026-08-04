"""Transaction service for the Nexora platform.

This module belongs to the Service Layer. It orchestrates the retrieval
of on-chain transaction data by delegating to the Blockchain
Infrastructure Layer while remaining agnostic to specific blockchain
implementations.
"""

from __future__ import annotations

from app.blockchain.factory import BlockchainFactory, BlockchainProviderError
from app.blockchain.provider import BlockchainProvider
from app.models.network import NetworkType
from app.models.transaction import Transaction
from app.models.wallet import Wallet


class TransactionServiceError(Exception):
    """Raised when a transaction service operation fails.

    Attributes:
        message: Human-readable description of the failure.
    """

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(self.message)


class TransactionService:
    """Orchestrates transaction retrieval across supported blockchain networks.

    This service acts as a boundary between the Blockchain
    Infrastructure Layer and higher-level application concerns. It
    delegates all provider-specific operations to the factory-resolved
    :class:`BlockchainProvider` and remains agnostic to concrete
    blockchain implementations.
    """

    def __init__(self, factory: BlockchainFactory) -> None:
        self._factory = factory

    def get_transactions(self, wallet: Wallet) -> list[Transaction]:
        """Retrieve on-chain transactions for the given wallet.

        Resolves the appropriate blockchain provider for the wallet's
        network and returns the raw transaction list without business
        analysis or transformation.

        Args:
            wallet: A validated :class:`Wallet` domain model.

        Returns:
            A list of :class:`Transaction` domain models as reported by
            the blockchain provider.

        Raises:
            TransactionServiceError: If the wallet is invalid, the
                network is unsupported, or the provider operation fails.
        """
        if not isinstance(wallet, Wallet):
            raise TransactionServiceError("Expected a Wallet domain model.")

        cleaned_address = wallet.address.strip() if wallet.address else ""
        if not cleaned_address:
            raise TransactionServiceError("Wallet address must not be empty.")

        provider = self._resolve_provider(wallet.network)

        try:
            transactions = provider.get_transactions(cleaned_address)
        except Exception as exc:
            raise TransactionServiceError(
                f"Failed to retrieve transactions for {cleaned_address}: {exc}"
            ) from exc

        return transactions

    def _resolve_provider(self, network: NetworkType) -> BlockchainProvider:
        """Resolve a blockchain provider for the given network.

        Args:
            network: The target blockchain network type.

        Returns:
            A concrete :class:`BlockchainProvider` instance.

        Raises:
            TransactionServiceError: If no provider is available for the
                network.
        """
        try:
            return self._factory.get_provider(network)
        except (BlockchainProviderError, TypeError) as exc:
            raise TransactionServiceError(str(exc)) from exc

