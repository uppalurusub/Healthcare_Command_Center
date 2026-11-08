from typing import Any, Dict

import streamlit as st


AGENT_CONFIGURATION = {
    "executive": {
        "title": "Executive Agent",
        "icon": "👔",
    },
    "financial": {
        "title": "Financial Agent",
        "icon": "💰",
    },
    "clinical": {
        "title": "Clinical Agent",
        "icon": "🩺",
    },
    "operations": {
        "title": "Operations Agent",
        "icon": "⚙️",
    },
    "quality": {
        "title": "Quality Agent",
        "icon": "⭐",
    },
    "compliance": {
        "title": "Compliance Agent",
        "icon": "🛡️",
    },
}


def find_agent_config(key: str) -> Dict[str, str]:
    """
    Resolve agent configuration using response key.
    """

    normalized_key = key.lower()

    for agent_key, config in AGENT_CONFIGURATION.items():
        if agent_key in normalized_key:
            return config

    return {
        "title": key.replace("_", " ").title(),
        "icon": "🤖",
    }


def render_agent_results(data: Dict[str, Any]) -> None:
    """
    Render individual Command Center agent responses.
    """

    st.subheader("🤖 Multi-Agent Governance Analysis")

    tabs = st.tabs(
        [
            f"{find_agent_config(key)['icon']} "
            f"{find_agent_config(key)['title']}"
            for key in data.keys()
        ]
    )

    for tab, (key, value) in zip(tabs, data.items()):
        with tab:
            render_agent_content(key, value)


def render_agent_content(
    agent_name: str,
    agent_data: Any,
) -> None:
    """
    Render agent result dynamically.
    """

    config = find_agent_config(agent_name)

    st.subheader(
        f"{config['icon']} {config['title']}"
    )

    if isinstance(agent_data, dict):
        render_dictionary(agent_data)

    elif isinstance(agent_data, list):
        render_list(agent_data)

    else:
        st.write(agent_data)


def render_dictionary(data: Dict[str, Any]) -> None:
    """
    Dynamically render dictionary response.
    """

    metric_values = {
        key: value
        for key, value in data.items()
        if isinstance(value, (int, float))
        and not isinstance(value, bool)
    }

    if metric_values:
        columns = st.columns(
            min(len(metric_values), 4)
        )

        for index, (key, value) in enumerate(
            metric_values.items()
        ):
            with columns[index % len(columns)]:
                st.metric(
                    key.replace("_", " ").title(),
                    format_metric_value(key, value),
                )

    for key, value in data.items():

        if key in metric_values:
            continue

        title = key.replace("_", " ").title()

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


def render_list(data: list) -> None:
    """
    Render list response.
    """

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
) -> str:
    """
    Format metric value based on key.
    """

    normalized_key = key.lower()

    if any(
        word in normalized_key
        for word in [
            "revenue",
            "cost",
            "budget",
            "financial",
            "expense",
            "saving",
        ]
    ):
        return f"${value:,.2f}"

    if any(
        word in normalized_key
        for word in [
            "rate",
            "percentage",
            "percent",
            "utilization",
            "score",
        ]
    ):
        return f"{value:,.2f}%"

    if isinstance(value, float):
        return f"{value:,.2f}"

    return f"{value:,}"