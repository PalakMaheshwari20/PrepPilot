import json
from pathlib import Path


DATA_DIR = Path(__file__).parent / "data"


def load_json(filename: str) -> dict:
    with open(DATA_DIR / filename, "r", encoding="utf-8") as file:
        return json.load(file)