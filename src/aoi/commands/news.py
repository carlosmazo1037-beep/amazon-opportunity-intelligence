"""aoi news - fetch Google News signals."""
from aoi.research.news_finder import find_problems
from aoi.database.init_db import create_database, save_problems
from aoi.core.logger import logger


def run() -> None:
    logger.info("Running aoi news...")
    create_database()
    problems = find_problems()
    save_problems(problems)
    print("[OK] %d problems guardados en database/aoi.db" % len(problems))
