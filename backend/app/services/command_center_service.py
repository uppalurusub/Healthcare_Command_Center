from app.config.settings import (
    settings,
    usage_capture,
    INPUT_PRICE_PER_1M,
    OUTPUT_PRICE_PER_1M,
)

logger = settings.get_logger()

from app.schemas.request_model import CommandCenterRequest
from app.schemas.response_model import CommandCenterResponse

from app.implementation.command_center_impl import (
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
        start_ts = time.perf_counter()

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
                mlflow.log_param("start_time", start_time.isoformat())
                mlflow.set_tag("source", "FastAPI")
                mlflow.set_tag("endpoint", "monitoring/analyze")
                mlflow.set_tag("llm_provider", "OpenRouter")

                with usage_capture() as usage:
                    response = await self.impl.execute_command_center(
                        request
                    )

                execution_time = time.perf_counter() - start_ts
                usage_values = usage.as_dict()

                # Log configuration and actual usage separately.
                mlflow.log_param("llm_model", usage_values["model"])
                mlflow.log_param(
                    "input_price_per_1m_usd", INPUT_PRICE_PER_1M
                )
                mlflow.log_param(
                    "output_price_per_1m_usd", OUTPUT_PRICE_PER_1M
                )
                mlflow.log_param("input", request)
                mlflow.log_param("output", response)
                mlflow.log_param("execution_time", execution_time)

                metric_names = (
                    "input_tokens",
                    "output_tokens",
                    "total_tokens",
                    "input_cost_usd",
                    "output_cost_usd",
                    "total_cost_usd",
                    "llm_call_count",
                    "usage_reported_call_count",
                )
                for metric_name in metric_names:
                    mlflow.log_metric(
                        metric_name,
                        float(usage_values[metric_name])
                    )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
                )

                mlflow.set_tag("llm_usage_source", usage_values["source"])
                mlflow.log_param("end_time", datetime.now().isoformat())

                logger.info(
                    "LLM usage captured: "
                    f"model={usage_values['model']}, "
                    f"input_tokens={usage_values['input_tokens']}, "
                    f"output_tokens={usage_values['output_tokens']}, "
                    f"total_tokens={usage_values['total_tokens']}, "
                    f"input_cost_usd={usage_values['input_cost_usd']:.15f}, "
                    f"output_cost_usd={usage_values['output_cost_usd']:.15f}, "
                    f"total_cost_usd={usage_values['total_cost_usd']:.15f}, "
                    f"llm_call_count={usage_values['llm_call_count']}, "
                    f"usage_reported_call_count="
                    f"{usage_values['usage_reported_call_count']}"
                )

                if usage_values["usage_reported_call_count"] == 0:
                    logger.warning(
                        "No token usage was reported by the AutoGen model "
                        "client. Check that MonitoringImplementation uses "
                        "settings.get_model_client() and that the provider "
                        "returns usage metadata."
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