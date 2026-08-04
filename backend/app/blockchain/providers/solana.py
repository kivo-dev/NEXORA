"""
Solana blockchain provider.

Structure only for now: address validation is implemented, but data
methods return explicit "not implemented" markers instead of calling any
external API (e.g. an RPC node). Wiring a real provider later should only
require filling in the method bodies below.
"""

import re
from typing import Any

from app.blockchain.provider import BlockchainProvider

_ADDRESS_PATTERN = re.compile(r"^[1-9A-HJ-NP-Za-km-z]{32,44}$")


class SolanaProvider(BlockchainProvider):
    """Provider for the Solana network."""

    network_name = "solana"

    def validate_address(self, address: str) -> bool:
        return bool(address) and bool(_ADDRESS_PATTERN.match(address.strip()))

    async def get_balance(self, address: str) -> Any:
        return {
            "status": "not_implemented",
            "message": "Solana balance lookup requires an RPC integration.",
        }

    async def get_transactions(self, address: str) -> Any:
        return {
            "status": "not_implemented",
            "message": "Solana transaction history requires an RPC integration.",
        }

    async def get_assets(self, address: str) -> Any:
        return {
            "status": "not_implemented",
            "message": "Solana token/asset lookup requires an RPC integration.",
        }
