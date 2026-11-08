from datetime import datetime, timedelta
import uuid

from app.config.settings import settings
logger = settings.get_logger()

from autogen_agentchat.messages import TextMessage

from app.agents.healthcare_team import (
    build_healthcare_team
)

from app.schemas.request_model import (
    CommandCenterRequest
)

from app.schemas.response_model import (
    CommandCenterResponse,
    ExecutiveDashboard,
    GovernanceKPI,
    RiskAssessment,
    ComplianceAlert,
    PredictiveInsight,
    AgentFinding,
    ActionItem
)


class CommandCenterImplementation:

    def __init__(self):

        logger.info(
            "CommandCenterImplementation Initialized"
        )

    async def execute_command_center(
        self,
        request: CommandCenterRequest
    ) -> CommandCenterResponse:

        start_time = datetime.now()

        logger.info(
            f"Starting Command Center Execution "
            f"| Hospital={request.hospital_name}"
        )

        try:

            team = build_healthcare_team()

            prompt = self._build_prompt(request)

            logger.info(
                "Executing AutoGen Agent Swarm"
            )

            result = await team.run(
                task=TextMessage(
                    content=prompt,
                    source="user"
                )
            )

            logger.success(
                "AutoGen Swarm Execution Completed"
            )

            final_response = self._extract_response(
                result
            )

            response = self._build_response(
                request=request,
                agent_response=final_response
            )

            duration = (
                datetime.now() - start_time
            ).total_seconds()

            logger.success(
                f"Command Center Completed "
                f"| Duration={duration:.2f} sec"
            )

            return response

        except Exception as ex:

            logger.exception(
                "Healthcare Command Center Failed"
            )

            raise ex

    def _build_prompt(
        self,
        request: CommandCenterRequest
    ) -> str:

        logger.info(
            "Building Multi-Agent Prompt"
        )

        return f"""
You are an Autonomous Healthcare Command Center.

Hospital Information
--------------------
Hospital Name: {request.hospital_name}
Hospital Type: {request.hospital_type}
Region: {request.region}

Financial Metrics
-----------------
{request.financial_metrics.model_dump()}

Clinical Metrics
----------------
{request.clinical_metrics.model_dump()}

Operational Metrics
-------------------
{request.operational_metrics.model_dump()}

Quality Metrics
---------------
{request.quality_metrics.model_dump()}

Compliance Metrics
------------------
{request.compliance_metrics.model_dump()}

Governance Objectives
---------------------
{
request.governance_objectives.model_dump()
if request.governance_objectives
else {}
}

Agents Required
---------------
1. Executive Agent
2. Financial Agent
3. Clinical Agent
4. Operations Agent
5. Quality Agent
6. Compliance Agent

Provide:

1. Executive Summary
2. Governance Assessment
3. Risks
4. Compliance Concerns
5. KPI Insights
6. Action Plan
7. Board Recommendation
"""

    def _extract_response(
        self,
        result
    ) -> str:

        logger.info(
            "Extracting Agent Swarm Response"
        )

        try:

            if (
                hasattr(result, "messages")
                and len(result.messages) > 0
            ):
                return result.messages[-1].content

            return str(result)

        except Exception as ex:

            logger.exception(
                "Response Extraction Failed"
            )

            return "No response generated"

    def _build_response(
        self,
        request: CommandCenterRequest,
        agent_response: str
    ) -> CommandCenterResponse:

        logger.info(
            "Building Response Model"
        )

        governance_score = (
            request.compliance_metrics.compliance_score
            + request.quality_metrics.quality_score
        ) / 2

        return CommandCenterResponse(

            report_id=f"CMD-{uuid.uuid4()}",

            generated_at=datetime.now(),

            hospital_id=request.hospital_id,

            hospital_name=request.hospital_name,

            executive_summary=agent_response,

            overall_status=self._calculate_status(
                governance_score
            ),

            governance_dashboard=ExecutiveDashboard(
                governance_score=governance_score,
                financial_score=90.0,
                clinical_score=85.0,
                operational_score=82.0,
                quality_score=request.quality_metrics.quality_score,
                compliance_score=request.compliance_metrics.compliance_score
            ),

            kpi_insights=[
                GovernanceKPI(
                    metric_name="Bed Occupancy",
                    current_value=request.operational_metrics.bed_occupancy_rate,
                    benchmark_value=85,
                    variance_percentage=(
                        request.operational_metrics.bed_occupancy_rate - 85
                    ),
                    status="Warning"
                    if request.operational_metrics.bed_occupancy_rate > 85
                    else "Normal"
                )
            ],

            risk_assessments=[
                RiskAssessment(
                    risk_id="RISK-001",
                    category="Operations",
                    severity="Medium",
                    description="High occupancy detected",
                    mitigation_plan="Optimize discharge planning"
                )
            ],

            compliance_alerts=[
                ComplianceAlert(
                    alert_id="COMP-001",
                    regulation="HIPAA",
                    severity="Low",
                    description="Periodic review recommended",
                    recommended_action="Conduct audit"
                )
            ],

            predictive_insights=[
                PredictiveInsight(
                    prediction_type="Readmission",
                    probability=0.75,
                    prediction="Potential increase in readmission",
                    recommended_action="Post-discharge follow-up"
                )
            ],

            agent_findings=[
                AgentFinding(
                    agent_name="Executive Agent",
                    status="Completed",
                    risk_level="Medium",
                    summary="Governance review completed",
                    key_findings=[
                        "Operational pressure identified"
                    ],
                    recommendations=[
                        "Increase resource optimization"
                    ]
                ),
                AgentFinding(
                    agent_name="Financial Agent",
                    status="Completed",
                    risk_level="Low",
                    summary="Financial health stable",
                    key_findings=[
                        "Revenue performance strong"
                    ],
                    recommendations=[
                        "Maintain reimbursement strategy"
                    ]
                )
            ],

            action_plan=[
                ActionItem(
                    priority="High",
                    owner="COO",
                    action="Reduce Bed Occupancy",
                    expected_impact="Improved throughput",
                    timeline="30 Days"
                )
            ],

            board_recommendation=
                "Approve enterprise optimization initiative.",

            next_review_date=
                datetime.now() + timedelta(days=30),

            metadata={
                "framework": "AutoGen 0.7.5",
                "platform": "Healthcare Command Center",
                "generated_by": "Agent Swarm"
            }
        )

    def _calculate_status(
        self,
        governance_score: float
    ) -> str:

        if governance_score >= 90:
            return "Excellent"

        if governance_score >= 80:
            return "Good"

        if governance_score >= 70:
            return "Moderate Risk"

        return "High Risk"