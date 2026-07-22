import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  CommandCenterRequest,
} from "../../models/commandCenterRequest";

interface CommandCenterFormProps {
  loading: boolean;

  onExecute: (
    request: CommandCenterRequest
  ) => Promise<void>;
}

type SectionName =
  | "hospital"
  | "financial"
  | "clinical"
  | "operational"
  | "quality"
  | "compliance"
  | "governance"
  | "context";

const initialRequest: CommandCenterRequest = {
  hospital_id: "HOSP-APOLLO-001",

  hospital_name:
    "Apollo Hospitals Hyderabad",

  hospital_type: "Multi-Specialty",

  region: "South India",

  report_timestamp:
    new Date().toISOString(),

  financial_metrics: {
    monthly_revenue: 25000000,
    operating_cost: 18500000,
    profit_margin: 26.0,
    accounts_receivable: 3200000,
    claim_denial_rate: 6.5,
    reimbursement_rate: 92.8,
  },

  clinical_metrics: {
    total_patients: 4500,
    admissions: 850,
    discharges: 790,
    mortality_rate: 1.8,
    readmission_rate: 12.4,
    average_length_of_stay: 5.6,
    emergency_visits: 420,
    icu_occupancy_rate: 88.5,
  },

  operational_metrics: {
    bed_occupancy_rate: 92.0,
    staff_utilization_rate: 87.0,
    physician_utilization_rate: 84.0,
    nurse_to_patient_ratio: 1.6,
    operating_room_utilization: 81.5,
    average_wait_time_minutes: 38,
  },

  quality_metrics: {
    patient_satisfaction_score: 89.2,
    infection_rate: 1.3,
    medication_error_rate: 0.4,
    falls_rate: 0.2,
    quality_score: 86.5,
  },

  compliance_metrics: {
    compliance_score: 91.5,
    hipaa_violations: 1,
    audit_findings: 3,
    unresolved_compliance_issues: 2,
    regulatory_risk_level: "Low",
  },

  governance_objectives: {
    improve_profitability: true,
    reduce_readmissions: true,
    improve_quality_scores: true,
    improve_compliance: true,
    optimize_resources: true,
  },

  additional_context: {
    hospital_beds: 1200,
    employees: 5500,
    physicians: 750,
    nurses: 2200,

    accreditations: [
      "NABH",
      "JCI",
    ],

    specialties: [
      "Cardiology",
      "Oncology",
      "Neurology",
      "Orthopedics",
      "Transplant",
    ],

    strategic_focus: [
      "Digital Transformation",
      "Population Health",
      "Operational Excellence",
    ],
  },
};

const CommandCenterForm = ({
  loading,
  onExecute,
}: CommandCenterFormProps) => {
  const [request, setRequest] =
    useState<CommandCenterRequest>(
      initialRequest
    );

  const [activeSection, setActiveSection] =
    useState<SectionName>("hospital");

  const [validationError, setValidationError] =
    useState<string>("");

  const handleHospitalChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      name,
      value,
    } = event.target;

    setRequest((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  const handleMetricChange = (
    section:
      | "financial_metrics"
      | "clinical_metrics"
      | "operational_metrics"
      | "quality_metrics"
      | "compliance_metrics",

    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ): void => {
    const {
      name,
      value,
    } = event.target;

    setRequest((previous) => ({
      ...previous,

      [section]: {
        ...previous[section],

        [name]:
          name === "regulatory_risk_level"
            ? value
            : Number(value),
      },
    }));
  };

  const handleGovernanceChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      name,
      checked,
    } = event.target;

    setRequest((previous) => ({
      ...previous,

      governance_objectives: {
        ...previous.governance_objectives,

        [name]: checked,
      },
    }));
  };

  const handleContextNumberChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      name,
      value,
    } = event.target;

    setRequest((previous) => ({
      ...previous,

      additional_context: {
        ...previous.additional_context,

        [name]: Number(value),
      },
    }));
  };

  const handleContextArrayChange = (
    field:
      | "accreditations"
      | "specialties"
      | "strategic_focus",

    value: string
  ): void => {
    const values = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setRequest((previous) => ({
      ...previous,

      additional_context: {
        ...previous.additional_context,

        [field]: values,
      },
    }));
  };

  const validateForm = (): boolean => {
    if (!request.hospital_id.trim()) {
      setValidationError(
        "Hospital ID is required"
      );

      setActiveSection("hospital");

      return false;
    }

    if (!request.hospital_name.trim()) {
      setValidationError(
        "Hospital name is required"
      );

      setActiveSection("hospital");

      return false;
    }

    if (!request.hospital_type.trim()) {
      setValidationError(
        "Hospital type is required"
      );

      setActiveSection("hospital");

      return false;
    }

    if (!request.region.trim()) {
      setValidationError(
        "Region is required"
      );

      setActiveSection("hospital");

      return false;
    }

    setValidationError("");

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const commandCenterRequest: CommandCenterRequest = {
      ...request,

      report_timestamp:
        new Date().toISOString(),
    };

    await onExecute(
      commandCenterRequest
    );
  };

  return (
    <section className="command-form-card">
      <div className="command-form-header">
        <div>
          <h2>
            Healthcare Governance Analysis
          </h2>

          <p>
            Configure hospital metrics and execute
            the autonomous multi-agent command
            center.
          </p>
        </div>

        <span className="form-agent-badge">
          6 AI Agents
        </span>
      </div>

      {validationError && (
        <div className="form-validation-message">
          {validationError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="command-form-tabs">
          <button
            type="button"
            className={
              activeSection === "hospital"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("hospital")
            }
          >
            Hospital
          </button>

          <button
            type="button"
            className={
              activeSection === "financial"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("financial")
            }
          >
            Financial
          </button>

          <button
            type="button"
            className={
              activeSection === "clinical"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("clinical")
            }
          >
            Clinical
          </button>

          <button
            type="button"
            className={
              activeSection === "operational"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("operational")
            }
          >
            Operations
          </button>

          <button
            type="button"
            className={
              activeSection === "quality"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("quality")
            }
          >
            Quality
          </button>

          <button
            type="button"
            className={
              activeSection === "compliance"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("compliance")
            }
          >
            Compliance
          </button>

          <button
            type="button"
            className={
              activeSection === "governance"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("governance")
            }
          >
            Objectives
          </button>

          <button
            type="button"
            className={
              activeSection === "context"
                ? "form-tab active"
                : "form-tab"
            }
            onClick={() =>
              setActiveSection("context")
            }
          >
            Context
          </button>
        </div>

        <div className="command-form-content">
          {activeSection === "hospital" && (
            <div className="form-section">
              <h3>Hospital Information</h3>

              <div className="form-grid">
                <FormInput
                  label="Hospital ID"
                  name="hospital_id"
                  value={request.hospital_id}
                  onChange={handleHospitalChange}
                />

                <FormInput
                  label="Hospital Name"
                  name="hospital_name"
                  value={request.hospital_name}
                  onChange={handleHospitalChange}
                />

                <FormInput
                  label="Hospital Type"
                  name="hospital_type"
                  value={request.hospital_type}
                  onChange={handleHospitalChange}
                />

                <FormInput
                  label="Region"
                  name="region"
                  value={request.region}
                  onChange={handleHospitalChange}
                />
              </div>
            </div>
          )}

          {activeSection === "financial" && (
            <div className="form-section">
              <h3>Financial Metrics</h3>

              <div className="form-grid">
                {Object.entries(
                  request.financial_metrics
                ).map(([key, value]) => (
                  <MetricInput
                    key={key}
                    label={formatLabel(key)}
                    name={key}
                    value={value}
                    onChange={(event) =>
                      handleMetricChange(
                        "financial_metrics",
                        event
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {activeSection === "clinical" && (
            <div className="form-section">
              <h3>Clinical Metrics</h3>

              <div className="form-grid">
                {Object.entries(
                  request.clinical_metrics
                ).map(([key, value]) => (
                  <MetricInput
                    key={key}
                    label={formatLabel(key)}
                    name={key}
                    value={value}
                    onChange={(event) =>
                      handleMetricChange(
                        "clinical_metrics",
                        event
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {activeSection === "operational" && (
            <div className="form-section">
              <h3>Operational Metrics</h3>

              <div className="form-grid">
                {Object.entries(
                  request.operational_metrics
                ).map(([key, value]) => (
                  <MetricInput
                    key={key}
                    label={formatLabel(key)}
                    name={key}
                    value={value}
                    onChange={(event) =>
                      handleMetricChange(
                        "operational_metrics",
                        event
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {activeSection === "quality" && (
            <div className="form-section">
              <h3>Quality Metrics</h3>

              <div className="form-grid">
                {Object.entries(
                  request.quality_metrics
                ).map(([key, value]) => (
                  <MetricInput
                    key={key}
                    label={formatLabel(key)}
                    name={key}
                    value={value}
                    onChange={(event) =>
                      handleMetricChange(
                        "quality_metrics",
                        event
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {activeSection === "compliance" && (
            <div className="form-section">
              <h3>Compliance Metrics</h3>

              <div className="form-grid">
                <MetricInput
                  label="Compliance Score"
                  name="compliance_score"
                  value={
                    request.compliance_metrics
                      .compliance_score
                  }
                  onChange={(event) =>
                    handleMetricChange(
                      "compliance_metrics",
                      event
                    )
                  }
                />

                <MetricInput
                  label="HIPAA Violations"
                  name="hipaa_violations"
                  value={
                    request.compliance_metrics
                      .hipaa_violations
                  }
                  onChange={(event) =>
                    handleMetricChange(
                      "compliance_metrics",
                      event
                    )
                  }
                />

                <MetricInput
                  label="Audit Findings"
                  name="audit_findings"
                  value={
                    request.compliance_metrics
                      .audit_findings
                  }
                  onChange={(event) =>
                    handleMetricChange(
                      "compliance_metrics",
                      event
                    )
                  }
                />

                <MetricInput
                  label="Unresolved Compliance Issues"
                  name="unresolved_compliance_issues"
                  value={
                    request.compliance_metrics
                      .unresolved_compliance_issues
                  }
                  onChange={(event) =>
                    handleMetricChange(
                      "compliance_metrics",
                      event
                    )
                  }
                />

                <div className="form-group">
                  <label htmlFor="regulatory_risk_level">
                    Regulatory Risk Level
                  </label>

                  <select
                    id="regulatory_risk_level"
                    name="regulatory_risk_level"
                    value={
                      request.compliance_metrics
                        .regulatory_risk_level
                    }
                    onChange={(event) =>
                      handleMetricChange(
                        "compliance_metrics",
                        event
                      )
                    }
                    disabled={loading}
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                    <option value="Critical">
                      Critical
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === "governance" && (
            <div className="form-section">
              <h3>Governance Objectives</h3>

              <div className="objective-grid">
                {Object.entries(
                  request.governance_objectives
                ).map(([key, value]) => (
                  <label
                    key={key}
                    className="objective-card"
                  >
                    <input
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={
                        handleGovernanceChange
                      }
                      disabled={loading}
                    />

                    <div>
                      <strong>
                        {formatLabel(key)}
                      </strong>

                      <span>
                        Enable governance analysis
                        for this objective
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeSection === "context" && (
            <div className="form-section">
              <h3>Additional Context</h3>

              <div className="form-grid">
                <MetricInput
                  label="Hospital Beds"
                  name="hospital_beds"
                  value={
                    request.additional_context
                      .hospital_beds
                  }
                  onChange={
                    handleContextNumberChange
                  }
                />

                <MetricInput
                  label="Employees"
                  name="employees"
                  value={
                    request.additional_context
                      .employees
                  }
                  onChange={
                    handleContextNumberChange
                  }
                />

                <MetricInput
                  label="Physicians"
                  name="physicians"
                  value={
                    request.additional_context
                      .physicians
                  }
                  onChange={
                    handleContextNumberChange
                  }
                />

                <MetricInput
                  label="Nurses"
                  name="nurses"
                  value={
                    request.additional_context
                      .nurses
                  }
                  onChange={
                    handleContextNumberChange
                  }
                />

                <ArrayInput
                  label="Accreditations"
                  value={
                    request.additional_context
                      .accreditations
                  }
                  onChange={(value) =>
                    handleContextArrayChange(
                      "accreditations",
                      value
                    )
                  }
                />

                <ArrayInput
                  label="Specialties"
                  value={
                    request.additional_context
                      .specialties
                  }
                  onChange={(value) =>
                    handleContextArrayChange(
                      "specialties",
                      value
                    )
                  }
                />

                <ArrayInput
                  label="Strategic Focus"
                  value={
                    request.additional_context
                      .strategic_focus
                  }
                  onChange={(value) =>
                    handleContextArrayChange(
                      "strategic_focus",
                      value
                    )
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className="command-form-actions">
          <div className="execution-information">
            <span>🤖</span>

            <p>
              Executive, Financial, Clinical,
              Operations, Quality and Compliance
              agents will analyze the hospital.
            </p>
          </div>

          <button
            type="submit"
            className="execute-button"
            disabled={loading}
          >
            {loading
              ? "Executing Agent Swarm..."
              : "Execute Command Center"}
          </button>
        </div>
      </form>
    </section>
  );
};

interface FormInputProps {
  label: string;
  name: string;
  value: string;

  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

const FormInput = ({
  label,
  name,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

interface MetricInputProps {
  label: string;
  name: string;
  value: number;

  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

const MetricInput = ({
  label,
  name,
  value,
  onChange,
}: MetricInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        type="number"
        step="any"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

interface ArrayInputProps {
  label: string;
  value: string[];

  onChange: (
    value: string
  ) => void;
}

const ArrayInput = ({
  label,
  value,
  onChange,
}: ArrayInputProps) => {
  return (
    <div className="form-group form-group-full">
      <label>{label}</label>

      <input
        type="text"
        value={value.join(", ")}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      <span className="form-helper-text">
        Enter comma-separated values
      </span>
    </div>
  );
};

const formatLabel = (
  value: string
): string => {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
};

export default CommandCenterForm;