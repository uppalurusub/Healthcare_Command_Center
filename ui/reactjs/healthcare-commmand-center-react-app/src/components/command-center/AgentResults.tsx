import AgentCard from "./AgentCard";

import type {
  AgentFinding,
} from "../../models/commandCenterResponse";

interface AgentResultsProps {
  agents: AgentFinding[];
}

const AgentResults = ({
  agents,
}: AgentResultsProps) => {
  if (!agents || agents.length === 0) {
    return (
      <section className="agent-results-section">
        <div className="agent-results-empty">
          <span className="empty-agent-icon">
            🤖
          </span>

          <h3>No Agent Findings Available</h3>

          <p>
            Healthcare governance agents did not
            return any findings for this analysis.
          </p>
        </div>
      </section>
    );
  }

  const completedAgents = agents.filter(
    (agent) => agent.status === "Completed"
  ).length;

  const highRiskAgents = agents.filter(
    (agent) =>
      agent.risk_level === "High" ||
      agent.risk_level === "Critical"
  ).length;

  return (
    <section className="agent-results-section">
      <div className="agent-results-header">
        <div>
          <h2>Multi-Agent Governance Findings</h2>

          <p>
            Autonomous healthcare agents analyzed
            financial, clinical, operational,
            quality and compliance performance.
          </p>
        </div>

        <div className="agent-results-summary">
          <div className="agent-summary-stat">
            <span>Total Agents</span>

            <strong>{agents.length}</strong>
          </div>

          <div className="agent-summary-stat">
            <span>Completed</span>

            <strong>{completedAgents}</strong>
          </div>

          <div className="agent-summary-stat">
            <span>High Risk</span>

            <strong>{highRiskAgents}</strong>
          </div>
        </div>
      </div>

      <div className="agent-grid">
        {agents.map((agent, index) => (
          <AgentCard
            key={`${agent.agent_name}-${index}`}
            agent={agent}
          />
        ))}
      </div>
    </section>
  );
};

export default AgentResults;