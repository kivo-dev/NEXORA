"""Blockchain provider factory for the Nexora platform.

This module belongs to the Blockchain Infrastructure Layer. Its sole
responsibility is to resolve a :class:`NetworkType` into a concrete
:class:`BlockchainProvider` instance by delegating provider-class
lookup to :class:`ProviderRegistry`.

No RPC calls, API requests, address detection, or business logic are
performed here.
"""

from __future__ import annotations

from collections.abc import Callable

from app.blockchain.provider import BlockchainProvider
from app.blockchain.registry import ProviderRegistry, ProviderRegistryError
from app.models.network import NetworkType


class BlockchainProviderError(Exception):
   """Raised when a blockchain provider cannot be resolved or instantiated.

   Args:
       network: The network type that could not be resolved.
       message: Optional override for the default error message.
   """

   def __init__(
       self,
       network: NetworkType,
       message: str | None = None,
   ) -> None:
       self.network = network
       self.message = message or (
           f"No provider available for network '{network.value}'."
       )
       super().__init__(self.message)


class BlockchainFactory:
   """Factory for creating blockchain provider instances.

   Delegates provider-class resolution to :class:`ProviderRegistry`
   and caches instantiated providers to avoid redundant initialization
   overhead.

   Optional provider factories enable dependency injection for providers
   that require constructor arguments.
   """

   def __init__(
       self,
       registry: ProviderRegistry | None = None,
       provider_factories: dict[type[BlockchainProvider], Callable[[], BlockchainProvider]] | None = None,
   ) -> None:
       self._registry = registry or ProviderRegistry()
       self._provider_factories = provider_factories or {}
       self._providers: dict[NetworkType, BlockchainProvider] = {}

   def get_provider(self, network: NetworkType) -> BlockchainProvider:
       """Return the provider instance for the specified network.

       Caches instantiated providers to avoid redundant object creation.
       The ``UNKNOWN`` network is explicitly unsupported.

       Args:
           network: The target blockchain network.

       Returns:
           The concrete provider implementation for the network.

       Raises:
           TypeError: If *network* is not a :class:`NetworkType`.
           BlockchainProviderError: If the network is unsupported or
               provider instantiation fails.
       """
       if not isinstance(network, NetworkType):
           raise TypeError(
               f"Expected NetworkType, got {type(network).__name__}"
           )

       if network is NetworkType.UNKNOWN:
           raise BlockchainProviderError(network)

       if network in self._providers:
           return self._providers[network]

       try:
           provider_cls = self._registry.get_provider_class(network)
       except ProviderRegistryError as exc:
           raise BlockchainProviderError(network, str(exc)) from exc

       factory = self._provider_factories.get(provider_cls)
       if factory is not None:
           provider = factory()
       else:
           provider = provider_cls()

       self._providers[network] = provider
       return provider


__all__ = [
   "BlockchainProviderError",
   "BlockchainFactory",
]