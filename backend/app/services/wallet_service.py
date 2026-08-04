"""Wallet service for the Nexora platform.

This module belongs to the Service Layer. It orchestrates wallet
discovery, validation, and on-chain data retrieval by composing
components from the Blockchain Infrastructure Layer and Domain Layer.
"""

from __future__ import annotations

from decimal import Decimal
from typing import Any

from app.blockchain.detector import AddressDetector, DetectionResult
from app.blockchain.factory import BlockchainFactory, BlockchainProviderError
from app.blockchain.provider import BlockchainProvider
from app.models.asset import Asset
from app.models.network import NetworkFamily, NetworkType
from app.models.transaction import Transaction
from app.models.wallet import Wallet, WalletType


class WalletServiceError(Exception):
    """Raised when a wallet service operation fails.

    Attributes:
        message: Human-readable description of the failure.
        status_code: Suggested HTTP status code for API callers.
            Defaults to 400 (client-side issue, e.g. an invalid or
            unsupported address). Call sites that wrap a downstream
            provider/RPC failure pass 502 instead, since those are
            upstream failures rather than bad input.
    """

    def __init__(self, message: str, *, status_code: int = 400) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class WalletService:
    """Orchestrates wallet lifecycle and on-chain data retrieval.

    This service acts as a boundary between the Blockchain
    Infrastructure Layer and higher-level application concerns. It
    delegates all provider-specific operations to the factory-resolved
    :class:`BlockchainProvider` and remains agnostic to concrete
    blockchain implementations.
    """

    def __init__(
        self,
        detector: AddressDetector,
        factory: BlockchainFactory,
    ) -> None:
        self._detector = detector
        self._factory = factory

    def create_wallet(self, address: str) -> Wallet:
        """Detect, validate, and materialize a :class:`Wallet` domain model.

        The address format is inspected to determine the blockchain
        network. For ambiguous families (e.g., EVM), the first
        candidate network returned by the detector is selected.

        Args:
            address: The on-chain wallet address.

        Returns:
            An immutable :class:`Wallet` domain model.

        Raises:
            WalletServiceError: If the address format is unrecognized,
                the network is unsupported, or the provider rejects the
                address as invalid.
        """
        if not isinstance(address, str):
            raise WalletServiceError("Wallet address must be a string.")

        cleaned = address.strip()
        if not cleaned:
            raise WalletServiceError("Wallet address must not be empty.")

        detection = self._detector.detect(cleaned)
        network = self._resolve_network(detection)
        provider = self._resolve_provider(network)

        if not provider.validate_address(cleaned):
            raise WalletServiceError(
                f"Address '{cleaned}' failed validation on {network.value}."
            )

        return Wallet(
            address=cleaned,
            network=network,
            wallet_type=WalletType.UNKNOWN,
            label=None,
        )

    async def get_balance(self, wallet: Wallet) -> Decimal:
        """Retrieve the native token balance for the given wallet.

        Args:
            wallet: A validated :class:`Wallet` domain model.

        Returns:
            The native token balance as a :class:`Decimal`.

        Raises:
            WalletServiceError: If the provider operation fails.
        """
        provider = self._resolve_provider(wallet.network)
        try:
            return await provider.get_balance(wallet.address)
        except Exception as exc:
            raise WalletServiceError(
                f"Failed to retrieve balance for {wallet.address}: {exc}",
                status_code=502,
            ) from exc

    async def get_transactions(self, wallet: Wallet) -> list[Transaction]:
        """Retrieve on-chain transactions for the given wallet.

        Args:
            wallet: A validated :class:`Wallet` domain model.

        Returns:
            A list of :class:`Transaction` domain models.

        Raises:
            WalletServiceError: If the provider operation fails.
        """
        provider = self._resolve_provider(wallet.network)
        try:
            return await provider.get_transactions(wallet.address)
        except Exception as exc:
            raise WalletServiceError(
                f"Failed to retrieve transactions for {wallet.address}: {exc}",
                status_code=502,
            ) from exc

    async def get_assets(self, wallet: Wallet) -> list[Asset]:
        """Retrieve token assets held by the given wallet.

        Args:
            wallet: A validated :class:`Wallet` domain model.

        Returns:
            A list of :class:`Asset` domain models.

        Raises:
            WalletServiceError: If the provider operation fails.
        """
        provider = self._resolve_provider(wallet.network)
        try:
            return await provider.get_assets(wallet.address)
        except Exception as exc:
            raise WalletServiceError(
                f"Failed to retrieve assets for {wallet.address}: {exc}",
                status_code=502,
            ) from exc

    async def analyze(self, address: str) -> dict[str, Any]:
        """Orchestrate a complete wallet analysis snapshot.

        Composes the wallet identity, native balance, transaction
        history, and token assets into a structured dictionary.

        Args:
            address: The on-chain wallet address to analyze.

        Returns:
            A dictionary containing the wallet address, network,
            status, message, and nested data with balance, transactions,
            and assets.

        Raises:
            WalletServiceError: If any step of the analysis fails.
        """
        wallet = self.create_wallet(address)
        balance = await self.get_balance(wallet)
        transactions = await self.get_transactions(wallet)
        assets = await self.get_assets(wallet)

        return {
            "address": wallet.address,
            "network": wallet.network.value,
            "status": "success",
            "message": "Wallet analysis completed successfully.",
            "data": {
                "balance": balance,
                "transactions": transactions,
                "assets": assets,
            },
        }

    def _resolve_network(self, detection: DetectionResult) -> NetworkType:
        """Select a concrete network type from a detection result.

        For unambiguous detections the single candidate is used. For
        ambiguous families (e.g., EVM) the first candidate is selected
        as the primary network.

        Args:
            detection: The result of address format detection.

        Returns:
            The selected :class:`NetworkType`.

        Raises:
            WalletServiceError: If the detection result contains no
                valid candidate networks.
        """
        if detection.family is NetworkFamily.UNKNOWN or not detection.networks:
            raise WalletServiceError(
                "Unable to detect a supported blockchain network for the "
                "provided address."
            )

        candidates = [
            n for n in detection.networks if n is not NetworkType.UNKNOWN
        ]
        if not candidates:
            raise WalletServiceError(
                "Detected network family is not currently supported."
            )

        return candidates[0]

    def _resolve_provider(self, network: NetworkType) -> BlockchainProvider:
        """Resolve a blockchain provider for the given network.

        Args:
            network: The target blockchain network.

        Returns:
            A concrete :class:`BlockchainProvider` instance.

        Raises:
            WalletServiceError: If no provider is available for the
                network.
        """
        try:
            return self._factory.get_provider(network)
        except (BlockchainProviderError, TypeError) as exc:
            raise WalletServiceError(str(exc)) from exc
        