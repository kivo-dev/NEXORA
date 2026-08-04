"""Domain model for a wallet blockchain data snapshot in the Nexora platform.

This module defines the core domain abstraction representing the
aggregated on-chain data collected for a wallet prior to AI-powered
financial analysis. It belongs to the Domain Layer and is intentionally
free of business logic, persistence concerns, and API schema details.
"""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.asset import Asset
from app.models.portfolio import Portfolio
from app.models.transaction import Transaction
from app.models.wallet import Wallet


class WalletAnalysis(BaseModel):
   """Immutable domain representation of a wallet's blockchain data snapshot.

   A ``WalletAnalysis`` aggregates the raw on-chain state of a wallet
   at a specific point in time, including its identity, native balance,
   token assets, transaction history, and portfolio composition. It
   serves as the input boundary for analytical engines and remains
   entirely independent of AI provider implementations, database
   mappings, and presentation concerns.

   Attributes:
       wallet: The blockchain wallet identity.
       balance: Native token balance, if available.
       assets: Token assets associated with the wallet.
       transactions: On-chain transaction history.
       portfolio: Structured portfolio holdings, if assembled.
       created_at: UTC datetime when the snapshot was captured.
   """

   model_config = ConfigDict(
       frozen=True,
       strict=True,
       populate_by_name=True,
   )

   wallet: Wallet = Field(
       ...,
       title="Wallet",
       description="The blockchain wallet identity.",
   )
   balance: Decimal | None = Field(
       default=None,
       ge=0,
       title="Balance",
       description="Native token balance of the wallet, if available.",
   )
   assets: list[Asset] = Field(
       default_factory=list,
       title="Assets",
       description="Token assets held by the wallet.",
   )
   transactions: list[Transaction] = Field(
       default_factory=list,
       title="Transactions",
       description="On-chain transaction history for the wallet.",
   )
   portfolio: Portfolio | None = Field(
       default=None,
       title="Portfolio",
       description="Structured portfolio holdings, if assembled.",
   )
   created_at: datetime = Field(
       ...,
       title="Created At",
       description="UTC datetime when the snapshot was captured.",
   )

   @field_validator("balance", mode="before")
   @classmethod
   def _convert_balance(cls, value: object) -> Decimal | None:
       """Safely coerce numeric or string input to Decimal."""
       if value is None:
           return value
       if isinstance(value, Decimal):
           return value
       if isinstance(value, int):
           return Decimal(value)
       if isinstance(value, str):
           stripped = value.strip()
           if not stripped:
               raise ValueError("Balance must not be an empty string")
           return Decimal(stripped)
       if isinstance(value, float):
           # Convert via string to avoid binary floating-point artifacts
           return Decimal(str(value))
       raise TypeError("Balance must be a number, string, or None")


__all__ = [
   "WalletAnalysis",
]
