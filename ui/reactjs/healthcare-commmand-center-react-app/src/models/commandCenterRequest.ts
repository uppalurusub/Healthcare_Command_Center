// src/models/commandCenterRequest.ts


export interface FinancialMetrics {
  monthly_revenue: number;
  operating_cost: number;
  profit_margin: number;
  accounts_receivable: number;
  claim_denial_rate: number;
  reimbursement_rate: number;
}

export interface ClinicalMetrics {
  total_patients: number;
  admissions: number;
  discharges: number;
  mortality_rate: number;
  readmission_rate: number;
  average_length_of_stay: number;
  emergency_visits: number;
  icu_occupancy_rate: number;
}

export interface OperationalMetrics {
  bed_occupancy_rate: number;
  staff_utilization_rate: number;
  physician_utilization_rate: number;
  nurse_to_patient_ratio: number;
  operating_room_utilization: number;
  average_wait_time_minutes: number;
}

export interface QualityMetrics {
  patient_satisfaction_score: number;
  infection_rate: number;
  medication_error_rate: number;
  falls_rate: number;
  quality_score: number;
}

export interface ComplianceMetrics {
  compliance_score: number;
  hipaa_violations: number;
  audit_findings: number;
  unresolved_compliance_issues: number;
  regulatory_risk_level: string;
}

export interface GovernanceObjectives {
  improve_profitability: boolean;
  reduce_readmissions: boolean;
  improve_quality_scores: boolean;
  improve_compliance: boolean;
  optimize_resources: boolean;
}

export interface AdditionalContext {
  hospital_beds: number;
  employees: number;
  physicians: number;
  nurses: number;
  accreditations: string[];
  specialties: string[];
  strategic_focus: string[];
}

export interface CommandCenterRequest {
  hospital_id: string;
  hospital_name: string;
  hospital_type: string;
  region: string;
  report_timestamp: string;

  financial_metrics: FinancialMetrics;
  clinical_metrics: ClinicalMetrics;
  operational_metrics: OperationalMetrics;
  quality_metrics: QualityMetrics;
  compliance_metrics: ComplianceMetrics;

  governance_objectives: GovernanceObjectives;

  additional_context: AdditionalContext;
}
