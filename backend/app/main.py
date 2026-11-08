import sys
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
logger = settings.get_logger()

from app.routers.command_center_router import router


# ---------------------------------------------------------
# Configure Loguru
# ---------------------------------------------------------

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
    )
)

logger.add(
    "logs/healthcare_command_center.log",
    rotation="50 MB",
    retention="30 days",
    compression="zip",
    level="INFO",
    enqueue=True
)


# ---------------------------------------------------------
# Lifespan Events
# ---------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info(
        "Starting Autonomous Healthcare Command Center..."
    )

    try:

        logger.success(
            "Healthcare Command Center Started Successfully"
        )

        yield

    except Exception as ex:

        logger.exception(
            "Application Startup Failed"
        )

        raise ex

    finally:

        logger.info(
            "Shutting Down Healthcare Command Center..."
        )


# ---------------------------------------------------------
# FastAPI Application
# ---------------------------------------------------------

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
    lifespan=lifespan
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ---------------------------------------------------------
# Request Logging Middleware
# ---------------------------------------------------------

@app.middleware("http")
async def log_requests(
    request: Request,
    call_next
):

    start_time = time.time()

    logger.info(
        f"Request Started | "
        f"Method={request.method} | "
        f"Path={request.url.path}"
    )

    try:

        response = await call_next(request)

        process_time = (
            time.time() - start_time
        )

        logger.success(
            f"Request Completed | "
            f"Method={request.method} | "
            f"Path={request.url.path} | "
            f"Status={response.status_code} | "
            f"Duration={process_time:.2f}s"
        )

        return response

    except Exception as ex:

        logger.exception(
            f"Request Failed | "
            f"Method={request.method} | "
            f"Path={request.url.path}"
        )

        raise ex


# ---------------------------------------------------------
# Global Exception Handler
# ---------------------------------------------------------

@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception
):

    logger.exception(
        f"Unhandled Exception | "
        f"Path={request.url.path}"
    )

    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": str(exc)
        }
    )


# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get(
    "/health",
    tags=["System"]
)
async def health_check():

    logger.info(
        "Health Check Invoked"
    )

    return {
        "status": "healthy",
        "application":
            "Autonomous Healthcare Command Center",
        "version": "1.0.0"
    }


# ---------------------------------------------------------
# Register Routers
# ---------------------------------------------------------

app.include_router(
    router,
    prefix="/api/v1"
)


# ---------------------------------------------------------
# Startup Confirmation
# ---------------------------------------------------------

logger.success(
    "FastAPI Application Initialized"
)