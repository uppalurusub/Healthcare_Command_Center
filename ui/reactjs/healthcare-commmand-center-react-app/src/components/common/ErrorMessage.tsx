interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({
  message,
}: ErrorMessageProps) => {
  const errorDetails =
    getErrorDetails(message);

  return (
    <section
      className="error-message-container"
      role="alert"
      aria-live="assertive"
    >
      <div className="error-message-icon">
        !
      </div>

      <div className="error-message-content">
        <div className="error-message-header">
          <div>
            <span className="error-message-label">
              Command Center Error
            </span>

            <h3>{errorDetails.title}</h3>
          </div>

          <span
            className={`error-type-badge ${errorDetails.className}`}
          >
            {errorDetails.type}
          </span>
        </div>

        <p className="error-message-description">
          {message}
        </p>

        <div className="error-message-action">
          <span className="error-action-icon">
            💡
          </span>

          <p>
            {errorDetails.recommendation}
          </p>
        </div>
      </div>
    </section>
  );
};

interface ErrorDetails {
  title: string;
  type: string;
  className: string;
  recommendation: string;
}

const getErrorDetails = (
  message: string
): ErrorDetails => {
  const normalizedMessage =
    message.toLowerCase();

  if (
    normalizedMessage.includes("network error") ||
    normalizedMessage.includes("failed to fetch")
  ) {
    return {
      title: "Healthcare API Unavailable",
      type: "Network",
      className: "error-type-network",
      recommendation:
        "Verify that the FastAPI Healthcare Command Center service is running and the API URL is configured correctly.",
    };
  }

  if (
    normalizedMessage.includes("timeout") ||
    normalizedMessage.includes("timed out")
  ) {
    return {
      title: "Agent Execution Timeout",
      type: "Timeout",
      className: "error-type-timeout",
      recommendation:
        "The autonomous agent swarm may require additional processing time. Review the Axios timeout configuration and retry the analysis.",
    };
  }

  if (
    normalizedMessage.includes("validation") ||
    normalizedMessage.includes("required") ||
    normalizedMessage.includes("invalid")
  ) {
    return {
      title: "Request Validation Failed",
      type: "Validation",
      className: "error-type-validation",
      recommendation:
        "Review the hospital information and healthcare metrics, correct the invalid values, and execute the analysis again.",
    };
  }

  if (
    normalizedMessage.includes("500") ||
    normalizedMessage.includes(
      "internal server"
    )
  ) {
    return {
      title: "Command Center Execution Failed",
      type: "Server",
      className: "error-type-server",
      recommendation:
        "Review the FastAPI and agent execution logs for failures in the Executive, Financial, Clinical, Operations, Quality, or Compliance agents.",
    };
  }

  if (
    normalizedMessage.includes("400") ||
    normalizedMessage.includes(
      "bad request"
    )
  ) {
    return {
      title: "Invalid Command Center Request",
      type: "Request",
      className: "error-type-request",
      recommendation:
        "Verify that the React request structure matches the FastAPI CommandCenterRequest model.",
    };
  }

  return {
    title: "Healthcare Governance Analysis Error",
    type: "Error",
    className: "error-type-default",
    recommendation:
      "Review the error details, verify the Command Center configuration, and retry the healthcare governance analysis.",
  };
};

export default ErrorMessage;