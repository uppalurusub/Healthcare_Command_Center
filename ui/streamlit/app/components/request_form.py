from datetime import datetime, timezone
from typing import Any, Dict, Tuple

import streamlit as st


def render_request_form() -> Tuple[Dict[str, Any], bool]:
    """
    Render Autonomous Healthcare Command Center request form.

    The generated payload matches CommandCenterRequest and its
    nested Pydantic metric models.
    """

    with st.form(
        key="command_center_form",
        clear_on_submit=False,
    ):

        # ====================================================
        # HOSPITAL INFORMATION
        # ====================================================

        st.subheader("🏥 Hospital Information")

        col1, col2, col3 = st.columns(3)

        with col1:
            hospital_id = st.text_input(
                "Hospital ID *",
                value="HOSP-001",
            )

        with col2:
            hospital_name = st.text_input(
                "Hospital Name *",
                value="Apollo Multi-Specialty Hospital",
            )

        with col3:
            hospital_type = st.selectbox(
                "Hospital Type *",
                options=[
                    "Academic",
                    "Community",
                    "Specialty",
                    "Multi-Specialty",
                ],
                index=3,
            )

        col1, col2 = st.columns(2)

        with col1:
            region = st.text_input(
                "Region *",
                value="Hyderabad - South India",
            )

        with col2:
            report_timestamp = st.text_input(
                "Report Timestamp *",
                value=datetime.now(
                    timezone.utc
                ).isoformat(),
                help="ISO 8601 timestamp",
            )

        st.divider()

        # ====================================================
        # FINANCIAL METRICS
        # ====================================================

        st.subheader("💰 Financial Metrics")

        col1, col2, col3 = st.columns(3)

        with col1:
            monthly_revenue = st.number_input(
                "Monthly Revenue",
                min_value=0.0,
                value=12500000.0,
                step=100000.0,
                format="%.2f",
            )

            operating_cost = st.number_input(
                "Operating Cost",
                min_value=0.0,
                value=10200000.0,
                step=100000.0,
                format="%.2f",
            )

        with col2:
            profit_margin = st.number_input(
                "Profit Margin (%)",
                min_value=-100.0,
                max_value=100.0,
                value=18.40,
                step=0.10,
                format="%.2f",
            )

            accounts_receivable = st.number_input(
                "Accounts Receivable",
                min_value=0.0,
                value=8500000.0,
                step=100000.0,
                format="%.2f",
            )

        with col3:
            claim_denial_rate = st.number_input(
                "Claim Denial Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=7.50,
                step=0.10,
                format="%.2f",
            )

            reimbursement_rate = st.number_input(
                "Reimbursement Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=91.50,
                step=0.10,
                format="%.2f",
            )

        st.divider()

        # ====================================================
        # CLINICAL METRICS
        # ====================================================

        st.subheader("🩺 Clinical Metrics")

        col1, col2, col3, col4 = st.columns(4)

        with col1:
            total_patients = st.number_input(
                "Total Patients",
                min_value=0,
                value=125000,
                step=1000,
            )

            admissions = st.number_input(
                "Admissions",
                min_value=0,
                value=18500,
                step=100,
            )

        with col2:
            discharges = st.number_input(
                "Discharges",
                min_value=0,
                value=17950,
                step=100,
            )

            mortality_rate = st.number_input(
                "Mortality Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=2.40,
                step=0.10,
            )

        with col3:
            readmission_rate = st.number_input(
                "Readmission Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=12.50,
                step=0.10,
            )

            average_length_of_stay = st.number_input(
                "Average Length of Stay (Days)",
                min_value=0.0,
                value=5.80,
                step=0.10,
            )

        with col4:
            emergency_visits = st.number_input(
                "Emergency Visits",
                min_value=0,
                value=32000,
                step=100,
            )

            icu_occupancy_rate = st.number_input(
                "ICU Occupancy Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=87.0,
                step=0.10,
            )

        st.divider()

        # ====================================================
        # OPERATIONAL METRICS
        # ====================================================

        st.subheader("⚙️ Operational Metrics")

        col1, col2, col3 = st.columns(3)

        with col1:
            bed_occupancy_rate = st.number_input(
                "Bed Occupancy Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=82.0,
                step=0.10,
            )

            staff_utilization_rate = st.number_input(
                "Staff Utilization Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=84.0,
                step=0.10,
            )

        with col2:
            physician_utilization_rate = st.number_input(
                "Physician Utilization Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=79.0,
                step=0.10,
            )

            nurse_to_patient_ratio = st.number_input(
                "Nurse-to-Patient Ratio",
                min_value=0.0,
                value=0.25,
                step=0.01,
                format="%.2f",
                help="Example: 0.25 represents 1 nurse for 4 patients",
            )

        with col3:
            operating_room_utilization = st.number_input(
                "Operating Room Utilization (%)",
                min_value=0.0,
                max_value=100.0,
                value=76.0,
                step=0.10,
            )

            average_wait_time_minutes = st.number_input(
                "Average Wait Time (Minutes)",
                min_value=0.0,
                value=42.0,
                step=1.0,
            )

        st.divider()

        # ====================================================
        # QUALITY METRICS
        # ====================================================

        st.subheader("⭐ Quality Metrics")

        col1, col2, col3 = st.columns(3)

        with col1:
            patient_satisfaction_score = st.number_input(
                "Patient Satisfaction Score",
                min_value=0.0,
                max_value=100.0,
                value=84.0,
                step=0.10,
            )

            infection_rate = st.number_input(
                "Infection Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=3.20,
                step=0.10,
            )

        with col2:
            medication_error_rate = st.number_input(
                "Medication Error Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=0.80,
                step=0.10,
            )

            falls_rate = st.number_input(
                "Falls Rate (%)",
                min_value=0.0,
                max_value=100.0,
                value=1.20,
                step=0.10,
            )

        with col3:
            quality_score = st.number_input(
                "Quality Score",
                min_value=0.0,
                max_value=100.0,
                value=88.0,
                step=0.10,
            )

        st.divider()

        # ====================================================
        # COMPLIANCE METRICS
        # ====================================================

        st.subheader("🛡️ Compliance Metrics")

        col1, col2, col3 = st.columns(3)

        with col1:
            compliance_score = st.number_input(
                "Compliance Score",
                min_value=0.0,
                max_value=100.0,
                value=92.0,
                step=0.10,
            )

            hipaa_violations = st.number_input(
                "HIPAA Violations",
                min_value=0,
                value=2,
                step=1,
            )

        with col2:
            audit_findings = st.number_input(
                "Audit Findings",
                min_value=0,
                value=4,
                step=1,
            )

            unresolved_compliance_issues = st.number_input(
                "Unresolved Compliance Issues",
                min_value=0,
                value=7,
                step=1,
            )

        with col3:
            regulatory_risk_level = st.selectbox(
                "Regulatory Risk Level",
                options=[
                    "Low",
                    "Medium",
                    "High",
                    "Critical",
                ],
                index=1,
            )

        st.divider()

        # ====================================================
        # GOVERNANCE OBJECTIVES
        # ====================================================

        st.subheader("🎯 Governance Objectives")

        st.caption(
            "Select the strategic objectives the autonomous "
            "Command Center should prioritize."
        )

        col1, col2, col3 = st.columns(3)

        with col1:
            improve_profitability = st.checkbox(
                "Improve Profitability",
                value=True,
            )

            reduce_readmissions = st.checkbox(
                "Reduce Readmissions",
                value=True,
            )

        with col2:
            improve_quality_scores = st.checkbox(
                "Improve Quality Scores",
                value=True,
            )

            improve_compliance = st.checkbox(
                "Improve Compliance",
                value=True,
            )

        with col3:
            optimize_resources = st.checkbox(
                "Optimize Resources",
                value=True,
            )

        st.divider()

        # ====================================================
        # ADDITIONAL CONTEXT
        # ====================================================

        st.subheader("📝 Additional Context")

        additional_context_text = st.text_area(
            "Command Center Context",
            value=(
                "Hospital leadership requires a multi-agent "
                "governance assessment focused on financial "
                "performance, patient outcomes, operational "
                "efficiency, healthcare quality, and regulatory "
                "compliance."
            ),
            height=120,
        )

        st.divider()

        submitted = st.form_submit_button(
            "🚀 Execute Healthcare Command Center",
            type="primary",
            use_container_width=True,
        )

    # ========================================================
    # EXACT COMMAND CENTER REQUEST PAYLOAD
    # ========================================================

    payload = {
        "hospital_id": hospital_id,
        "hospital_name": hospital_name,
        "hospital_type": hospital_type,
        "region": region,
        "report_timestamp": report_timestamp,

        "financial_metrics": {
            "monthly_revenue": float(monthly_revenue),
            "operating_cost": float(operating_cost),
            "profit_margin": float(profit_margin),
            "accounts_receivable": float(
                accounts_receivable
            ),
            "claim_denial_rate": float(
                claim_denial_rate
            ),
            "reimbursement_rate": float(
                reimbursement_rate
            ),
        },

        "clinical_metrics": {
            "total_patients": int(total_patients),
            "admissions": int(admissions),
            "discharges": int(discharges),
            "mortality_rate": float(mortality_rate),
            "readmission_rate": float(readmission_rate),
            "average_length_of_stay": float(
                average_length_of_stay
            ),
            "emergency_visits": int(emergency_visits),
            "icu_occupancy_rate": float(
                icu_occupancy_rate
            ),
        },

        "operational_metrics": {
            "bed_occupancy_rate": float(
                bed_occupancy_rate
            ),
            "staff_utilization_rate": float(
                staff_utilization_rate
            ),
            "physician_utilization_rate": float(
                physician_utilization_rate
            ),
            "nurse_to_patient_ratio": float(
                nurse_to_patient_ratio
            ),
            "operating_room_utilization": float(
                operating_room_utilization
            ),
            "average_wait_time_minutes": float(
                average_wait_time_minutes
            ),
        },

        "quality_metrics": {
            "patient_satisfaction_score": float(
                patient_satisfaction_score
            ),
            "infection_rate": float(infection_rate),
            "medication_error_rate": float(
                medication_error_rate
            ),
            "falls_rate": float(falls_rate),
            "quality_score": float(quality_score),
        },

        "compliance_metrics": {
            "compliance_score": float(compliance_score),
            "hipaa_violations": int(hipaa_violations),
            "audit_findings": int(audit_findings),
            "unresolved_compliance_issues": int(
                unresolved_compliance_issues
            ),
            "regulatory_risk_level": regulatory_risk_level,
        },

        "governance_objectives": {
            "improve_profitability": improve_profitability,
            "reduce_readmissions": reduce_readmissions,
            "improve_quality_scores": (
                improve_quality_scores
            ),
            "improve_compliance": improve_compliance,
            "optimize_resources": optimize_resources,
        },

        "additional_context": {
            "leadership_context": additional_context_text,
        },
    }

    return payload, submitted