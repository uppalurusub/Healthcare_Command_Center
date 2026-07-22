from datetime import datetime
from fastapi import APIRouter, HTTPException
from utils.logger import logger

from models.request_model import CommandCenterRequest
from services.command_center_service import CommandCenterService

router = APIRouter(
    prefix="/command-center",
    tags=["Autonomous Healthcare Command Center"]
)

service = CommandCenterService()


@router.post(
    "/execute",
    summary="Execute Autonomous Healthcare Command Center",
    description="""
    Multi-Agent Healthcare Governance Analysis

    Agents:
    - Executive Agent
    - Financial Agent
    - Clinical Agent
    - Operations Agent
    - Quality Agent
    - Compliance Agent
    """
)
async def execute_command_center(
    request: CommandCenterRequest
):
    """
    Execute Healthcare Command Center
    """

    start_time = datetime.now()

    logger.info(
        f"Healthcare Command Center Request Started | "
        f"Hospital={request.hospital_name}"
    )

    try:

        response = await service.execute(request)

        end_time = datetime.now()

        execution_time = (
            end_time - start_time
        ).total_seconds()

        logger.success(
            f"Healthcare Command Center Completed | "
            f"Hospital={request.hospital_name} | "
            f"Execution Time={execution_time:.2f} seconds"
        )

        return {
            "status": "success",
            "message": "Healthcare governance analysis completed successfully",
            "execution_time_seconds": round(
                execution_time,
                2
            ),
            "data": response
        }

    except ValueError as ex:

        logger.error(
            f"Validation Error | "
            f"Hospital={request.hospital_name} | "
            f"Error={str(ex)}"
        )

        raise HTTPException(
            status_code=400,
            detail=str(ex)
        )

    except Exception as ex:

        logger.exception(
            f"Healthcare Command Center Failed | "
            f"Hospital={request.hospital_name}"
        )

        raise HTTPException(
            status_code=500,
            detail=str(ex)
        )