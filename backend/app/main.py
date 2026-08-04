"""FastAPI composition root for the Nexora backend.

This module is the sole composition root of the application. It
instantiates the FastAPI application, loads configuration, and
registers API routers. No business logic, service wiring, or
blockchain infrastructure concerns belong here.
"""

from fastapi import FastAPI

from app.api.routes import health, wallet
from app.core.config import settings


app = FastAPI(
   title=settings.PROJECT_NAME,
   description="AI-powered multi-chain financial assistant backend.",
   version="0.1.0",
)


app.include_router(health.router)
app.include_router(wallet.router)
