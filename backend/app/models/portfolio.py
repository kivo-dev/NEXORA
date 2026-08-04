"""Domain model for user portfolios in the Nexora platform.

This module defines the core domain abstractions representing a user's
collection of blockchain assets. It belongs to the Domain Layer and is
intentionally free of business logic, persistence concerns, and API
schema details.
"""

from __future__ import annotations

from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.asset import Asset
from app.models.wallet import Wallet


class PortfolioHolding(BaseModel):
    """Immutable domain representation of a single asset holding.

    A ``PortfolioHolding`` captures the quantity of a specific asset
    owned within a portfolio. It is a value object with no identity
    of its own.

    Attributes:
        asset: The blockchain asset being held.
        amount: The quantity of the asset, expressed as a Decimal.
    """

    model_config = ConfigDict(
        frozen=True,
        strict=True,
        populate_by_name=True,
    )

    asset: Asset = Field(
        ...,
        title="Asset",
        description="The blockchain asset held in the portfolio.",
    )
    amount: Decimal = Field(
        ...,
        ge=0,
        title="Amount",
        description="Quantity of the asset held.",
    )

    @field_validator("amount", mode="before")
    @classmethod
    def _convert_amount(cls, value: object) -> Decimal:
        """Safely coerce numeric or string input to Decimal."""
        if isinstance(value, Decimal):
            return value
        if isinstance(value, int):
            return Decimal(value)
        if isinstance(value, str):
            stripped = value.strip()
            if not stripped:
                raise ValueError("Amount must not be an empty string")
            return Decimal(stripped)
        if isinstance(value, float):
            # Convert via string to avoid binary floating-point artifacts
            return Decimal(str(value))
        raise TypeError("Amount must be a number or string")


class Portfolio(BaseModel):
    """Immutable domain representation of a user's asset portfolio.

    A ``Portfolio`` aggregates holdings across one or more blockchain
    assets for a specific wallet. It intentionally excludes market
    data, valuation logic, and synchronization state.

    Attributes:
        wallet: The wallet to which the portfolio belongs.
        holdings: Collection of individual asset holdings.
    """

    model_config = ConfigDict(
        frozen=True,
        strict=True,
        populate_by_name=True,
    )

    wallet: Wallet = Field(
        ...,
        title="Wallet",
        description="The wallet associated with this portfolio.",
    )
    holdings: list[PortfolioHolding] = Field(
        default_factory=list,
        title="Holdings",
        description="Collection of asset holdings in the portfolio.",
    )


__all__ = [
    "PortfolioHolding",
    "Portfolio",
]
