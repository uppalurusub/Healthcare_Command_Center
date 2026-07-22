import AgentResults from "./AgentResults";
import ExecutionSummary from "./ExecutionSummary";
import MarkdownReport from "../common/MarkdownReport";

import type {
  CommandCenterResponse,
  GovernanceDashboard,
  KpiInsight,
  RiskAssessment,
  ComplianceAlert,
  PredictiveInsight,
  ActionPlan,
} from "../../models/commandCenterResponse";

interface GovernanceResultProps {
  result: CommandCenterResponse;
}

const GovernanceResult = ({
  result,
}: GovernanceResultProps) => {
  const { data } = result;

  return (
    <div className="governance-result">
      <ExecutionSummary
        status={result.status}
        message={result.message}
        executionTime={
          result.execution_time_seconds
        }
      />

      <ReportHeader
        reportId={data.report_id}
        hospitalId={data.hospital_id}
        hospitalName={data.hospital_name}
        overallStatus={data.overall_status}
        generatedAt={data.generated_at}
        nextReviewDate={data.next_review_date}
      />

      <GovernanceScoreCards
        dashboard={data.governance_dashboard}
      />

      <ExecutiveSummary
        summary={data.executive_summary}
      />

      <KpiInsights
        insights={data.kpi_insights}
      />

      <RiskAssessments
        risks={data.risk_assessments}
      />

      <ComplianceAlerts
        alerts={data.compliance_alerts}
      />

      <PredictiveInsights
        insights={data.predictive_insights}
      />

      <AgentResults
        agents={data.agent_findings}
      />

      <ActionPlanSection
        actions={data.action_plan}
      />

      <BoardRecommendation
        recommendation={
          data.board_recommendation
        }
      />

      <ReportMetadata
        framework={data.metadata.framework}
        platform={data.metadata.platform}
        generatedBy={data.metadata.generated_by}
      />
    </div>
  );
};

/* =========================================================
   REPORT HEADER
========================================================= */

interface ReportHeaderProps {
  reportId: string;
  hospitalId: string;
  hospitalName: string;
  overallStatus: string;
  generatedAt: string;
  nextReviewDate: string;
}

const ReportHeader = ({
  reportId,
  hospitalId,
  hospitalName,
  overallStatus,
  generatedAt,
  nextReviewDate,
}: ReportHeaderProps) => {
  return (
    <section className="governance-report-header">
      <div className="report-hospital-information">
        <span className="report-label">
          Healthcare Governance Report
        </span>

        <h2>{hospitalName}</h2>

        <div className="report-identifiers">
          <span>
            Hospital ID:{" "}
            <strong>{hospitalId}</strong>
          </span>

          <span>
            Report ID:{" "}
            <strong>{reportId}</strong>
          </span>
        </div>
      </div>

      <div className="report-status-information">
        <span
          className={`overall-status-badge ${getStatusClass(
            overallStatus
          )}`}
        >
          {overallStatus}
        </span>

        <div className="report-date">
          <span>Generated</span>

          <strong>
            {formatDateTime(generatedAt)}
          </strong>
        </div>

        <div className="report-date">
          <span>Next Review</span>

          <strong>
            {formatDate(nextReviewDate)}
          </strong>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   GOVERNANCE DASHBOARD
========================================================= */

interface GovernanceScoreCardsProps {
  dashboard: GovernanceDashboard;
}

const GovernanceScoreCards = ({
  dashboard,
}: GovernanceScoreCardsProps) => {
  const scores = [
    {
      name: "Governance",
      value: dashboard.governance_score,
      icon: "🏛️",
    },
    {
      name: "Financial",
      value: dashboard.financial_score,
      icon: "💰",
    },
    {
      name: "Clinical",
      value: dashboard.clinical_score,
      icon: "🩺",
    },
    {
      name: "Operations",
      value: dashboard.operational_score,
      icon: "⚙️",
    },
    {
      name: "Quality",
      value: dashboard.quality_score,
      icon: "⭐",
    },
    {
      name: "Compliance",
      value: dashboard.compliance_score,
      icon: "🛡️",
    },
  ];

  return (
    <section className="governance-dashboard-section">
      <div className="section-heading">
        <div>
          <h2>Governance Dashboard</h2>

          <p>
            Enterprise healthcare governance
            performance scores
          </p>
        </div>
      </div>

      <div className="governance-score-grid">
        {scores.map((score) => (
          <article
            key={score.name}
            className="governance-score-card"
          >
            <div className="score-card-header">
              <span className="score-icon">
                {score.icon}
              </span>

              <span
                className={`score-status-dot ${getScoreClass(
                  score.value
                )}`}
              />
            </div>

            <strong className="score-value">
              {score.value.toFixed(1)}
            </strong>

            <span className="score-total">
              / 100
            </span>

            <h3>{score.name}</h3>

            <div className="score-progress">
              <div
                className={`score-progress-value ${getScoreClass(
                  score.value
                )}`}
                style={{
                  width: `${Math.min(
                    score.value,
                    100
                  )}%`,
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   EXECUTIVE SUMMARY - MARKDOWN
========================================================= */

interface ExecutiveSummaryProps {
  summary: string;
}

const ExecutiveSummary = ({
  summary,
}: ExecutiveSummaryProps) => {
  if (!summary?.trim()) {
    return null;
  }

  return (
    <section className="executive-summary-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            Executive Intelligence
          </span>

          <h2>Executive Summary</h2>

          <p>
            Autonomous healthcare governance
            assessment generated by the agent swarm.
          </p>
        </div>

        <span className="section-icon">
          📋
        </span>
      </div>

      <div className="executive-summary-content">
        <MarkdownReport
          content={summary}
        />
      </div>
    </section>
  );
};

/* =========================================================
   KPI INSIGHTS
========================================================= */

interface KpiInsightsProps {
  insights: KpiInsight[];
}

const KpiInsights = ({
  insights,
}: KpiInsightsProps) => {
  if (insights.length === 0) {
    return null;
  }

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2>KPI Insights</h2>

          <p>
            Current performance compared with
            healthcare benchmarks
          </p>
        </div>

        <span className="section-icon">
          📈
        </span>
      </div>

      <div className="kpi-insight-grid">
        {insights.map((insight) => (
          <article
            key={insight.metric_name}
            className="kpi-insight-card"
          >
            <div className="kpi-card-header">
              <h3>{insight.metric_name}</h3>

              <span
                className={`kpi-status ${getStatusClass(
                  insight.status
                )}`}
              >
                {insight.status}
              </span>
            </div>

            <div className="kpi-values">
              <div>
                <span>Current</span>

                <strong>
                  {insight.current_value}
                </strong>
              </div>

              <div>
                <span>Benchmark</span>

                <strong>
                  {insight.benchmark_value}
                </strong>
              </div>

              <div>
                <span>Variance</span>

                <strong>
                  {insight.variance_percentage}%
                </strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   RISK ASSESSMENTS
========================================================= */

interface RiskAssessmentsProps {
  risks: RiskAssessment[];
}

const RiskAssessments = ({
  risks,
}: RiskAssessmentsProps) => {
  if (risks.length === 0) {
    return null;
  }

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2>Risk Assessments</h2>

          <p>
            Enterprise governance risks identified
            by the agent swarm
          </p>
        </div>

        <span className="section-icon">
          ⚠️
        </span>
      </div>

      <div className="risk-assessment-grid">
        {risks.map((risk) => (
          <article
            key={risk.risk_id}
            className="risk-assessment-card"
          >
            <div className="risk-card-header">
              <div>
                <span className="risk-id">
                  {risk.risk_id}
                </span>

                <h3>{risk.category}</h3>
              </div>

              <span
                className={`risk-badge ${getRiskClass(
                  risk.severity
                )}`}
              >
                {risk.severity}
              </span>
            </div>

            <p>{risk.description}</p>

            <div className="mitigation-plan">
              <span>Mitigation Plan</span>

              <strong>
                {risk.mitigation_plan}
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   COMPLIANCE ALERTS
========================================================= */

interface ComplianceAlertsProps {
  alerts: ComplianceAlert[];
}

const ComplianceAlerts = ({
  alerts,
}: ComplianceAlertsProps) => {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2>Compliance Alerts</h2>

          <p>
            Regulatory and healthcare compliance
            observations
          </p>
        </div>

        <span className="section-icon">
          🛡️
        </span>
      </div>

      <div className="compliance-alert-list">
        {alerts.map((alert) => (
          <article
            key={alert.alert_id}
            className="compliance-alert-card"
          >
            <div className="alert-icon">
              !
            </div>

            <div className="alert-content">
              <div className="alert-header">
                <div>
                  <span>
                    {alert.alert_id}
                  </span>

                  <h3>
                    {alert.regulation}
                  </h3>
                </div>

                <span
                  className={`risk-badge ${getRiskClass(
                    alert.severity
                  )}`}
                >
                  {alert.severity}
                </span>
              </div>

              <p>{alert.description}</p>

              <strong>
                Recommended Action:{" "}
                {alert.recommended_action}
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   PREDICTIVE INSIGHTS
========================================================= */

interface PredictiveInsightsProps {
  insights: PredictiveInsight[];
}

const PredictiveInsights = ({
  insights,
}: PredictiveInsightsProps) => {
  if (insights.length === 0) {
    return null;
  }

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2>Predictive Insights</h2>

          <p>
            AI-driven healthcare risk predictions
          </p>
        </div>

        <span className="section-icon">
          🔮
        </span>
      </div>

      <div className="predictive-insight-grid">
        {insights.map((insight, index) => (
          <article
            key={`${insight.prediction_type}-${index}`}
            className="predictive-insight-card"
          >
            <div className="prediction-header">
              <h3>
                {insight.prediction_type}
              </h3>

              <span className="prediction-probability">
                {formatProbability(
                  insight.probability
                )}
              </span>
            </div>

            <p>{insight.prediction}</p>

            <div className="prediction-action">
              <span>Recommended Action</span>

              <strong>
                {insight.recommended_action}
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   ACTION PLAN
========================================================= */

interface ActionPlanSectionProps {
  actions: ActionPlan[];
}

const ActionPlanSection = ({
  actions,
}: ActionPlanSectionProps) => {
  if (actions.length === 0) {
    return null;
  }

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2>Enterprise Action Plan</h2>

          <p>
            Prioritized healthcare governance
            execution roadmap
          </p>
        </div>

        <span className="section-icon">
          🎯
        </span>
      </div>

      <div className="action-plan-table-wrapper">
        <table className="action-plan-table">
          <thead>
            <tr>
              <th>Priority</th>
              <th>Owner</th>
              <th>Action</th>
              <th>Expected Impact</th>
              <th>Timeline</th>
            </tr>
          </thead>

          <tbody>
            {actions.map((action, index) => (
              <tr
                key={`${action.action}-${index}`}
              >
                <td>
                  <span
                    className={`priority-badge ${getRiskClass(
                      action.priority
                    )}`}
                  >
                    {action.priority}
                  </span>
                </td>

                <td>
                  <strong>{action.owner}</strong>
                </td>

                <td>{action.action}</td>

                <td>
                  {action.expected_impact}
                </td>

                <td>{action.timeline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/* =========================================================
   BOARD RECOMMENDATION
========================================================= */

interface BoardRecommendationProps {
  recommendation: string;
}

const BoardRecommendation = ({
  recommendation,
}: BoardRecommendationProps) => {
  return (
    <section className="board-recommendation">
      <div className="board-recommendation-icon">
        🏛️
      </div>

      <div>
        <span>
          Board Recommendation
        </span>

        <h2>{recommendation}</h2>
      </div>
    </section>
  );
};

/* =========================================================
   REPORT METADATA
========================================================= */

interface ReportMetadataProps {
  framework: string;
  platform: string;
  generatedBy: string;
}

const ReportMetadata = ({
  framework,
  platform,
  generatedBy,
}: ReportMetadataProps) => {
  return (
    <footer className="report-metadata">
      <div>
        <span>Framework</span>

        <strong>{framework}</strong>
      </div>

      <div>
        <span>Platform</span>

        <strong>{platform}</strong>
      </div>

      <div>
        <span>Generated By</span>

        <strong>{generatedBy}</strong>
      </div>
    </footer>
  );
};

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

const getScoreClass = (
  score: number
): string => {
  if (score >= 90) {
    return "score-excellent";
  }

  if (score >= 80) {
    return "score-good";
  }

  if (score >= 70) {
    return "score-warning";
  }

  return "score-critical";
};

const getRiskClass = (
  risk: string
): string => {
  switch (risk.toLowerCase()) {
    case "low":
      return "risk-low";

    case "medium":
      return "risk-medium";

    case "high":
      return "risk-high";

    case "critical":
      return "risk-critical";

    default:
      return "";
  }
};

const getStatusClass = (
  status: string
): string => {
  switch (status.toLowerCase()) {
    case "excellent":
    case "good":
    case "normal":
    case "success":
      return "status-good";

    case "fair":
    case "warning":
    case "medium":
      return "status-warning";

    case "poor":
    case "high":
      return "status-high";

    case "critical":
    case "error":
      return "status-critical";

    default:
      return "status-neutral";
  }
};

const formatProbability = (
  probability: number
): string => {
  return `${(
    probability * 100
  ).toFixed(0)}%`;
};

const formatDate = (
  value: string
): string => {
  return new Date(
    value
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatDateTime = (
  value: string
): string => {
  return new Date(
    value
  ).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

export default GovernanceResult;