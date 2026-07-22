from typing import Union


def format_execution_time(
    seconds: Union[int, float],
) -> str:
    """
    Format execution time.
    """

    if seconds < 60:
        return f"{seconds:.2f} sec"

    minutes = seconds / 60

    return f"{minutes:.2f} min"