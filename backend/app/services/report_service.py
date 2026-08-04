"""Report service for the Nexora platform.

This module belongs to the Service Layer. It orchestrates the
composition of immutable :class:`Report` domain models from
completed financial analyses without embedding presentation,
export, or AI generation concerns.
"""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from app.models.analysis import Analysis
from app.models.portfolio import Portfolio
from app.models.report import Report, ReportType
from app.models.wallet import Wallet


class ReportServiceError(Exception):
   """Raised when a report service operation fails.

   Attributes:
       message: Human-readable description of the failure.
   """

   def __init__(self, message: str) -> None:
       self.message = message
       super().__init__(self.message)


class ReportService:
   """Orchestrates report assembly from completed financial analyses.

   This service acts as a boundary between analysis completion and
   report consumption. It produces immutable :class:`Report` domain
   models that may later be rendered into PDF, HTML, Markdown, or
   other formats by infrastructure-layer exporters.
   """

   def generate_report(
       self,
       wallet: Wallet,
       portfolio: Portfolio,
       analyses: list[Analysis],
       report_type: ReportType = ReportType.SUMMARY,
       title: str | None = None,
   ) -> Report:
       """Compose a :class:`Report` domain model from supplied analyses.

       Aggregates completed analysis results into a single immutable
       report. No financial calculations, AI summarization, or
       presentation formatting is performed.

       Args:
           wallet: The wallet that is the subject of the report.
           portfolio: The wallet's portfolio holdings at report time.
           analyses: Completed analysis results to aggregate.
           report_type: Classification of the report. Defaults to
               :attr:`ReportType.SUMMARY`.
           title: Optional human-readable title. If omitted, a default
               title is derived from the report type and wallet.

       Returns:
           An immutable :class:`Report` domain model.

       Raises:
           ReportServiceError: If required inputs are missing or invalid.
       """
       self._validate_inputs(wallet, portfolio, analyses)

       report_title = title or self._derive_title(report_type, wallet)
       summary = self._compose_summary(wallet, analyses)

       return Report(
           report_id=str(uuid4()),
           wallet=wallet,
           report_type=report_type,
           title=report_title,
           summary=summary,
           analyses=list(analyses),
           generated_at=datetime.now(tz=timezone.utc),
       )

   def _validate_inputs(
       self,
       wallet: Wallet,
       portfolio: Portfolio,
       analyses: list[Analysis],
   ) -> None:
       """Validate inputs for report generation."""
       if not isinstance(wallet, Wallet):
           raise ReportServiceError("Expected a Wallet domain model.")
       if not wallet.address or not wallet.address.strip():
           raise ReportServiceError("Wallet address must not be empty.")
       if not isinstance(portfolio, Portfolio):
           raise ReportServiceError("Expected a Portfolio domain model.")
       if not isinstance(analyses, list):
           raise ReportServiceError("Analyses must be provided as a list.")
       for idx, analysis in enumerate(analyses):
           if not isinstance(analysis, Analysis):
               raise ReportServiceError(
                   f"Analysis at index {idx} is not an Analysis domain model."
               )

   def _derive_title(self, report_type: ReportType, wallet: Wallet) -> str:
       """Generate a default report title from type and wallet."""
       return (
           f"{report_type.value.replace('_', ' ').title()} Report — "
           f"{wallet.address} ({wallet.network.value})"
       )

   def _compose_summary(
       self,
       wallet: Wallet,
       analyses: list[Analysis],
   ) -> str:
       """Compose a textual summary from aggregated analyses."""
       if not analyses:
           return (
               f"Report for {wallet.address} on {wallet.network.value}. "
               f"No analyses available."
           )

       lines: list[str] = [
           f"Report for {wallet.address} on {wallet.network.value}.",
           f"Aggregated {len(analyses)} analysis result(s).",
           "",
       ]
       for analysis in analyses:
           lines.append(
               f"- {analysis.analysis_type.value.replace('_', ' ').title()}: "
               f"{analysis.summary}"
           )
       return "\n".join(lines)


__all__ = [
   "ReportServiceError",
   "ReportService",
]
