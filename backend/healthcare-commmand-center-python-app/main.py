"""
Autonomous Healthcare Command Center API.

Main FastAPI application entry point.
"""

from __future__ import annotations

import sys
import time
from contextlib import asynccontextmanager
from typing import AsyncIterator

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers.command_center_router import router
from utils.logger import logger


# ============================================================
# LOGGING CONFIGURATION
# ============================================================

logger.remove()

logger.add(
    sys.stdout,
    level="INFO",
    colorize=True,
    enqueue=True,
    backtrace=True,
    diagnose=True,
    format=(
        "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
        "<level>{level}</level> | "
        "<cyan>{name}</cyan>:"
        "<cyan>{function}</cyan>:"
        "<cyan>{line}</cyan> | "
        "<level>{message}</level>"
    ),
)

logger.add(
    "logs/healthcare_command_center.log",
    rotation="50 MB",
    retention="30 days",
    compression="zip",
    level="INFO",
    enqueue=True,
)


# ============================================================
# APPLICATION LIFESPAN
# ============================================================


@asynccontextmanager
async def lifespan(
    app: FastAPI,
) -> AsyncIterator[None]:
    """
    Manage FastAPI application startup and shutdown.
    """

    logger.info(
        "Starting Autonomous Healthcare Command Center..."
    )

    try:

        logger.success(
            "Healthcare Command Center "
            "Started Successfully"
        )

        yield

    except Exception:

        logger.exception(
            "Healthcare Command Center "
            "Application Failed"
        )

        raise

    finally:

        logger.info(
            "Shutting Down Healthcare Command Center..."
        )


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="Autonomous Healthcare Command Center",
    description="""
Enterprise Multi-Agent Healthcare Governance Platform

Agents:

- Executive Agent
- Financial Agent
- Clinical Agent
- Operations Agent
- Quality Agent
- Compliance Agent
""",
    version="1.0.0",
    lifespan=lifespan,
)


# ============================================================
# CORS MIDDLEWARE
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST LOGGING MIDDLEWARE
# ============================================================


@app.middleware("http")
async def log_requests(
    request: Request,
    call_next,
):
    """
    Log incoming API requests and response duration.
    """

    start_time = time.perf_counter()

    logger.info(
        "Request Started | "
        f"Method={request.method} | "
        f"Path={request.url.path}"
    )

    try:

        response = await call_next(
            request
        )

        process_time = (
            time.perf_counter()
            - start_time
        )

        logger.success(
            "Request Completed | "
            f"Method={request.method} | "
            f"Path={request.url.path} | "
            f"Status={response.status_code} | "
            f"Duration={process_time:.2f}s"
        )

        return response

    except Exception:

        process_time = (
            time.perf_counter()
            - start_time
        )

        logger.exception(
            "Request Failed | "
            f"Method={request.method} | "
            f"Path={request.url.path} | "
            f"Duration={process_time:.2f}s"
        )

        raise


# ============================================================
# GLOBAL EXCEPTION HANDLER
# ============================================================


@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    """
    Handle unexpected application exceptions.
    """

    logger.exception(
        "Unhandled Exception | "
        f"Path={request.url.path} | "
        f"Error={exc}"
    )

    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": str(exc),
        },
    )


# ============================================================
# ROOT ENDPOINT
# ============================================================


@app.get(
    "/",
    tags=["System"],
)
async def root() -> dict[str, str]:
    """
    Return application information.
    """

    return {
        "application": (
            "Autonomous Healthcare Command Center"
        ),
        "status": "running",
        "version": "1.0.0",
        "documentation": "/docs",
    }


# ============================================================
# HEALTH CHECK
# ============================================================


@app.get(
    "/health",
    tags=["System"],
)
async def health_check() -> dict[str, str]:
    """
    Check application health.
    """

    logger.info(
        "Health Check Invoked"
    )

    return {
        "status": "healthy",
        "application": (
            "Autonomous Healthcare Command Center"
        ),
        "version": "1.0.0",
    }


# ============================================================
# REGISTER ROUTERS
# ============================================================

app.include_router(
    router,
    prefix="/api/v1",
)


