// src/models/commandCenterResponse.ts

export type ApiStatus =
  | "success"
  | "error";

export type OverallStatus =
  | "Excellent"
  | "Good"
  | "Fair"
  | "Poor"
  | "Critical";

export type RiskLevel =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type AgentStatus =
  | "Pending"
  | "Running"
  | "Completed"
  | "Failed";

export type KpiStatus =
  | "Good"
  | "Normal"
  | "Warning"
  | "Critical";

export type ActionPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";


export interface GovernanceDashboard {
  governance_score: number;
  financial_score: number;
  clinical_score: number;
  operational_score: number;
  quality_score: number;
  compliance_score: number;
}


export interface KpiInsight {
  metric_name: string;
  current_value: number;
  benchmark_value: number;
  variance_percentage: number;
  status: KpiStatus;
}


export interface RiskAssessment {
  risk_id: string;
  category: string;
  severity: RiskLevel;
  description: string;
  mitigation_plan: string;
}


export interface ComplianceAlert {
  alert_id: string;
  regulation: string;
  severity: RiskLevel;
  description: string;
  recommended_action: string;
}


export interface PredictiveInsight {
  prediction_type: string;
  probability: number;
  prediction: string;
  recommended_action: string;
}


export interface AgentFinding {
  agent_name: string;
  status: AgentStatus;
  risk_level: RiskLevel;
  summary: string;
  key_findings: string[];
  recommendations: string[];
}


export interface ActionPlan {
  priority: ActionPriority;
  owner: string;
  action: string;
  expected_impact: string;
  timeline: string;
}


export interface CommandCenterMetadata {
  framework: string;
  platform: string;
  generated_by: string;
}


export interface CommandCenterData {
  report_id: string;
  generated_at: string;

  hospital_id: string;
  hospital_name: string;

  executive_summary: string;

  overall_status: OverallStatus;

  governance_dashboard: GovernanceDashboard;

  kpi_insights: KpiInsight[];

  risk_assessments: RiskAssessment[];

  compliance_alerts: ComplianceAlert[];

  predictive_insights: PredictiveInsight[];

  agent_findings: AgentFinding[];

  action_plan: ActionPlan[];

  board_recommendation: string;

  next_review_date: string;

  metadata: CommandCenterMetadata;
}


export interface CommandCenterResponse {
  status: ApiStatus;
  message: string;
  execution_time_seconds: number;
  data: CommandCenterData;
}