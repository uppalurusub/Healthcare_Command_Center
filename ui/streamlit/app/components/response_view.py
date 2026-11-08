from typing import Any, Dict

import streamlit as st

from components.agent_results import render_agent_results
from utils.formatters import format_execution_time


def render_response(response: Dict[str, Any]) -> None:
    """
    Render Command Center API response.
    """

    status = response.get("status", "unknown")
    message = response.get("message", "")
    execution_time = response.get(
        "execution_time_seconds",
        0,
    )
    data = response.get("data", {})

    if status.lower() == "success":
        st.success(f"✅ {message}")
    else:
        st.warning(f"⚠️ {message}")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric(
            "Execution Status",
            status.upper(),
        )

    with col2:
        st.metric(
            "Execution Time",
            format_execution_time(execution_time),
        )

    with col3:
        agent_count = (
            len(data)
            if isinstance(data, dict)
            else 0
        )

        st.metric(
            "Analysis Components",
            agent_count,
        )

    st.divider()

    if isinstance(data, dict):
        render_agent_results(data)
    else:
        st.json(data)

    with st.expander("🔍 Complete API Response"):
        st.json(response)