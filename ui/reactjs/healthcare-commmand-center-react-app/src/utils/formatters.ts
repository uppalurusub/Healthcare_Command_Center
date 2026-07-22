const DEFAULT_LOCALE = "en-IN";

const DEFAULT_CURRENCY = "INR";

/**
 * Formats an ISO date value.
 *
 * Example:
 * 2026-08-10T09:57:18.619798
 * → 10 Aug 2026
 */
export const formatDate = (
  value: string | Date | null | undefined
): string => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString(
    DEFAULT_LOCALE,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

/**
 * Formats an ISO date and time value.
 *
 * Example:
 * 2026-07-11T09:57:18.619798
 * → 11 Jul 2026, 09:57 am
 */
export const formatDateTime = (
  value: string | Date | null | undefined
): string => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString(
    DEFAULT_LOCALE,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

/**
 * Formats a number using Indian number formatting.
 *
 * Example:
 * 25000000
 * → 2,50,00,000
 */
export const formatNumber = (
  value: number | null | undefined,
  maximumFractionDigits = 2
): string => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "-";
  }

  return new Intl.NumberFormat(
    DEFAULT_LOCALE,
    {
      maximumFractionDigits,
    }
  ).format(value);
};

/**
 * Formats a number as Indian Rupees.
 *
 * Example:
 * 25000000
 * → ₹2,50,00,000
 */
export const formatCurrency = (
  value: number | null | undefined,
  currency = DEFAULT_CURRENCY
): string => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "-";
  }

  return new Intl.NumberFormat(
    DEFAULT_LOCALE,
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  ).format(value);
};

/**
 * Formats currency using compact notation.
 *
 * Example:
 * 25000000
 * → ₹2.5Cr
 *
 * 3200000
 * → ₹32L
 */
export const formatCompactCurrency = (
  value: number | null | undefined
): string => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "-";
  }

  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 10_000_000) {
    return `₹${formatDecimal(
      value / 10_000_000
    )}Cr`;
  }

  if (absoluteValue >= 100_000) {
    return `₹${formatDecimal(
      value / 100_000
    )}L`;
  }

  if (absoluteValue >= 1_000) {
    return `₹${formatDecimal(
      value / 1_000
    )}K`;
  }

  return formatCurrency(value);
};

/**
 * Formats a percentage value.
 *
 * Example:
 * 26
 * → 26.0%
 */
export const formatPercentage = (
  value: number | null | undefined,
  fractionDigits = 1
): string => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "-";
  }

  return `${value.toFixed(
    fractionDigits
  )}%`;
};

/**
 * Formats a decimal probability as percentage.
 *
 * Example:
 * 0.75
 * → 75%
 */
export const formatProbability = (
  probability: number | null | undefined,
  fractionDigits = 0
): string => {
  if (
    probability === null ||
    probability === undefined ||
    !Number.isFinite(probability)
  ) {
    return "-";
  }

  return `${(
    probability * 100
  ).toFixed(fractionDigits)}%`;
};

/**
 * Formats execution duration.
 *
 * Examples:
 * 45.25
 * → 45.25 sec
 *
 * 405.85
 * → 6m 45.85s
 *
 * 3725
 * → 1h 2m 5.00s
 */
export const formatExecutionTime = (
  seconds: number | null | undefined
): string => {
  if (
    seconds === null ||
    seconds === undefined ||
    !Number.isFinite(seconds) ||
    seconds < 0
  ) {
    return "0.00 sec";
  }

  if (seconds < 60) {
    return `${seconds.toFixed(2)} sec`;
  }

  const hours = Math.floor(
    seconds / 3600
  );

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  const remainingSeconds =
    seconds % 60;

  if (hours > 0) {
    return (
      `${hours}h ` +
      `${minutes}m ` +
      `${remainingSeconds.toFixed(2)}s`
    );
  }

  return (
    `${minutes}m ` +
    `${remainingSeconds.toFixed(2)}s`
  );
};

/**
 * Formats elapsed timer value.
 *
 * Example:
 * 405
 * → 06:45
 */
export const formatElapsedTime = (
  seconds: number
): string => {
  if (
    !Number.isFinite(seconds) ||
    seconds < 0
  ) {
    return "00:00";
  }

  const hours = Math.floor(
    seconds / 3600
  );

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  const remainingSeconds = Math.floor(
    seconds % 60
  );

  const formattedMinutes = minutes
    .toString()
    .padStart(2, "0");

  const formattedSeconds =
    remainingSeconds
      .toString()
      .padStart(2, "0");

  if (hours > 0) {
    const formattedHours = hours
      .toString()
      .padStart(2, "0");

    return (
      `${formattedHours}:` +
      `${formattedMinutes}:` +
      `${formattedSeconds}`
    );
  }

  return (
    `${formattedMinutes}:` +
    `${formattedSeconds}`
  );
};

/**
 * Formats large values using compact notation.
 *
 * Examples:
 * 4500
 * → 4.5K
 *
 * 2500000
 * → 2.5M
 */
export const formatCompactNumber = (
  value: number | null | undefined
): string => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "-";
  }

  return new Intl.NumberFormat(
    DEFAULT_LOCALE,
    {
      notation: "compact",
      maximumFractionDigits: 1,
    }
  ).format(value);
};

/**
 * Converts snake_case values into readable labels.
 *
 * Example:
 * average_length_of_stay
 * → Average Length Of Stay
 */
export const formatLabel = (
  value: string | null | undefined
): string => {
  if (!value) {
    return "";
  }

  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
};

/**
 * Formats field names while preserving
 * common healthcare abbreviations.
 *
 * Example:
 * icu_occupancy_rate
 * → ICU Occupancy Rate
 *
 * hipaa_violations
 * → HIPAA Violations
 */
export const formatHealthcareLabel = (
  value: string | null | undefined
): string => {
  if (!value) {
    return "";
  }

  const abbreviationMap: Record<
    string,
    string
  > = {
    icu: "ICU",
    hipaa: "HIPAA",
    nabh: "NABH",
    jci: "JCI",
    ai: "AI",
    kpi: "KPI",
    api: "API",
    id: "ID",
    ehr: "EHR",
    emr: "EMR",
    cto: "CTO",
    ceo: "CEO",
    cfo: "CFO",
    coo: "COO",
  };

  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => {
      const normalizedWord =
        word.toLowerCase();

      return (
        abbreviationMap[
          normalizedWord
        ] ??
        normalizedWord.replace(
          /^\w/,
          (character) =>
            character.toUpperCase()
        )
      );
    })
    .join(" ");
};

/**
 * Formats governance scores.
 *
 * Example:
 * 89
 * → 89.0
 */
export const formatScore = (
  score: number | null | undefined,
  fractionDigits = 1
): string => {
  if (
    score === null ||
    score === undefined ||
    !Number.isFinite(score)
  ) {
    return "-";
  }

  return score.toFixed(
    fractionDigits
  );
};

/**
 * Formats a variance value and preserves sign.
 *
 * Examples:
 * 7
 * → +7.0%
 *
 * -4.5
 * → -4.5%
 */
export const formatVariance = (
  value: number | null | undefined,
  fractionDigits = 1
): string => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "-";
  }

  const sign =
    value > 0 ? "+" : "";

  return (
    `${sign}` +
    `${value.toFixed(
      fractionDigits
    )}%`
  );
};

/**
 * Truncates long text.
 *
 * Useful for agent summaries.
 */
export const truncateText = (
  value: string,
  maximumLength = 150
): string => {
  if (!value) {
    return "";
  }

  if (
    value.length <= maximumLength
  ) {
    return value;
  }

  return (
    value
      .slice(0, maximumLength)
      .trimEnd() +
    "..."
  );
};

/**
 * Formats report identifiers.
 *
 * Example:
 * CMD-667a7246-e134-45fd-9e03-ef1e3a2845f8
 * → CMD-667A7246
 */
export const formatReportId = (
  reportId: string | null | undefined
): string => {
  if (!reportId) {
    return "-";
  }

  const parts =
    reportId.split("-");

  if (parts.length < 2) {
    return reportId.toUpperCase();
  }

  return `${parts[0]}-${parts[1]}`.toUpperCase();
};

/**
 * Internal decimal formatter.
 *
 * Removes unnecessary trailing zero.
 *
 * Example:
 * 2.50
 * → 2.5
 */
const formatDecimal = (
  value: number
): string => {
  return value.toLocaleString(
    DEFAULT_LOCALE,
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  );
};