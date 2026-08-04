"""Blockchain provider interface for the Nexora platform.

This module defines the abstract contract between the Service Layer
and the Blockchain Infrastructure Layer. Concrete implementations
reside in chain-specific provider modules and handle all network
communication with external RPC endpoints or APIs.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any


class BlockchainProvider(ABC):
    """Abstract base class for blockchain-specific provider implementations.

    Concrete subclasses encapsulate the communication logic for a
    particular blockchain network, exposing a uniform interface to
    the Service Layer. All on-chain data retrieval methods are
    asynchronous to accommodate external HTTP/RPC clients.
    """

    @abstractmethod
    def validate_address(self, address: str) -> bool:
        """Validate the format of a blockchain address.

        This operation is purely local and does not require network
        access, therefore it remains synchronous.

        Args:
            address: The address string to validate.

        Returns:
            ``True`` if the address conforms to the chain's expected
            format, otherwise ``False``.
        """
        ...

    @abstractmethod
    async def get_balance(self, address: str) -> Any:
        """Retrieve the native token balance for the given address.

        Args:
            address: The blockchain address to query.

        Returns:
            The native balance in the chain's smallest denomination
            or as a domain-specific type.
        """
        ...

    @abstractmethod
    async def get_transactions(self, address: str) -> Any:
        """Retrieve on-chain transactions for the given address.

        Args:
            address: The blockchain address to query.

        Returns:
            A collection of transaction objects or an empty result
            when no transactions are found.
        """
        ...

    @abstractmethod
    async def get_assets(self, address: str) -> Any:
        """Retrieve token assets held by the given address.

        Args:
            address: The blockchain address to query.

        Returns:
            A collection of asset objects or an empty result when
            no assets are found.
        """
        ...


__all__ = [
    "BlockchainProvider",
]
