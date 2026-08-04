"""Domain model for blockchain transactions in the Nexora platform.

This module defines the core domain abstractions for multi-chain
transactions. It belongs to the Domain Layer and is intentionally free
of business logic, API schema concerns, and database ORM mappings.
"""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.asset import Asset
from app.models.network import NetworkType


class TransactionType(StrEnum):
    """Canonical classification of transaction operations.

    Covers primary interaction patterns observed across EVM,
    Solana, Stellar, and future chain integrations.
    """

    SEND = "send"
    """Transfer of assets from one address to another."""

    RECEIVE = "receive"
    """Inbound receipt of assets."""

    SWAP = "swap"
    """Exchange of one asset for another, typically via DEX."""

    APPROVE = "approve"
    """Authorization for a third party to spend tokens."""

    MINT = "mint"
    """Creation of new token supply or NFTs."""

    BURN = "burn"
    """Permanent removal of tokens from circulation."""

    CONTRACT_INTERACTION = "contract_interaction"
    """Generic invocation of smart-contract functionality."""

    UNKNOWN = "unknown"
    """Unclassified or yet-to-be-categorized transaction."""


class TransactionStatus(StrEnum):
    """Lifecycle states of a transaction on-chain."""

    PENDING = "pending"
    """Submitted but not yet finalized."""

    CONFIRMED = "confirmed"
    """Included in a block and considered final."""

    FAILED = "failed"
    """Reverted or otherwise unsuccessful."""

    DROPPED = "dropped"
    """Evicted from mempool without inclusion."""

    UNKNOWN = "unknown"
    """State cannot be determined."""


class Transaction(BaseModel):
    """Immutable domain representation of a blockchain transaction.

    A ``Transaction`` captures the essential financial and metadata
    attributes of an on-chain operation without coupling to any
    specific blockchain provider, RPC client, or indexing service.

    All monetary values are represented as ``Decimal`` to prevent
    floating-point rounding errors. The model is intentionally agnostic
    to gas mechanics, block coordinates, and UI presentation concerns.

    Attributes:
        tx_hash: Unique transaction identifier (hash).
        network: Canonical network on which the transaction occurred.
        wallet_address: Address of the wallet that initiated or owns
            the transaction context.
        from_address: Originating address.
        to_address: Destination address, if applicable.
        asset: Primary asset involved in the transfer or operation.
        amount: Quantity of the primary asset. Non-negative.
        timestamp: UTC datetime of transaction finalization or
            submission.
        transaction_type: Classification of the operation.
        status: Current lifecycle state.
        fee: Network fee paid for inclusion. Non-negative.
        fee_asset: Asset in which the fee was denominated.
    """

    model_config = ConfigDict(
        frozen=True,
        strict=True,
        populate_by_name=True,
    )

    tx_hash: str = Field(
        ...,
        min_length=1,
        title="Transaction Hash",
        description="Unique on-chain transaction identifier.",
    )
    network: NetworkType = Field(
        ...,
        title="Network",
        description="Blockchain network where the transaction was executed.",
    )
    wallet_address: str = Field(
        ...,
        min_length=1,
        title="Wallet Address",
        description="Address of the contextual wallet account.",
    )
    from_address: str = Field(
        ...,
        min_length=1,
        title="From Address",
        description="Originating address of the transaction.",
    )
    to_address: str | None = Field(
        default=None,
        min_length=1,
        title="To Address",
        description="Destination address, if applicable.",
    )
    asset: Asset = Field(
        ...,
        title="Asset",
        description="Primary asset involved in the transaction.",
    )
    amount: Decimal = Field(
        ...,
        ge=0,
        title="Amount",
        description="Quantity of the primary asset.",
    )
    timestamp: datetime = Field(
        ...,
        title="Timestamp",
        description="UTC datetime of the transaction.",
    )
    transaction_type: TransactionType = Field(
        ...,
        title="Transaction Type",
        description="Classification of the on-chain operation.",
    )
    status: TransactionStatus = Field(
        ...,
        title="Status",
        description="Current lifecycle state of the transaction.",
    )
    fee: Decimal = Field(
        ...,
        ge=0,
        title="Fee",
        description="Network fee paid for transaction inclusion.",
    )
    fee_asset: Asset = Field(
        ...,
        title="Fee Asset",
        description="Asset denomination of the paid fee.",
    )

    @field_validator(
        "tx_hash",
        "wallet_address",
        "from_address",
        "to_address",
        mode="before",
    )
    @classmethod
    def _validate_address(cls, value: object) -> str | None:
        """Ensure address fields are non-empty strings after stripping."""
        if value is None:
            return value
        if not isinstance(value, str):
            raise TypeError("Address must be a string")
        stripped = value.strip()
        if not stripped:
            raise ValueError("Address must not be empty")
        return stripped

    @field_validator("transaction_type", mode="before")
    @classmethod
    def _normalize_transaction_type(cls, value: object) -> TransactionType:
        """Normalize raw input to a canonical TransactionType member."""
        if isinstance(value, TransactionType):
            return value
        if isinstance(value, str):
            normalized = value.strip().lower()
            try:
                return TransactionType(normalized)
            except ValueError:
                return TransactionType.UNKNOWN
        raise TypeError("Transaction type must be a string or TransactionType")

    @field_validator("amount", "fee", mode="before")
    @classmethod
    def _convert_to_decimal(cls, value: object) -> Decimal:
        """Safely coerce numeric or string input to Decimal."""
        if isinstance(value, Decimal):
            return value
        if isinstance(value, int):
            return Decimal(value)
        if isinstance(value, str):
            return Decimal(value.strip())
        if isinstance(value, float):
            # Convert via string to avoid binary floating-point artifacts
            return Decimal(str(value))
        raise TypeError("Financial value must be a number or string")


__all__ = [
    "TransactionType",
    "TransactionStatus",
    "Transaction",
]
