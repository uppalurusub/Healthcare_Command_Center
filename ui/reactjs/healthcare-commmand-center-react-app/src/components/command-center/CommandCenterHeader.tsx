const CommandCenterHeader = () => {
  const agents = [
    {
      name: "Executive",
      icon: "🏥",
    },
    {
      name: "Financial",
      icon: "💰",
    },
    {
      name: "Clinical",
      icon: "🩺",
    },
    {
      name: "Operations",
      icon: "⚙️",
    },
    {
      name: "Quality",
      icon: "⭐",
    },
    {
      name: "Compliance",
      icon: "🛡️",
    },
  ];

  return (
    <section className="command-center-header">
      <div className="command-header-content">
        <div className="command-header-title">
          <span className="command-header-label">
            Autonomous Healthcare Governance
          </span>

          <h1>
            Healthcare Command Center
          </h1>

          <p>
            Execute enterprise healthcare governance
            analysis using an autonomous multi-agent
            AI swarm.
          </p>
        </div>

        <div className="command-header-status">
          <div className="command-status-indicator">
            <span className="command-status-dot" />

            <div>
              <strong>
                Agent Swarm Ready
              </strong>

              <span>
                6 governance agents available
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="command-agent-list">
        {agents.map((agent) => (
          <article
            key={agent.name}
            className="command-agent-item"
          >
            <div className="command-agent-icon">
              {agent.icon}
            </div>

            <div>
              <strong>{agent.name}</strong>

              <span>Agent</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommandCenterHeader;