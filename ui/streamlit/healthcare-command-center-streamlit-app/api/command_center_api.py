from typing import Any, Dict

import requests


COMMAND_CENTER_ENDPOINT = "/command-center/execute"


def execute_command_center(
    base_url: str,
    payload: Dict[str, Any],
) -> Dict[str, Any]:
    """
    Execute Autonomous Healthcare Command Center API.
    """

    url = f"{base_url.rstrip('/')}{COMMAND_CENTER_ENDPOINT}"

    try:
        response = requests.post(
            url=url,
            json=payload,
            timeout=60000,
        )

        if response.status_code == 400:
            detail = response.json().get(
                "detail",
                "Request validation failed",
            )
            raise ValueError(detail)

        if response.status_code == 422:
            raise ValueError(
                f"FastAPI request validation failed: "
                f"{response.json()}"
            )

        if response.status_code >= 500:
            detail = response.json().get(
                "detail",
                "Internal server error",
            )
            raise RuntimeError(detail)

        response.raise_for_status()

        return response.json()

    except requests.exceptions.ConnectionError as exc:
        raise ConnectionError(
            f"Unable to connect to Command Center API at {url}"
        ) from exc

    except requests.exceptions.Timeout as exc:
        raise TimeoutError(
            "Command Center API request timed out"
        ) from exc

    except requests.exceptions.RequestException as exc:
        raise RuntimeError(
            f"Command Center API request failed: {exc}"
        ) from exc