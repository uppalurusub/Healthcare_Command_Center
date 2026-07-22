from utils.logger import logger

from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import MaxMessageTermination

from agents.executive_agent import get_executive_agent
from agents.financial_agent import get_financial_agent
from agents.clinical_agent import get_clinical_agent
from agents.operations_agent import get_operations_agent
from agents.quality_agent import get_quality_agent
from agents.compliance_agent import get_compliance_agent


def build_healthcare_team() -> RoundRobinGroupChat:
    """
    Build Autonomous Healthcare Command Center Team

    Agents:
    - Executive Agent
    - Financial Agent
    - Clinical Agent
    - Operations Agent
    - Quality Agent
    - Compliance Agent
    """

    logger.info(
        "Initializing Autonomous Healthcare Command Center Team"
    )

    try:

        executive_agent = get_executive_agent()
        financial_agent = get_financial_agent()
        clinical_agent = get_clinical_agent()
        operations_agent = get_operations_agent()
        quality_agent = get_quality_agent()
        compliance_agent = get_compliance_agent()

        participants = [
            executive_agent,
            financial_agent,
            clinical_agent,
            operations_agent,
            quality_agent,
            compliance_agent
        ]

        logger.info(
            f"Total Agents Registered: {len(participants)}"
        )

        for agent in participants:

            agent_name = getattr(
                agent,
                "name",
                "Unknown Agent"
            )

            logger.info(
                f"Registered Agent: {agent_name}"
            )

        team = RoundRobinGroupChat(
            participants=participants,
            termination_condition=MaxMessageTermination(
                max_messages=12
            )
        )

        logger.success(
            "Healthcare Agent Swarm Team Created Successfully"
        )

        return team

    except Exception as ex:

        logger.exception(
            "Failed To Create Healthcare Agent Team"
        )

        raise ex