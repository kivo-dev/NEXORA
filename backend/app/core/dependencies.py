"""FastAPI dependency providers for the Nexora platform.

This module belongs to the Core layer and wires together the
Blockchain Infrastructure Layer and Service Layer for injection
into API route handlers.
"""

from __future__ import annotations

from app.blockchain.clients.alchemy import AlchemyClient
from app.blockchain.detector import AddressDetector
from app.blockchain.providers.ethereum import EthereumProvider
from app.blockchain.factory import BlockchainFactory
from app.services.wallet_service import WalletService


def get_wallet_service() -> WalletService:
    """Compose and return a fully wired WalletService instance.

    Instantiates an :class:`AlchemyClient`, injects it into
    :class:`EthereumProvider` via the factory's provider-factory map,
    and assembles the service layer.

    Returns:
        A :class:`WalletService` ready for use in API routes.
    """
    detector = AddressDetector()
    alchemy_client = AlchemyClient()

    factory = BlockchainFactory(
        provider_factories={
            EthereumProvider: lambda: EthereumProvider(alchemy_client),
        }
    )

    return WalletService(
        detector=detector,
        factory=factory,
    )


__all__ = [
    "get_wallet_service",
]
