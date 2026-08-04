"""
Wallet API routes.

This layer only receives HTTP requests, validates input (via Pydantic
schemas), calls the service layer, and returns responses. No blockchain
or business logic lives here.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException

from app.schemas.wallet import WalletAnalyzeRequest, WalletAnalyzeResponse
from app.services.wallet_service import WalletService, WalletServiceError
from app.core.dependencies import get_wallet_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/wallets", tags=["wallets"])


@router.post("/analyze", response_model=WalletAnalyzeResponse)
async def analyze_wallet(
    request: WalletAnalyzeRequest,
    wallet_service: WalletService = Depends(get_wallet_service),
) -> WalletAnalyzeResponse:
    """Detect a wallet's network and return normalized analysis data."""
    try:
        return await wallet_service.analyze(request.address)
    except WalletServiceError as exc:
        logger.warning(
            "Wallet analysis failed for address=%r: %s",
            request.address,
            exc.message,
        )
        raise HTTPException(status_code=exc.status_code, detail=exc.message) from exc

