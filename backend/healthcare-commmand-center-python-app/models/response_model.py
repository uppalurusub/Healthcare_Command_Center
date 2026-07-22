from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime


class AgentFinding(BaseModel):
    agent_name: str
    status: str
    risk_level: str
    summary: str
    key_findings: List[str]
    recommendations: List[str]


class GovernanceKPI(BaseModel):
    metric_name: str
    current_value: float
    benchmark_value: float
    variance_percentage: float
    status: str


class RiskAssessment(BaseModel):
    risk_id: str
    category: str
    severity: str
    description: str
    mitigation_plan: str


class ComplianceAlert(BaseModel):
    alert_id: str
    regulation: str
    severity: str
    description: str
    recommended_action: str


class ActionItem(BaseModel):
    priority: str
    owner: str
    action: str
    expected_impact: str
    timeline: str


class PredictiveInsight(BaseModel):
    prediction_type: str
    probability: float
    prediction: str
    recommended_action: str


class ExecutiveDashboard(BaseModel):
    governance_score: float
    financial_score: float
    clinical_score: float
    operational_score: float
    quality_score: float
    compliance_score: float


class CommandCenterResponse(BaseModel):

    report_id: str

    generated_at: datetime

    hospital_id: str

    hospital_name: str

    executive_summary: str

    overall_status: str

    governance_dashboard: ExecutiveDashboard

    kpi_insights: List[GovernanceKPI]

    risk_assessments: List[RiskAssessment]

    compliance_alerts: List[ComplianceAlert]

    predictive_insights: List[PredictiveInsight]

    agent_findings: List[AgentFinding]

    action_plan: List[ActionItem]

    board_recommendation: str

    next_review_date: Optional[datetime] = None

    metadata: Optional[Dict] = {}