import {
  useEffect,
  useState,
} from "react";

interface AgentProgress {
  name: string;
  icon: string;
}

const agents: AgentProgress[] = [
  {
    name: "Executive Agent",
    icon: "🏥",
  },
  {
    name: "Financial Agent",
    icon: "💰",
  },
  {
    name: "Clinical Agent",
    icon: "🩺",
  },
  {
    name: "Operations Agent",
    icon: "⚙️",
  },
  {
    name: "Quality Agent",
    icon: "⭐",
  },
  {
    name: "Compliance Agent",
    icon: "🛡️",
  },
];

const Loader = () => {
  const [
    activeAgentIndex,
    setActiveAgentIndex,
  ] = useState<number>(0);

  const [
    elapsedSeconds,
    setElapsedSeconds,
  ] = useState<number>(0);

  useEffect(() => {
    const agentInterval =
      window.setInterval(() => {
        setActiveAgentIndex(
          (previousIndex) =>
            (previousIndex + 1) %
            agents.length
        );
      }, 3000);

    const timerInterval =
      window.setInterval(() => {
        setElapsedSeconds(
          (previousSeconds) =>
            previousSeconds + 1
        );
      }, 1000);

    return () => {
      window.clearInterval(
        agentInterval
      );

      window.clearInterval(
        timerInterval
      );
    };
  }, []);

  const activeAgent =
    agents[activeAgentIndex];

  return (
    <section
      className="command-loader"
      role="status"
      aria-live="polite"
    >
      <div className="loader-main-content">
        <div className="agent-swarm-visual">
          <div className="swarm-orbit swarm-orbit-one" />

          <div className="swarm-orbit swarm-orbit-two" />

          <div className="swarm-core">
            <span>AI</span>
          </div>

          <div className="swarm-node swarm-node-one">
            🏥
          </div>

          <div className="swarm-node swarm-node-two">
            💰
          </div>

          <div className="swarm-node swarm-node-three">
            🩺
          </div>

          <div className="swarm-node swarm-node-four">
            ⚙️
          </div>
        </div>

        <div className="loader-information">
          <span className="loader-label">
            Autonomous Agent Execution
          </span>

          <h2>
            Healthcare Governance Analysis
            in Progress
          </h2>

          <p>
            The multi-agent healthcare command
            center is analyzing hospital financial,
            clinical, operational, quality and
            compliance performance.
          </p>

          <div className="active-agent-indicator">
            <div className="active-agent-icon">
              {activeAgent.icon}
            </div>

            <div>
              <span>
                Current Analysis
              </span>

              <strong>
                {activeAgent.name}
              </strong>
            </div>

            <div className="agent-processing">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="loader-timer">
            <span>Elapsed Time</span>

            <strong>
              {formatElapsedTime(
                elapsedSeconds
              )}
            </strong>
          </div>
        </div>
      </div>

      <div className="agent-execution-progress">
        {agents.map(
          (agent, index) => {
            const isActive =
              index === activeAgentIndex;

            return (
              <div
                key={agent.name}
                className={`agent-progress-item ${
                  isActive
                    ? "agent-progress-active"
                    : ""
                }`}
              >
                <div className="agent-progress-icon">
                  {agent.icon}
                </div>

                <span>
                  {agent.name.replace(
                    " Agent",
                    ""
                  )}
                </span>
              </div>
            );
          }
        )}
      </div>

      <div className="loader-notice">
        <span>ℹ️</span>

        <p>
          Agent swarm execution may take several
          minutes. Keep this page open while the
          healthcare governance report is generated.
        </p>
      </div>
    </section>
  );
};

const formatElapsedTime = (
  seconds: number
): string => {
  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export default Loader;