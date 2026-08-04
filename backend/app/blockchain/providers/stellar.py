"""
Stellar blockchain provider.

Structure only for now: address validation is implemented, but data
methods return explicit "not implemented" markers instead of calling any
external API (e.g. Horizon). Wiring a real provider later should only
require filling in the method bodies below.
"""

import re
from typing import Any

from app.blockchain.provider import BlockchainProvider

_ADDRESS_PATTERN = re.compile(r"^G[A-Z2-7]{55}$")


class StellarProvider(BlockchainProvider):
    """Provider for the Stellar network."""

    network_name = "stellar"

    def validate_address(self, address: str) -> bool:
        return bool(address) and bool(_ADDRESS_PATTERN.match(address.strip()))

    async def get_balance(self, address: str) -> Any:
        return {
            "status": "not_implemented",
            "message": "Stellar balance lookup requires a Horizon API integration.",
        }

    async def get_transactions(self, address: str) -> Any:
        return {
            "status": "not_implemented",
            "message": "Stellar transaction history requires a Horizon API integration.",
        }

    async def get_assets(self, address: str) -> Any:
        return {
            "status": "not_implemented",
            "message": "Stellar asset lookup requires a Horizon API integration.",
        }
