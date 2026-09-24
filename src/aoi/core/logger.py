"""AOI logger."""
import logging
from aoi.core.config import LOGS_DIR
logging.basicConfig(filename=LOGS_DIR / "aoi.log", level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("AOI")
