import type {
  AgentFinding,
  AgentStatus,
  RiskLevel,
} from "../../models/commandCenterResponse";

interface AgentCardProps {
  agent: AgentFinding;
}

const getAgentIcon = (
  agentName: string
): string => {
  const normalizedName =
    agentName.toLowerCase();

  if (normalizedName.includes("executive")) {
    return "🏥";
  }

  if (normalizedName.includes("financial")) {
    return "💰";
  }

  if (normalizedName.includes("clinical")) {
    return "🩺";
  }

  if (normalizedName.includes("operation")) {
    return "⚙️";
  }

  if (normalizedName.includes("quality")) {
    return "⭐";
  }

  if (normalizedName.includes("compliance")) {
    return "🛡️";
  }

  return "🤖";
};

const getRiskClassName = (
  riskLevel: RiskLevel
): string => {
  switch (riskLevel) {
    case "Low":
      return "risk-low";

    case "Medium":
      return "risk-medium";

    case "High":
      return "risk-high";

    case "Critical":
      return "risk-critical";

    default:
      return "";
  }
};

const getStatusClassName = (
  status: AgentStatus
): string => {
  switch (status) {
    case "Pending":
      return "agent-status-pending";

    case "Running":
      return "agent-status-running";

    case "Completed":
      return "agent-status-completed";

    case "Failed":
      return "agent-status-failed";

    default:
      return "";
  }
};

const AgentCard = ({
  agent,
}: AgentCardProps) => {
  const {
    agent_name,
    status,
    risk_level,
    summary,
    key_findings,
    recommendations,
  } = agent;

  const agentIcon =
    getAgentIcon(agent_name);

  const riskClassName =
    getRiskClassName(risk_level);

  const statusClassName =
    getStatusClassName(status);

  return (
    <article className="agent-card">
      <div className="agent-card-header">
        <div className="agent-title-container">
          <div className="agent-icon">
            {agentIcon}
          </div>

          <div>
            <h3>{agent_name}</h3>

            <span className="agent-type">
              Healthcare Governance Agent
            </span>
          </div>
        </div>

        <span
          className={`agent-status-badge ${statusClassName}`}
        >
          {status}
        </span>
      </div>

      <div className="agent-card-content">
        <div className="agent-risk-section">
          <span className="section-label">
            Risk Level
          </span>

          <span
            className={`risk-badge ${riskClassName}`}
          >
            {risk_level}
          </span>
        </div>

        <div className="agent-summary">
          <h4>Summary</h4>

          <p>{summary}</p>
        </div>

        {key_findings.length > 0 && (
          <div className="agent-section">
            <h4>Key Findings</h4>

            <ul className="agent-list findings-list">
              {key_findings.map(
                (finding, index) => (
                  <li
                    key={`${agent_name}-finding-${index}`}
                  >
                    <span className="list-icon">
                      🔎
                    </span>

                    <span>{finding}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="agent-section">
            <h4>Recommendations</h4>

            <ul className="agent-list recommendation-list">
              {recommendations.map(
                (recommendation, index) => (
                  <li
                    key={`${agent_name}-recommendation-${index}`}
                  >
                    <span className="list-icon">
                      ✓
                    </span>

                    <span>
                      {recommendation}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
};

export default AgentCard;