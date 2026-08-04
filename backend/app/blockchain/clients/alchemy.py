"""Alchemy JSON-RPC client for the Nexora platform.

This module belongs to the Blockchain Infrastructure Layer and
provides a thin asynchronous HTTP client for the Alchemy Ethereum API.
"""

from __future__ import annotations

from typing import Any

import httpx

from app.core.config import settings


class AlchemyClientError(Exception):
    """Raised when an Alchemy API call fails."""

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(self.message)


class AlchemyClient:
    """Asynchronous JSON-RPC client for Alchemy Ethereum endpoints."""

    def __init__(self) -> None:
        base = settings.ALCHEMY_BASE_URL.rstrip("/")
        key = settings.ALCHEMY_API_KEY.strip()
        self._rpc_url = f"{base}/{key}"

    async def call(
        self,
        method: str,
        params: list[Any] | None = None,
    ) -> Any:
        """Execute a JSON-RPC method call against the Alchemy API.

        Args:
            method: The JSON-RPC method name.
            params: Method parameters. Defaults to an empty list.

        Returns:
            The JSON-RPC result value.

        Raises:
            AlchemyClientError: If the HTTP request fails or the
                response contains a JSON-RPC error.
        """
        payload = {
            "jsonrpc": "2.0",
            "method": method,
            "params": params or [],
            "id": 1,
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self._rpc_url,
                    json=payload,
                    headers=headers,
                    timeout=15,
                )
                response.raise_for_status()
        except httpx.RequestError as exc:
            raise AlchemyClientError(f"Alchemy request failed: {exc}") from exc
        except httpx.HTTPStatusError as exc:
            raise AlchemyClientError(
                f"Alchemy HTTP error {exc.response.status_code}: {exc.response.text}"
            ) from exc

        data = response.json()

        if "error" in data:
            error = data["error"]
            code = error.get("code", "unknown")
            message = error.get("message", "Unknown JSON-RPC error")
            raise AlchemyClientError(f"JSON-RPC error {code}: {message}")

        return data.get("result")

    async def get_native_balance(self, address: str) -> int:
        """Retrieve the native ETH balance for an address.

        Args:
            address: The Ethereum address to query.

        Returns:
            The balance in Wei as an integer.

        Raises:
            AlchemyClientError: If the API call fails.
        """
        result = await self.call(
            method="eth_getBalance",
            params=[address, "latest"],
        )
        if not isinstance(result, str):
            raise AlchemyClientError(
                f"Unexpected balance response type: {type(result).__name__}"
            )
        return int(result, 16)

    async def close(self) -> None:
        """No-op cleanup.

        The client is instantiated per request, so no persistent
        resources need to be released.
        """
        return


__all__ = [
    "AlchemyClientError",
    "AlchemyClient",
]
