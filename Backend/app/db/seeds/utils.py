import json
from pathlib import Path


DATA_DIR = Path(__file__).parent / "data"


def load_json(filename: str) -> dict:
    """
    Load a JSON file from the seeds/data directory.
    """
    file_path = DATA_DIR / filename

    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)