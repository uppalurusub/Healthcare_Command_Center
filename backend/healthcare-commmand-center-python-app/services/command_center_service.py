from datetime import datetime
from utils.logger import logger

from models.request_model import CommandCenterRequest
from models.response_model import CommandCenterResponse

from implementation.command_center_impl import (
    CommandCenterImplementation
)

import mlflow
from datetime import datetime
import time

mlflow.set_tracking_uri(
    "http://localhost:5000"
)

mlflow.set_experiment(
    "Healthcare_Command_Center_Interface"
)


class CommandCenterService:

    def __init__(self):

        self.impl = CommandCenterImplementation()

        logger.info(
            "CommandCenterService initialized"
        )

    async def execute(
        self,
        request: CommandCenterRequest
    ) -> CommandCenterResponse:
        """
        Execute Healthcare Command Center Analysis
        """

        start_time = datetime.now()

        logger.info(
            f"Starting Healthcare Governance Analysis "
            f"| Hospital={request.hospital_name}"
        )

        try:

            self._validate_request(request)

            with mlflow.start_run(
                run_name=
                f"Healthcare_Command_Center_Execute_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            ):
                # Log to MLflow
                mlflow.log_param(
                    "start_time",
                    start_time.strftime("%Y-%m-%d %H:%M:%S")
                )
                mlflow.log_param(
                    "input_text",
                    request
                )

                response = await self.impl.execute_command_center(
                    request
                )

                execution_time = (
                    datetime.now() - start_time
                ).total_seconds()

                mlflow.log_param(
                    "response",
                    response
                )

                mlflow.set_tag(
                    "source",
                    "FastAPI"
                )

                mlflow.set_tag(
                    "endpoint",
                    "command-center/execute"
                )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
                )

            logger.success(
                f"Healthcare Governance Analysis Completed "
                f"| Hospital={request.hospital_name} "
                f"| Duration={execution_time:.2f} sec"
            )

            return response

        except Exception as ex:

            logger.exception(
                f"Healthcare Governance Analysis Failed "
                f"| Hospital={request.hospital_name}"
            )

            raise ex

    def _validate_request(
        self,
        request: CommandCenterRequest
    ) -> None:
        """
        Business Validation Rules
        """

        logger.info(
            f"Validating Request "
            f"| Hospital={request.hospital_name}"
        )

        if not request.hospital_name:
            raise ValueError(
                "Hospital Name is required"
            )

        if (
            request.operational_metrics.bed_occupancy_rate < 0
            or
            request.operational_metrics.bed_occupancy_rate > 100
        ):
            raise ValueError(
                "Bed Occupancy Rate must be between 0 and 100"
            )

        if (
            request.clinical_metrics.readmission_rate < 0
            or
            request.clinical_metrics.readmission_rate > 100
        ):
            raise ValueError(
                "Readmission Rate must be between 0 and 100"
            )

        if (
            request.compliance_metrics.compliance_score < 0
            or
            request.compliance_metrics.compliance_score > 100
        ):
            raise ValueError(
                "Compliance Score must be between 0 and 100"
            )

        logger.success(
            f"Validation Successful "
            f"| Hospital={request.hospital_name}"
        )