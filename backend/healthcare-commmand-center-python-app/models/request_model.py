from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from datetime import datetime


class FinancialMetrics(BaseModel):
    monthly_revenue: float
    operating_cost: float
    profit_margin: float
    accounts_receivable: float
    claim_denial_rate: float
    reimbursement_rate: float


class ClinicalMetrics(BaseModel):
    total_patients: int
    admissions: int
    discharges: int
    mortality_rate: float
    readmission_rate: float
    average_length_of_stay: float
    emergency_visits: int
    icu_occupancy_rate: float


class OperationalMetrics(BaseModel):
    bed_occupancy_rate: float
    staff_utilization_rate: float
    physician_utilization_rate: float
    nurse_to_patient_ratio: float
    operating_room_utilization: float
    average_wait_time_minutes: float


class QualityMetrics(BaseModel):
    patient_satisfaction_score: float
    infection_rate: float
    medication_error_rate: float
    falls_rate: float
    quality_score: float


class ComplianceMetrics(BaseModel):
    compliance_score: float
    hipaa_violations: int
    audit_findings: int
    unresolved_compliance_issues: int
    regulatory_risk_level: str


class GovernanceObjectives(BaseModel):
    improve_profitability: bool = False
    reduce_readmissions: bool = False
    improve_quality_scores: bool = False
    improve_compliance: bool = False
    optimize_resources: bool = False


class CommandCenterRequest(BaseModel):

    hospital_id: str = Field(..., description="Hospital Unique Identifier")

    hospital_name: str

    hospital_type: str = Field(
        ...,
        description="Academic, Community, Specialty, Multi-Specialty"
    )

    region: str

    report_timestamp: datetime

    financial_metrics: FinancialMetrics

    clinical_metrics: ClinicalMetrics

    operational_metrics: OperationalMetrics

    quality_metrics: QualityMetrics

    compliance_metrics: ComplianceMetrics

    governance_objectives: Optional[GovernanceObjectives] = None

    additional_context: Optional[Dict] = {}