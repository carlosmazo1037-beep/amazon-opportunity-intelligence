"""aoi trends."""
from aoi.research.google_trends import get_trends
from aoi.database.init_db import create_database, save_trends
from aoi.core.logger import logger

def run() -> None:
    logger.info("Running aoi trends...")
    create_database()
    trends = get_trends()
    save_trends(trends)
    print("[OK] %d trends guardados" % len(trends))
