interface StatusBadgeProps {
  status: string;
  showIndicator?: boolean;
  uppercase?: boolean;
}

interface StatusConfiguration {
  className: string;
  icon: string;
}

const StatusBadge = ({
  status,
  showIndicator = true,
  uppercase = false,
}: StatusBadgeProps) => {
  const configuration =
    getStatusConfiguration(status);

  const displayStatus = uppercase
    ? status.toUpperCase()
    : status;

  return (
    <span
      className={`status-badge ${configuration.className}`}
      title={`Status: ${status}`}
    >
      {showIndicator && (
        <span
          className="status-badge-indicator"
          aria-hidden="true"
        />
      )}

      <span className="status-badge-icon">
        {configuration.icon}
      </span>

      <span className="status-badge-text">
        {displayStatus}
      </span>
    </span>
  );
};

const getStatusConfiguration = (
  status: string
): StatusConfiguration => {
  switch (status.trim().toLowerCase()) {
    case "success":
    case "completed":
    case "excellent":
    case "good":
    case "normal":
    case "low":
      return {
        className: "status-badge-success",
        icon: "✓",
      };

    case "running":
    case "processing":
    case "in progress":
    case "active":
      return {
        className: "status-badge-running",
        icon: "●",
      };

    case "warning":
    case "fair":
    case "medium":
    case "pending":
      return {
        className: "status-badge-warning",
        icon: "!",
      };

    case "high":
    case "poor":
      return {
        className: "status-badge-high",
        icon: "↑",
      };

    case "critical":
    case "failed":
    case "error":
      return {
        className: "status-badge-critical",
        icon: "×",
      };

    default:
      return {
        className: "status-badge-neutral",
        icon: "•",
      };
  }
};

export default StatusBadge;