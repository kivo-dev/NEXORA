"""Domain model for blockchain wallets in the Nexora platform.

This module defines the core domain abstraction for a blockchain wallet.
It belongs to the Domain Layer and contains no business logic, persistence
concerns, or API schema details.
"""

from __future__ import annotations

from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.network import NetworkType


class WalletType(StrEnum):
    """Canonical classification of wallet implementations."""

    EOA = "eoa"
    """Externally Owned Account — controlled by a private key."""

    CONTRACT = "contract"
    """Smart-contract based wallet (e.g., Safe, Argent)."""

    MULTISIG = "multisig"
    """Wallet requiring multiple signatures for authorization."""

    UNKNOWN = "unknown"
    """Unclassified or yet-to-be-determined wallet type."""


class Wallet(BaseModel):
    """Immutable domain representation of a blockchain wallet.

    A ``Wallet`` captures the static identity and classification of a
    blockchain address within the Nexora platform. It intentionally
    excludes runtime state such as balances, transaction history, or
    synchronization status, which are managed by application services
    or other domain aggregates.

    Attributes:
        address: On-chain address of the wallet.
        network: Blockchain network to which the address belongs.
        wallet_type: Classification of the wallet implementation.
        label: Optional human-readable identifier or tag.
    """

    model_config = ConfigDict(
        frozen=True,
        strict=True,
        populate_by_name=True,
    )

    address: str = Field(
        ...,
        min_length=1,
        title="Address",
        description="On-chain wallet address.",
    )
    network: NetworkType = Field(
        ...,
        title="Network",
        description="Blockchain network associated with the wallet.",
    )
    wallet_type: WalletType = Field(
        ...,
        title="Wallet Type",
        description="Implementation category of the wallet.",
    )
    label: str | None = Field(
        default=None,
        max_length=200,
        title="Label",
        description="Optional human-readable name or tag for the wallet.",
    )

    @field_validator("address", mode="before")
    @classmethod
    def _validate_address(cls, value: object) -> str:
        """Ensure the address is a non-empty string after stripping."""
        if not isinstance(value, str):
            raise TypeError("Wallet address must be a string")
        stripped = value.strip()
        if not stripped:
            raise ValueError("Wallet address must not be empty")
        return stripped

    @field_validator("wallet_type", mode="before")
    @classmethod
    def _normalize_wallet_type(cls, value: object) -> WalletType:
        """Normalize raw input to a canonical WalletType member."""
        if isinstance(value, WalletType):
            return value
        if isinstance(value, str):
            normalized = value.strip().lower()
            try:
                return WalletType(normalized)
            except ValueError:
                return WalletType.UNKNOWN
        raise TypeError("Wallet type must be a string or WalletType")

    @field_validator("network", mode="before")
    @classmethod
    def _normalize_network(cls, value: object) -> NetworkType:
        """Normalize raw input to a canonical NetworkType member."""
        if isinstance(value, NetworkType):
            return value
        if isinstance(value, str):
            normalized = value.strip().lower()
            try:
                return NetworkType(normalized)
            except ValueError:
                return NetworkType.UNKNOWN
        raise TypeError("Network must be a string or NetworkType")


__all__ = [
    "WalletType",
    "Wallet",
]
