"""Streamlit Cloud entry point - bootstraps the AOI dashboard from src/."""
import sys
from pathlib import Path

# A?adir src/ al Python path para que `import aoi` funcione
ROOT = Path(__file__).parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

# Importar y ejecutar el dashboard principal
from aoi.dashboard.app import main  # noqa: E402

main()
