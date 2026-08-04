"""Provider registry for the Nexora Blockchain Infrastructure Layer.

This module manages the bidirectional mapping between canonical
:class:`NetworkType` values and their concrete
:class:`BlockchainProvider` implementations. It belongs to the
Blockchain Infrastructure Layer and performs no RPC calls, address
detection, or business logic.
"""

from __future__ import annotations

from app.blockchain.providers.ethereum import EthereumProvider
from app.blockchain.provider import BlockchainProvider
from app.blockchain.providers.solana import SolanaProvider
from app.blockchain.providers.stellar import StellarProvider
from app.models.network import NetworkType


class ProviderRegistryError(Exception):
   """Raised when a provider registration or lookup operation fails.

   Attributes:
       network: The network type involved in the failed operation.
       message: Human-readable description of the failure.
   """

   def __init__(
       self,
       network: NetworkType,
       message: str | None = None,
   ) -> None:
       self.network = network
       self.message = message or (
           f"No provider registered for network '{network.value}'."
       )
       super().__init__(self.message)


class ProviderRegistry:
   """Central registry mapping network types to provider classes.

   Maintains an internal dictionary that associates each
   :class:`NetworkType` with its concrete :class:`BlockchainProvider`
   subclass. The registry is intentionally decoupled from
   instantiation logic, which resides in the factory layer.
   """

   def __init__(self) -> None:
       self._registry: dict[NetworkType, type[BlockchainProvider]] = {}
       self._bootstrap()

   def _bootstrap(self) -> None:
       """Register built-in provider mappings."""
       self.register(NetworkType.ETHEREUM, EthereumProvider)
       self.register(NetworkType.SOLANA, SolanaProvider)
       self.register(NetworkType.STELLAR, StellarProvider)

   def register(
       self,
       network: NetworkType,
       provider_cls: type[BlockchainProvider],
   ) -> None:
       """Register a provider class for a network type.

       Args:
           network: The blockchain network to register.
           provider_cls: A concrete subclass of
               :class:`BlockchainProvider`.

       Raises:
           TypeError: If *provider_cls* is not a subclass of
               :class:`BlockchainProvider`.
           ProviderRegistryError: If *network* is
               ``NetworkType.UNKNOWN``.
       """
       if network is NetworkType.UNKNOWN:
           raise ProviderRegistryError(
               network=network,
               message="Cannot register a provider for NetworkType.UNKNOWN.",
           )

       if not isinstance(provider_cls, type) or not issubclass(
           provider_cls, BlockchainProvider
       ):
           raise TypeError(
               f"Provider class must be a subclass of BlockchainProvider, "
               f"got {provider_cls!r}"
           )

       self._registry[network] = provider_cls

   def get_provider_class(
       self,
       network: NetworkType,
   ) -> type[BlockchainProvider]:
       """Retrieve the registered provider class for a network.

       Args:
           network: The blockchain network to look up.

       Returns:
           The concrete provider class registered for the network.

       Raises:
           TypeError: If *network* is not a :class:`NetworkType`.
           ProviderRegistryError: If no provider has been registered
               for the given network.
       """
       if not isinstance(network, NetworkType):
           raise TypeError(
               f"Expected NetworkType, got {type(network).__name__}"
           )

       provider_cls = self._registry.get(network)
       if provider_cls is None:
           raise ProviderRegistryError(network)
       return provider_cls

   def is_registered(self, network: NetworkType) -> bool:
       """Check whether a provider has been registered for a network.

       Args:
           network: The blockchain network to check.

       Returns:
           ``True`` if a provider class is registered for the network,
           otherwise ``False``.
       """
       return network in self._registry

   def list_supported_networks(self) -> list[NetworkType]:
       """Return all network types that have registered providers.

       Returns:
           A sorted list of :class:`NetworkType` values with active
           provider registrations.
       """
       return sorted(self._registry.keys(), key=lambda n: n.value)


__all__ = [
   "ProviderRegistryError",
   "ProviderRegistry",
]
