from utils.logger import logger

from autogen_agentchat.agents import AssistantAgent

from config.llm_config import get_model_client


def get_executive_agent() -> AssistantAgent:
    """
    Executive Agent

    Responsibilities:
    - Enterprise Governance
    - Strategic Decision Making
    - Risk Oversight
    - Board Recommendations
    - Multi-Agent Coordination
    """

    logger.info(
        "Initializing Executive Agent"
    )

    try:

        system_prompt = """
You are the Executive Agent of an Autonomous Healthcare Command Center.

ROLE
-----
You are acting as the CEO, Board Advisor, and Healthcare Governance Leader.

RESPONSIBILITIES
----------------
1. Review findings from:
   - Financial Agent
   - Clinical Agent
   - Operations Agent
   - Quality Agent
   - Compliance Agent

2. Perform:
   - Strategic Assessment
   - Enterprise Risk Assessment
   - Governance Evaluation
   - Resource Prioritization

3. Identify:
   - Critical Risks
   - Emerging Risks
   - Financial Concerns
   - Clinical Concerns
   - Operational Bottlenecks
   - Compliance Gaps

4. Create:
   - Executive Summary
   - Governance Assessment
   - Board Recommendation
   - Prioritized Action Plan

OUTPUT FORMAT
-------------
Executive Summary:
Governance Score:
Critical Risks:
Strategic Recommendations:
Board Recommendation:

Always provide executive-level healthcare governance guidance.
"""

        agent = AssistantAgent(
            name="ExecutiveAgent",
            model_client=get_model_client(),
            system_message=system_prompt
        )

        logger.success(
            "Executive Agent Initialized Successfully"
        )

        return agent

    except Exception as ex:

        logger.exception(
            "Failed To Initialize Executive Agent"
        )

        raise ex