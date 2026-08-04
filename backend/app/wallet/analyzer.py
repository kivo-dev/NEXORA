"""
Wallet analysis helper.

Takes raw output already fetched from a blockchain provider and shapes it
into the normalized WalletAnalysis domain model. This keeps
"how do we interpret/aggregate provider data" logic out of both the API
layer and the provider classes themselves, so it can grow (scoring,
enrichment, AI explanations, etc.) without touching either.
"""

from typing import Any

from app.models.wallet_analysis import WalletAnalysis


def build_analysis(
    address: str,
    network: str,
    is_valid: bool,
    balance: Any = None,
    transactions: Any = None,
    assets: Any = None,
    message: str = "",
) -> WalletAnalysis:
    """Assemble a normalized WalletAnalysis from raw provider outputs."""
    return WalletAnalysis(
        address=address,
        network=network,
        is_valid=is_valid,
        balance=balance,
        transactions=transactions,
        assets=assets,
        message=message,
    )
