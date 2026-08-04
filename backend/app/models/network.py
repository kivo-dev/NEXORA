"""Domain model for blockchain networks in the Nexora platform.

This module defines the core domain abstractions for supported blockchain
networks. It belongs to the Domain Layer and is intentionally free of
business logic, API schema concerns, and database ORM mappings.
"""

from __future__ import annotations

from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, field_validator


class NetworkFamily(StrEnum):
   """Technical family classification of a blockchain architecture.

   Families group networks by their underlying design paradigm,
   enabling infrastructure layers to apply the correct addressing,
   serialization, and interaction strategies without embedding that
   logic inside the domain model.
   """

   EVM = "evm"
   """Ethereum Virtual Machine compatible networks."""

   UTXO = "utxo"
   """Unspent Transaction Output based networks."""

   ACCOUNT_BASED = "account_based"
   """Account-based non-EVM networks."""

   UNKNOWN = "unknown"
   """Unclassified or yet-to-be-determined family."""


class NetworkType(StrEnum):
   """Canonical identifiers for supported blockchain network types.

   Each member represents a distinct chain identity. EVM-compatible
   layers receive their own members rather than collapsing into a
   generic ``ETHEREUM`` value, preserving distinct network identity
   across the platform.
   """

   # EVM-compatible networks
   ETHEREUM = "ethereum"
   POLYGON = "polygon"
   BNB_CHAIN = "bnb_chain"
   ARBITRUM = "arbitrum"
   OPTIMISM = "optimism"
   BASE = "base"
   AVALANCHE = "avalanche"

   # Non-EVM networks
   BITCOIN = "bitcoin"
   SOLANA = "solana"
   STELLAR = "stellar"
   TRON = "tron"
   SUI = "sui"
   APTOS = "aptos"

   UNKNOWN = "unknown"
   """Placeholder for unrecognized or yet-to-be-classified networks."""


class Network(BaseModel):
   """Immutable domain representation of a blockchain network.

   A ``Network`` instance captures the intrinsic, static properties of a
   blockchain ecosystem. It acts as a value object: equality is based
   entirely on field values, and mutations are disallowed after creation.

   Infrastructure concerns—such as RPC endpoints, chain identifiers,
   wallet derivation paths, or gas configuration—are deliberately
   excluded and belong to adapter or application services in other
   layers.

   Attributes:
       type: Canonical network classification.
       family: Technical architecture family of the network.
       display_name: Human-readable network name.
       symbol: Short ticker or abbreviation.
       native_token: Name of the network's native gas / fee asset.
       explorer_url: Optional primary block explorer.
       provider_name: Optional preferred infrastructure provider.
       is_supported: Whether the platform currently enables this network.
   """

   model_config = ConfigDict(
       frozen=True,
       strict=True,
       populate_by_name=True,
   )

   type: NetworkType = Field(
       ...,
       title="Network Type",
       description="Canonical classification of the blockchain network.",
   )
   family: NetworkFamily = Field(
       ...,
       title="Network Family",
       description="Technical architecture family of the network.",
   )
   display_name: str = Field(
       ...,
       min_length=1,
       max_length=100,
       title="Display Name",
       description="Human-readable name, e.g. 'Ethereum Mainnet'.",
   )
   symbol: str = Field(
       ...,
       min_length=1,
       max_length=20,
       title="Symbol",
       description="Short ticker or abbreviation, e.g. 'ETH', 'SOL', 'XLM'.",
   )
   native_token: str = Field(
       ...,
       min_length=1,
       max_length=100,
       title="Native Token",
       description="Name of the network's native token asset, e.g. 'Ether'.",
   )
   explorer_url: HttpUrl | None = Field(
       default=None,
       title="Explorer URL",
       description="Official block explorer for transaction and account lookup.",
   )
   provider_name: str | None = Field(
       default=None,
       min_length=1,
       max_length=100,
       title="Provider Name",
       description="Preferred infrastructure provider, e.g. 'Alchemy', 'Helius'.",
   )
   is_supported: bool = Field(
       default=False,
       title="Is Supported",
       description="Flag indicating whether the platform currently supports this network.",
   )

   @field_validator("type", mode="before")
   @classmethod
   def _normalize_network_type(cls, value: object) -> NetworkType:
       """Normalize raw input to a canonical NetworkType member."""
       if isinstance(value, NetworkType):
           return value
       if isinstance(value, str):
           normalized = value.strip().upper()
           try:
               return NetworkType(normalized)
           except ValueError:
               return NetworkType.UNKNOWN
       raise TypeError("Network type must be a string or NetworkType")

   @field_validator("family", mode="before")
   @classmethod
   def _normalize_network_family(cls, value: object) -> NetworkFamily:
       """Normalize raw input to a canonical NetworkFamily member."""
       if isinstance(value, NetworkFamily):
           return value
       if isinstance(value, str):
           normalized = value.strip().upper()
           try:
               return NetworkFamily(normalized)
           except ValueError:
               return NetworkFamily.UNKNOWN
       raise TypeError("Network family must be a string or NetworkFamily")

   @field_validator("display_name", "symbol", "native_token", mode="before")
   @classmethod
   def _validate_required_text(cls, value: object) -> str:
       """Ensure required text fields are non-empty strings after stripping."""
       if not isinstance(value, str):
           raise TypeError("Field must be a string")
       stripped = value.strip()
       if not stripped:
           raise ValueError("Field must not be empty")
       return stripped

   @field_validator("provider_name", mode="before")
   @classmethod
   def _validate_optional_text(cls, value: object) -> str | None:
       """Ensure optional text fields are non-empty when provided."""
       if value is None:
           return value
       if not isinstance(value, str):
           raise TypeError("Provider name must be a string or None")
       stripped = value.strip()
       if not stripped:
           raise ValueError("Provider name must not be empty when provided")
       return stripped


__all__ = [
   "NetworkFamily",
   "NetworkType",
   "Network",
]
