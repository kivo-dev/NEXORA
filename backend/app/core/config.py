"""Application configuration for the Nexora platform.

This module centralizes environment-driven settings using Pydantic
v2 BaseSettings. It belongs to the Core layer and is imported by the
composition root and infrastructure adapters.
"""

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Immutable application settings loaded from environment variables.

    All values are sourced from a ``.env`` file or the host environment.
    Sensitive fields such as API keys default to empty strings and must
    be explicitly provided at deployment time.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    PROJECT_NAME: str = "Nexora"
    """Display name of the application."""

    ENVIRONMENT: str = "development"
    """Runtime environment identifier."""

    API_PREFIX: str = "/api/v1"
    """Prefix for API routes."""

    ALCHEMY_API_KEY: str = ""
    """Alchemy API key for EVM-compatible network access.

    Loaded from the environment or ``.env`` file. Must be non-empty
    in production.
    """

    ALCHEMY_NETWORK: str = "eth-mainnet"
    """Target Alchemy network identifier."""

    ALCHEMY_BASE_URL: str = "https://eth-mainnet.g.alchemy.com/v2"
    """Base URL for Alchemy RPC endpoints."""


@lru_cache
def get_settings() -> Settings:
    """Return a cached, immutable Settings instance.

    The result is memoized to avoid repeated parsing of environment
    variables and ``.env`` files across the application lifecycle.
    """
    return Settings()


settings: Settings = get_settings()
