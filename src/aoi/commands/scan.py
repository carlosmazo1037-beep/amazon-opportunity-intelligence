"""aoi scan - scan sources for new opportunities."""
from aoi.research.google_trends import get_trends
from aoi.research.news_finder import find_problems
from aoi.database.init_db import create_database, save_trends, save_problems
from aoi.core.logger import logger


def run() -> None:
    logger.info("Running aoi scan...")
    create_database()

    trends = get_trends()
    save_trends(trends)
    print("[OK] %d trends guardados" % len(trends))

    problems = find_problems()
    save_problems(problems)
    print("[OK] %d problems guardados" % len(problems))
