"""Domain model for blockchain assets in the Nexora platform.

This module defines the core domain abstractions for blockchain assets.
It belongs to the Domain Layer and is intentionally decoupled from
database ORMs, API schemas, and blockchain provider implementations.
"""

from __future__ import annotations

from decimal import Decimal
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.network import NetworkType


class AssetType(StrEnum):
   """Semantic classification of a blockchain asset.

   The enumeration captures high-level asset categories without
   prescribing specific token standards (e.g., ERC-20, SPL, SEP-0001).
   Protocol-level details are the responsibility of infrastructure
   adapters, not the domain model.
   """

   NATIVE = "native"
   """Layer-1 native coin used for network fees and staking."""

   TOKEN = "token"
   """Fungible token issued on a host blockchain."""

   STABLECOIN = "stablecoin"
   """Token pegged to an external reference asset, typically fiat."""

   WRAPPED = "wrapped"
   """Tokenized representation of an asset from a foreign blockchain."""

   NFT = "nft"
   """Non-fungible token representing unique digital ownership."""

   UNKNOWN = "unknown"
   """Unclassified or yet-to-be-determined asset type."""


class Asset(BaseModel):
   """Immutable domain representation of a blockchain asset holding.

   An ``Asset`` instance describes both the intrinsic definition of a
   blockchain token or coin and the quantity held within a specific
   domain context (e.g., a wallet snapshot, portfolio line item, or
   treasury position).

   The model is blockchain-agnostic. It does not enforce ledger-specific
   address formats, token standards, or protocol invariants—those
   concerns belong to provider adapters in the infrastructure layer.

   Attributes:
       network: The blockchain network on which this asset resides.
       asset_type: Semantic classification of the asset.
       symbol: Trading or display symbol (e.g., 'ETH', 'USDC').
       name: Human-readable asset name.
       contract_address: On-chain identifier for token contracts.
       issuer: Issuing account or entity (relevant for Stellar assets).
       decimals: Number of decimal places used in amount representation.
       balance: Quantity of the asset held.
       is_verified: Whether the asset has passed platform verification.
   """

   model_config = ConfigDict(
       frozen=True,
       strict=True,
       populate_by_name=True,
   )

   network: NetworkType = Field(
       ...,
       title="Network",
       description="Blockchain network where this asset is deployed or held.",
   )
   asset_type: AssetType = Field(
       ...,
       title="Asset Type",
       description="Semantic classification of the asset.",
   )
   symbol: str = Field(
       ...,
       min_length=1,
       max_length=20,
       title="Symbol",
       description="Short trading symbol or ticker, e.g. 'ETH', 'USDC', 'XLM'.",
   )
   name: str = Field(
       ...,
       min_length=1,
       max_length=200,
       title="Name",
       description="Human-readable asset name, e.g. 'Ethereum', 'USD Coin'.",
   )
   contract_address: str | None = Field(
       default=None,
       min_length=1,
       max_length=255,
       title="Contract Address",
       description="Smart contract or token account address. None for native assets.",
   )
   issuer: str | None = Field(
       default=None,
       min_length=1,
       max_length=255,
       title="Issuer",
       description="Issuing account or entity. Primarily used for Stellar assets.",
   )
   decimals: int = Field(
       default=0,
       ge=0,
       le=255,
       title="Decimals",
       description="Number of decimal places the asset supports.",
   )
   balance: Decimal = Field(
       default=Decimal("0"),
       ge=Decimal("0"),
       title="Balance",
       description="Quantity of the asset held. Must be non-negative.",
   )
   is_verified: bool = Field(
       default=False,
       title="Is Verified",
       description="Indicates whether the asset has passed platform verification checks.",
   )

   @field_validator("balance", mode="before")
   @classmethod
   def _coerce_balance_to_decimal(cls, value: object) -> Decimal:
       """Normalize balance input to Decimal for precise financial arithmetic."""
       if isinstance(value, Decimal):
           return value
       if isinstance(value, (int, float, str)):
           return Decimal(str(value))
       return Decimal(value)

   @field_validator("symbol")
   @classmethod
   def _normalize_symbol(cls, value: str) -> str:
       """Strip whitespace and normalize symbol to uppercase."""
       return value.strip().upper()


__all__ = [
   "AssetType",
   "Asset",
]
