import json
from pathlib import Path


DATA_DIR = Path(__file__).parent / "data"

def load_json() -> dict:
    """
    Load dsa.json and merge all dsa_*.json files.
    """
    with (DATA_DIR / "dsa.json").open("r", encoding="utf-8") as file:
        roadmap = json.load(file)

    for module_file in sorted(DATA_DIR.glob("module_*.json")):
        with module_file.open("r", encoding="utf-8") as file:
            roadmap["modules"].append(json.load(file))

    return roadmap