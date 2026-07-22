from typing import Any, Dict

import requests
import streamlit as st

from components.request_form import render_request_form


API_ENDPOINT = "/command-center/execute"


st.set_page_config(
    page_title="Autonomous Healthcare Command Center",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded",
)


def initialize_session_state():

    if "command_center_response" not in st.session_state:
        st.session_state.command_center_response = None


def execute_command_center(
    base_url: str,
    payload: Dict[str, Any],
) -> Dict[str, Any]:

    url = f"{base_url.rstrip('/')}{API_ENDPOINT}"

    # Debug information
    print("=" * 80)
    print("COMMAND CENTER API URL")
    print(url)
    print("=" * 80)

    print("COMMAND CENTER REQUEST PAYLOAD")
    print(payload)
    print("=" * 80)

    response = requests.post(
        url=url,
        json=payload,
        timeout=600,
    )

    if response.status_code == 400:

        try:
            detail = response.json().get(
                "detail",
                "Validation failed",
            )
        except Exception:
            detail = response.text

        raise ValueError(detail)

    if response.status_code == 422:

        raise ValueError(
            "FastAPI request validation failed:\n\n"
            f"{response.text}"
        )

    if response.status_code >= 500:

        try:
            detail = response.json().get(
                "detail",
                "Internal server error",
            )
        except Exception:
            detail = response.text

        raise RuntimeError(detail)

    response.raise_for_status()

    return response.json()


def render_sidebar():

    with st.sidebar:

        st.title("⚙️ Configuration")

        api_base_url = st.text_input(
            "FastAPI Base URL",
            value="http://127.0.0.1:8000/api/v1",
        )

        st.divider()

        st.subheader("🤖 Command Center Agents")

        st.write("👔 Executive Agent")
        st.write("💰 Financial Agent")
        st.write("🩺 Clinical Agent")
        st.write("⚙️ Operations Agent")
        st.write("⭐ Quality Agent")
        st.write("🛡️ Compliance Agent")

        st.divider()

        st.caption(
            "Autonomous Healthcare Governance Platform"
        )

    return api_base_url


def render_list(data):

    if not data:

        st.info("No data available")

        return

    if all(
        isinstance(item, dict)
        for item in data
    ):

        st.dataframe(
            data,
            use_container_width=True,
            hide_index=True,
        )

    else:

        for item in data:

            st.markdown(f"- {item}")


def format_metric_value(
    key: str,
    value: Any,
):

    normalized_key = key.lower()

    financial_keywords = [
        "revenue",
        "cost",
        "budget",
        "expense",
        "saving",
        "claim",
        "receivable",
    ]

    percentage_keywords = [
        "rate",
        "percentage",
        "percent",
        "utilization",
        "score",
        "satisfaction",
        "margin",
        "occupancy",
    ]

    if any(
        keyword in normalized_key
        for keyword in financial_keywords
    ):

        return f"${value:,.2f}"

    if any(
        keyword in normalized_key
        for keyword in percentage_keywords
    ):

        return f"{value:,.2f}%"

    if isinstance(value, float):

        return f"{value:,.2f}"

    return f"{value:,}"


def render_dictionary(data):

    numeric_metrics = {
        key: value
        for key, value in data.items()
        if isinstance(value, (int, float))
        and not isinstance(value, bool)
    }

    if numeric_metrics:

        metric_items = list(
            numeric_metrics.items()
        )

        for start in range(
            0,
            len(metric_items),
            4,
        ):

            row_metrics = metric_items[
                start:start + 4
            ]

            columns = st.columns(
                len(row_metrics)
            )

            for column, (
                key,
                value,
            ) in zip(
                columns,
                row_metrics,
            ):

                with column:

                    st.metric(
                        key.replace(
                            "_",
                            " ",
                        ).title(),
                        format_metric_value(
                            key,
                            value,
                        ),
                    )

    for key, value in data.items():

        if key in numeric_metrics:
            continue

        title = key.replace(
            "_",
            " ",
        ).title()

        if isinstance(value, dict):

            with st.expander(
                f"📊 {title}",
                expanded=True,
            ):

                render_dictionary(value)

        elif isinstance(value, list):

            st.markdown(f"#### {title}")

            render_list(value)

        else:

            st.markdown(f"**{title}**")

            st.write(value)


def render_response(response):

    status = response.get(
        "status",
        "unknown",
    )

    message = response.get(
        "message",
        "",
    )

    execution_time = response.get(
        "execution_time_seconds",
        0,
    )

    data = response.get(
        "data",
        {},
    )

    if str(status).lower() == "success":

        st.success(
            f"✅ {message}"
        )

    else:

        st.warning(
            f"⚠️ {message}"
        )

    col1, col2, col3 = st.columns(3)

    with col1:

        st.metric(
            "Execution Status",
            str(status).upper(),
        )

    with col2:

        st.metric(
            "Execution Time",
            f"{float(execution_time):.2f} sec",
        )

    with col3:

        component_count = (
            len(data)
            if isinstance(data, dict)
            else 0
        )

        st.metric(
            "Analysis Components",
            component_count,
        )

    st.divider()

    st.subheader(
        "🤖 Multi-Agent Governance Analysis"
    )

    if isinstance(data, dict) and data:

        tabs = st.tabs(
            [
                key.replace(
                    "_",
                    " ",
                ).title()
                for key in data.keys()
            ]
        )

        for tab, (
            key,
            value,
        ) in zip(
            tabs,
            data.items(),
        ):

            with tab:

                st.subheader(
                    key.replace(
                        "_",
                        " ",
                    ).title()
                )

                if isinstance(value, dict):

                    render_dictionary(value)

                elif isinstance(value, list):

                    render_list(value)

                else:

                    st.write(value)

    elif isinstance(data, dict):

        st.info(
            "No Command Center analysis data available."
        )

    else:

        st.write(data)

    with st.expander(
        "🔍 Complete API Response"
    ):

        st.json(response)


def main():

    initialize_session_state()

    st.title(
        "🏥 Autonomous Healthcare Command Center"
    )

    st.caption(
        "AI-powered multi-agent healthcare governance, "
        "financial, clinical, operational, quality and "
        "compliance analysis."
    )

    api_base_url = render_sidebar()

    st.divider()

    # This now calls request_form.py
    payload, submitted = render_request_form()

    if submitted:

        st.subheader("📤 Command Center Request Payload")

        # IMPORTANT DEBUG VIEW
        st.json(payload)

        if not payload["hospital_id"].strip():

            st.error(
                "Hospital ID is required."
            )

            return

        if not payload["hospital_name"].strip():

            st.error(
                "Hospital Name is required."
            )

            return

        if not payload["region"].strip():

            st.error(
                "Region is required."
            )

            return

        with st.spinner(
            "🤖 Healthcare Command Center agents "
            "are analyzing hospital data..."
        ):

            try:

                response = execute_command_center(
                    base_url=api_base_url,
                    payload=payload,
                )

                st.session_state.command_center_response = (
                    response
                )

            except requests.exceptions.ConnectionError:

                st.error(
                    "❌ Unable to connect to FastAPI server."
                )

                st.code(
                    f"{api_base_url}{API_ENDPOINT}",
                    language="text",
                )

            except requests.exceptions.Timeout:

                st.error(
                    "❌ Command Center API request timed out."
                )

            except Exception as exc:

                st.error(
                    "❌ Command Center execution failed."
                )

                st.exception(exc)

    if st.session_state.command_center_response:

        st.divider()

        render_response(
            st.session_state.command_center_response
        )


if __name__ == "__main__":
    main()