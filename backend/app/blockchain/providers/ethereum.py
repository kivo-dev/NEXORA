"""Ethereum blockchain provider for the Nexora platform.

This module belongs to the Blockchain Infrastructure Layer. It
implements the :class:`BlockchainProvider` interface for Ethereum
by delegating RPC operations to :class:`AlchemyClient`.
"""

from __future__ import annotations

import re
from decimal import Decimal

from app.blockchain.clients.alchemy import AlchemyClient
from app.blockchain.provider import BlockchainProvider
from app.models.asset import Asset
from app.models.transaction import Transaction


class EthereumProvider(BlockchainProvider):
    """Ethereum provider backed by Alchemy JSON-RPC.

    Delegates all on-chain communication to an injected
    :class:`AlchemyClient`.
    """

    _EVM_ADDRESS_PATTERN = re.compile(r"^0x[a-fA-F0-9]{40}$")

    def __init__(self, client: AlchemyClient) -> None:
        self._client = client

    def validate_address(self, address: str) -> bool:
        """Validate an Ethereum address format.

        Args:
            address: The address string to validate.

        Returns:
            ``True`` if the address matches the EVM hex format.
        """
        return bool(self._EVM_ADDRESS_PATTERN.match(address))

    async def get_balance(self, address: str) -> Decimal:
        """Retrieve the native ETH balance for an address.

        Args:
            address: The Ethereum address to query.

        Returns:
            The balance in ETH as a :class:`Decimal`.
        """
        wei_balance = await self._client.get_native_balance(address)
        return Decimal(wei_balance) / Decimal(10**18)

    async def get_transactions(self, address: str) -> list[Transaction]:
        """Retrieve on-chain transactions for an address.

        Args:
            address: The Ethereum address to query.

        Returns:
            An empty list until transaction retrieval is implemented.
        """
        return []

    async def get_assets(self, address: str) -> list[Asset]:
        """Retrieve token assets for an address.

        Args:
            address: The Ethereum address to query.

        Returns:
            An empty list until asset retrieval is implemented.
        """
        return []


__all__ = [
    "EthereumProvider",
]
