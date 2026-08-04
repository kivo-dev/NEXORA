"""Domain model for financial analysis output in the Nexora platform.

This module defines the core domain abstractions representing the
results of AI-powered financial analysis performed on blockchain data.
It belongs to the Domain Layer and is intentionally free of business
logic, persistence concerns, API schema details, and AI provider
coupling.
"""

from __future__ import annotations

from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.wallet import Wallet


class AnalysisType(StrEnum):
    """Canonical classification of financial analysis types."""

    PORTFOLIO = "portfolio"
    """Analysis of asset composition, allocation, and diversification."""

    RISK = "risk"
    """Risk assessment, exposure profiling, and vulnerability analysis."""

    SPENDING = "spending"
    """Spending pattern, cash flow, and outflow behavior analysis."""

    INVESTMENT = "investment"
    """Investment opportunity, strategy, and return potential analysis."""

    PERFORMANCE = "performance"
    """Historical performance evaluation and benchmarking."""

    BEHAVIOR = "behavior"
    """Behavioral pattern, habit, and decision-making analysis."""

    UNKNOWN = "unknown"
    """Unclassified or generic analysis type."""


class Severity(StrEnum):
    """Severity classification for analysis outcomes and recommendations."""

    INFO = "info"
    """Informational insight with no immediate action required."""

    LOW = "low"
    """Minor concern or observation."""

    MEDIUM = "medium"
    """Moderate concern warranting attention."""

    HIGH = "high"
    """Significant issue requiring prompt review."""

    CRITICAL = "critical"
    """Critical issue demanding immediate action."""


class Analysis(BaseModel):
    """Immutable domain representation of a financial analysis result.

    An ``Analysis`` aggregates the output of a single analytical
    evaluation performed against a wallet's blockchain data. It captures
    the findings, severity, optional quantitative score, and actionable
    recommendations without embedding AI provider specifics, raw LLM
    responses, or chain-of-thought traces.

    Attributes:
        analysis_id: Unique identifier for the analysis instance.
        wallet: Wallet that was the subject of the analysis.
        analysis_type: Category of analysis performed.
        summary: Human-readable summary of the findings.
        severity: Overall severity level of the analysis outcome.
        score: Optional numeric score (e.g., 0–100) summarizing the result.
        recommendations: Actionable recommendations derived from the analysis.
        created_at: UTC datetime when the analysis was produced.
    """

    model_config = ConfigDict(
        frozen=True,
        strict=True,
        populate_by_name=True,
    )

    analysis_id: str = Field(
        ...,
        min_length=1,
        title="Analysis ID",
        description="Unique identifier for the analysis instance.",
    )
    wallet: Wallet = Field(
        ...,
        title="Wallet",
        description="Wallet that was the subject of the analysis.",
    )
    analysis_type: AnalysisType = Field(
        ...,
        title="Analysis Type",
        description="Category of financial analysis performed.",
    )
    summary: str = Field(
        ...,
        min_length=1,
        title="Summary",
        description="Human-readable summary of the analysis findings.",
    )
    severity: Severity = Field(
        ...,
        title="Severity",
        description="Overall severity classification of the analysis outcome.",
    )
    score: float | None = Field(
        default=None,
        ge=0.0,
        le=100.0,
        title="Score",
        description="Optional numeric score representing the analysis result.",
    )
    recommendations: list[str] = Field(
        default_factory=list,
        title="Recommendations",
        description="Actionable recommendations produced by the analysis.",
    )
    created_at: datetime = Field(
        ...,
        title="Created At",
        description="UTC datetime when the analysis was generated.",
    )

    @field_validator("analysis_id", "summary", mode="before")
    @classmethod
    def _validate_non_empty_string(cls, value: object) -> str:
        """Ensure required text fields are non-empty strings after stripping."""
        if not isinstance(value, str):
            raise TypeError("Field must be a string")
        stripped = value.strip()
        if not stripped:
            raise ValueError("Field must not be empty")
        return stripped

    @field_validator("analysis_type", mode="before")
    @classmethod
    def _normalize_analysis_type(cls, value: object) -> AnalysisType:
        """Normalize raw input to a canonical AnalysisType member."""
        if isinstance(value, AnalysisType):
            return value
        if isinstance(value, str):
            normalized = value.strip().lower()
            try:
                return AnalysisType(normalized)
            except ValueError:
                return AnalysisType.UNKNOWN
        raise TypeError("Analysis type must be a string or AnalysisType")

    @field_validator("severity", mode="before")
    @classmethod
    def _normalize_severity(cls, value: object) -> Severity:
        """Normalize raw input to a canonical Severity member."""
        if isinstance(value, Severity):
            return value
        if isinstance(value, str):
            normalized = value.strip().lower()
            try:
                return Severity(normalized)
            except ValueError:
                return Severity.INFO
        raise TypeError("Severity must be a string or Severity")

    @field_validator("recommendations", mode="before")
    @classmethod
    def _validate_recommendations(cls, value: object) -> list[str]:
        """Ensure recommendations is a list of non-empty strings."""
        if not isinstance(value, list):
            raise TypeError("Recommendations must be a list")
        cleaned: list[str] = []
        for item in value:
            if not isinstance(item, str):
                raise TypeError("Each recommendation must be a string")
            stripped = item.strip()
            if stripped:
                cleaned.append(stripped)
        return cleaned


__all__ = [
    "AnalysisType",
    "Severity",
    "Analysis",
]
