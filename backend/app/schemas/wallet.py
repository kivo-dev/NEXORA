"""
Pydantic schemas for the wallet API surface.

These define the HTTP contract only (request/response shapes and
validation). They must stay free of business logic — that belongs in
app/services and app/wallet.
"""

from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, Field


class BlockchainNetwork(str, Enum):
    """Supported / recognizable blockchain networks.

    New chains are added here as detection and providers are implemented.
    """

    ETHEREUM = "ethereum"
    SOLANA = "solana"
    STELLAR = "stellar"
    UNKNOWN = "unknown"


class WalletStatus(str, Enum):
    """High-level outcome of a wallet analysis request."""

    SUCCESS = "success"
    UNSUPPORTED_NETWORK = "unsupported_network"
    INVALID_ADDRESS = "invalid_address"
    NOT_IMPLEMENTED = "not_implemented"
    ERROR = "error"


class WalletAnalyzeRequest(BaseModel):
    """Request body for POST /wallets/analyze."""

    address: str = Field(
        ...,
        min_length=1,
        description="Wallet address to analyze, in its native chain format.",
        examples=["0x32Be343B94f860124dC4fEe278FDCBD38C102D88"],
    )


class WalletAnalysisData(BaseModel):
    """Normalized wallet data, shared across all chains.

    Individual providers are responsible for mapping chain-specific
    responses into this common shape. All fields are optional because,
    at this stage, providers may not yet be able to populate them.
    """

    balance: Optional[Any] = Field(
        default=None, description="Normalized native-asset balance."
    )
    transactions: Optional[Any] = Field(
        default=None, description="Normalized recent transaction list."
    )
    assets: Optional[Any] = Field(
        default=None, description="Normalized held assets / tokens."
    )


class WalletAnalyzeResponse(BaseModel):
    """Response body for POST /wallets/analyze."""

    address: str = Field(..., description="The wallet address that was analyzed.")
    network: BlockchainNetwork = Field(
        ..., description="Blockchain network detected for this address."
    )
    status: WalletStatus = Field(..., description="Outcome of the analysis.")
    message: str = Field(..., description="Human-readable status detail.")
    data: Optional[WalletAnalysisData] = Field(
        default=None, description="Normalized wallet analysis data, if available."
    )
