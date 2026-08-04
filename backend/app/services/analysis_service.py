"""Analysis service for the Nexora platform.

This module belongs to the Service Layer. It orchestrates financial
analysis by delegating to pluggable analysis engines while remaining
agnostic to specific AI providers, LLM implementations, or calculation
methodologies.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Protocol, runtime_checkable
from uuid import uuid4

from app.models.analysis import Analysis, AnalysisType, Severity
from app.models.portfolio import Portfolio
from app.models.transaction import Transaction
from app.models.wallet import Wallet


@runtime_checkable
class AnalysisEngine(Protocol):
   """Protocol for pluggable financial analysis engines.

   Concrete implementations reside in the Infrastructure Layer and
   may wrap OpenAI, Anthropic, Gemini, local LLMs, or rule-based
   analyzers. The service depends only on this abstraction.
   """

   def analyze(
       self,
       wallet: Wallet,
       portfolio: Portfolio,
       transactions: list[Transaction],
       analysis_type: AnalysisType,
   ) -> Analysis:
       """Perform a single analysis evaluation.

       Args:
           wallet: The wallet under analysis.
           portfolio: The wallet's current portfolio holdings.
           transactions: The wallet's transaction history.
           analysis_type: The specific category of analysis to perform.

       Returns:
           An immutable :class:`Analysis` domain model.
       """
       ...


class AnalysisServiceError(Exception):
   """Raised when an analysis service operation fails.

   Attributes:
       message: Human-readable description of the failure.
   """

   def __init__(self, message: str) -> None:
       self.message = message
       super().__init__(self.message)


class _PlaceholderAnalysisEngine:
   """Default placeholder engine indicating analysis is not yet implemented.

   Returns a benign :class:`Analysis` result for any requested analysis
   type without performing actual computation or external calls.
   """

   def analyze(
       self,
       wallet: Wallet,
       portfolio: Portfolio,
       transactions: list[Transaction],
       analysis_type: AnalysisType,
   ) -> Analysis:
       return Analysis(
           analysis_id=str(uuid4()),
           wallet=wallet,
           analysis_type=analysis_type,
           summary=f"{analysis_type.value} analysis is not yet implemented.",
           severity=Severity.INFO,
           score=None,
           recommendations=[
               f"Future {analysis_type.value} analysis engine integration is required."
           ],
           created_at=datetime.now(tz=timezone.utc),
       )


class AnalysisService:
   """Orchestrates financial analysis across pluggable engines.

   This service acts as a boundary between analysis consumers and
   underlying AI or rule-based engines. It remains agnostic to
   concrete provider implementations.
   """

   def __init__(self, engine: AnalysisEngine | None = None) -> None:
       self._engine = engine or _PlaceholderAnalysisEngine()

   def analyze(
       self,
       wallet: Wallet,
       portfolio: Portfolio,
       transactions: list[Transaction],
       analysis_types: list[AnalysisType] | None = None,
   ) -> list[Analysis]:
       """Orchestrate one or more financial analyses.

       Delegates each requested analysis type to the configured
       engine and aggregates the results.

       Args:
           wallet: The wallet under analysis.
           portfolio: The wallet's current portfolio holdings.
           transactions: The wallet's transaction history.
           analysis_types: Specific analyses to perform. If ``None``,
               a default set of common analyses is executed.

       Returns:
           A list of immutable :class:`Analysis` domain models.

       Raises:
           AnalysisServiceError: If inputs are invalid or an engine
               operation fails.
       """
       self._validate_inputs(wallet, portfolio, transactions)

       if analysis_types is None:
           analysis_types = self._default_analysis_types()

       results: list[Analysis] = []
       for analysis_type in analysis_types:
           try:
               result = self._engine.analyze(
                   wallet=wallet,
                   portfolio=portfolio,
                   transactions=transactions,
                   analysis_type=analysis_type,
               )
               results.append(result)
           except Exception as exc:
               raise AnalysisServiceError(
                   f"Failed to perform {analysis_type.value} analysis: {exc}"
               ) from exc

       return results

   def _validate_inputs(
       self,
       wallet: Wallet,
       portfolio: Portfolio,
       transactions: list[Transaction],
   ) -> None:
       """Validate analysis inputs."""
       if not isinstance(wallet, Wallet):
           raise AnalysisServiceError("Expected a Wallet domain model.")
       if not wallet.address or not wallet.address.strip():
           raise AnalysisServiceError("Wallet address must not be empty.")
       if not isinstance(portfolio, Portfolio):
           raise AnalysisServiceError("Expected a Portfolio domain model.")
       if not isinstance(transactions, list):
           raise AnalysisServiceError("Transactions must be provided as a list.")
       for idx, tx in enumerate(transactions):
           if not isinstance(tx, Transaction):
               raise AnalysisServiceError(
                   f"Transaction at index {idx} is not a Transaction domain model."
               )

   def _default_analysis_types(self) -> list[AnalysisType]:
       """Return the default set of analyses to execute."""
       return [
           AnalysisType.PORTFOLIO,
           AnalysisType.RISK,
           AnalysisType.SPENDING,
       ]


__all__ = [
   "AnalysisEngine",
   "AnalysisServiceError",
   "AnalysisService",
]
