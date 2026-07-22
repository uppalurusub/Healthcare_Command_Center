import type {
  ApiStatus,
} from "../../models/commandCenterResponse";

interface ExecutionSummaryProps {
  status: ApiStatus;
  message: string;
  executionTime: number;
}

const ExecutionSummary = ({
  status,
  message,
  executionTime,
}: ExecutionSummaryProps) => {
  const isSuccess =
    status === "success";

  const executionTimeDisplay =
    formatExecutionTime(executionTime);

  return (
    <section className="execution-summary">
      <article className="execution-summary-card">
        <div
          className={`execution-icon ${
            isSuccess
              ? "execution-icon-success"
              : "execution-icon-error"
          }`}
        >
          {isSuccess ? "✓" : "!"}
        </div>

        <div className="execution-summary-content">
          <span className="execution-label">
            Execution Status
          </span>

          <div className="execution-status-row">
            <h3>
              {isSuccess
                ? "Analysis Completed"
                : "Analysis Failed"}
            </h3>

            <span
              className={`execution-status-badge ${
                isSuccess
                  ? "execution-status-success"
                  : "execution-status-error"
              }`}
            >
              {status}
            </span>
          </div>

          <p>{message}</p>
        </div>
      </article>

      <article className="execution-metric-card">
        <div className="execution-metric-icon">
          ⏱️
        </div>

        <div>
          <span>Execution Time</span>

          <strong>
            {executionTimeDisplay}
          </strong>
        </div>
      </article>

      <article className="execution-metric-card">
        <div className="execution-metric-icon">
          🤖
        </div>

        <div>
          <span>AI Agents</span>

          <strong>6 Agents</strong>
        </div>
      </article>

      <article className="execution-metric-card">
        <div className="execution-metric-icon">
          🏥
        </div>

        <div>
          <span>Analysis Type</span>

          <strong>
            Governance
          </strong>
        </div>
      </article>
    </section>
  );
};

const formatExecutionTime = (
  seconds: number
): string => {
  if (!Number.isFinite(seconds)) {
    return "0.00 sec";
  }

  if (seconds < 60) {
    return `${seconds.toFixed(2)} sec`;
  }

  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  return `${minutes}m ${remainingSeconds.toFixed(
    2
  )}s`;
};

export default ExecutionSummary;