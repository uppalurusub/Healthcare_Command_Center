import streamlit as st


def render_sidebar() -> str:
    """
    Render application sidebar.
    """

    with st.sidebar:
        st.title("⚙️ Configuration")

        api_base_url = st.text_input(
            "FastAPI Base URL",
            value="http://localhost:8000",
            help="Base URL of the Healthcare Command Center API",
        )

        st.divider()

        st.subheader("🤖 Command Center Agents")

        agents = [
            ("👔", "Executive Agent"),
            ("💰", "Financial Agent"),
            ("🩺", "Clinical Agent"),
            ("⚙️", "Operations Agent"),
            ("⭐", "Quality Agent"),
            ("🛡️", "Compliance Agent"),
        ]

        for icon, agent in agents:
            st.write(f"{icon} {agent}")

        st.divider()

        st.caption(
            "Autonomous Healthcare Governance Platform"
        )

    return api_base_url