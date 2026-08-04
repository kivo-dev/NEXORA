"""Blockchain address detector for the Nexora platform.

This module belongs to the Blockchain Infrastructure Layer. It provides
deterministic address-format detection to classify raw blockchain
addresses into their corresponding network family and candidate
networks without performing any RPC calls, balance lookups, or
provider-specific operations.

Detection is purely structural: prefix, length, and alphabet analysis.
No checksum validation, chain-id lookup, or balance verification is
performed.
"""

from __future__ import annotations

import re

from pydantic import BaseModel, ConfigDict, Field

from app.models.network import NetworkFamily, NetworkType


class DetectionResult(BaseModel):
   """Immutable result of an address format detection attempt.

   Attributes:
       family: Detected network architecture family.
       networks: Candidate networks that share the detected address format.
       confidence: Certainty score ranging from 0.0 (unknown) to 1.0.
   """

   model_config = ConfigDict(
       frozen=True,
       strict=True,
       populate_by_name=True,
   )

   family: NetworkFamily = Field(
       ...,
       title="Network Family",
       description="Detected architecture family of the address.",
   )
   networks: list[NetworkType] = Field(
       ...,
       title="Candidate Networks",
       description="Possible networks compatible with the address format.",
   )
   confidence: float = Field(
       ...,
       ge=0.0,
       le=1.0,
       title="Confidence",
       description="Detection certainty score from 0.0 to 1.0.",
   )


class AddressDetector:
   """Deterministic blockchain address format detector.

   Classifies addresses by inspecting structural characteristics
   (prefix, length, and alphabet) without external network calls.
   Detection order is intentionally specific-to-general to minimize
   false positives.
   """

   # EVM-compatible networks share the 0x... address format.
   _EVM_NETWORKS: list[NetworkType] = [
       NetworkType.ETHEREUM,
       NetworkType.POLYGON,
       NetworkType.BNB_CHAIN,
       NetworkType.ARBITRUM,
       NetworkType.OPTIMISM,
       NetworkType.BASE,
       NetworkType.AVALANCHE,
   ]

   # Base58 alphabet excludes 0, O, I, and l to avoid visual ambiguity.
   _BASE58_ALPHABET = r"[1-9A-HJ-NP-Za-km-z]"

   # Bech32 alphabet used in Bitcoin SegWit addresses (BIP-173).
   _BECH32_ALPHABET = r"[qpzry9x8gf2tvdw0s3jn54khce6mua7l]"

   # Base32 alphabet used in Stellar addresses (RFC 4648).
   _BASE32_ALPHABET = r"[A-Z2-7]"

   # EVM: 0x prefix followed by exactly 40 hexadecimal characters.
   _EVM_PATTERN = re.compile(r"^0x[a-fA-F0-9]{40}$")

   # Bitcoin Legacy: Base58Check, starts with 1 or 3, 26-35 characters total.
   _BITCOIN_LEGACY_PATTERN = re.compile(
       rf"^[13]{_BASE58_ALPHABET}{{25,34}}$"
   )

   # Bitcoin SegWit: Bech32, starts with bc1, 14-74 characters total.
   _BITCOIN_SEGWIT_PATTERN = re.compile(
       rf"^bc1{_BECH32_ALPHABET}{{11,71}}$"
   )

   # Stellar: Base32, starts with G, exactly 56 characters.
   _STELLAR_PATTERN = re.compile(rf"^G{_BASE32_ALPHABET}{{55}}$")

   # Tron: Base58Check, starts with T, exactly 34 characters.
   _TRON_PATTERN = re.compile(rf"^T{_BASE58_ALPHABET}{{33}}$")

   # Solana: Base58, 32-44 characters (32 bytes encoded).
   _SOLANA_PATTERN = re.compile(rf"^{_BASE58_ALPHABET}{{32,44}}$")

   def detect(self, address: str) -> DetectionResult:
       """Detect the network family and candidate networks for an address.

       Inspects the provided address string against known format
       patterns. EVM addresses cannot be disambiguated to a specific
       chain at the format level; all EVM-compatible candidates are
       returned.

       Args:
           address: The blockchain address string to classify.

       Returns:
           A ``DetectionResult`` containing the inferred family,
           candidate networks, and confidence score.

       Raises:
           TypeError: If the input is not a string.
       """
       if not isinstance(address, str):
           raise TypeError("Address must be a string")

       cleaned = address.strip()
       if not cleaned:
           return DetectionResult(
               family=NetworkFamily.UNKNOWN,
               networks=[NetworkType.UNKNOWN],
               confidence=0.0,
           )

       # Detection order: most specific patterns first to avoid
       # false positives.
       if self._is_evm(cleaned):
           return DetectionResult(
               family=NetworkFamily.EVM,
               networks=list(self._EVM_NETWORKS),
               confidence=1.0,
           )

       if self._is_bitcoin(cleaned):
           return DetectionResult(
               family=NetworkFamily.UTXO,
               networks=[NetworkType.BITCOIN],
               confidence=1.0,
           )

       if self._is_stellar(cleaned):
           return DetectionResult(
               family=NetworkFamily.ACCOUNT_BASED,
               networks=[NetworkType.STELLAR],
               confidence=1.0,
           )

       if self._is_tron(cleaned):
           return DetectionResult(
               family=NetworkFamily.ACCOUNT_BASED,
               networks=[NetworkType.TRON],
               confidence=1.0,
           )

       if self._is_solana(cleaned):
           return DetectionResult(
               family=NetworkFamily.ACCOUNT_BASED,
               networks=[NetworkType.SOLANA],
               confidence=1.0,
           )

       return DetectionResult(
           family=NetworkFamily.UNKNOWN,
           networks=[NetworkType.UNKNOWN],
           confidence=0.0,
       )

   def _is_evm(self, address: str) -> bool:
       """Return ``True`` if the address matches the EVM hex format."""
       return bool(self._EVM_PATTERN.match(address))

   def _is_bitcoin(self, address: str) -> bool:
       """Return ``True`` if the address matches Bitcoin Legacy or SegWit."""
       if self._BITCOIN_LEGACY_PATTERN.match(address):
           return True
       # Bech32 is defined as lowercase per BIP-173.
       if self._BITCOIN_SEGWIT_PATTERN.match(address.lower()):
           return True
       return False

   def _is_stellar(self, address: str) -> bool:
       """Return ``True`` if the address matches the Stellar format."""
       return bool(self._STELLAR_PATTERN.match(address))

   def _is_tron(self, address: str) -> bool:
       """Return ``True`` if the address matches the Tron format."""
       return bool(self._TRON_PATTERN.match(address))

   def _is_solana(self, address: str) -> bool:
       """Return ``True`` if the address matches the Solana format."""
       return bool(self._SOLANA_PATTERN.match(address))


__all__ = [
   "DetectionResult",
   "AddressDetector",
]
