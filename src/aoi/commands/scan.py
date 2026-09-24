"""aoi scan - scan all sources and build opportunities."""
from aoi.research.google_trends import get_trends
from aoi.research.news_finder import find_problems
from aoi.research.opportunity_engine import build_opportunities
from aoi.database.init_db import (
    create_database, save_trends, save_problems, save_opportunities,
)
from aoi.core.logger import logger


def run() -> None:
    logger.info("Running aoi scan...")
    create_database()

    trends = get_trends()
    save_trends(trends)
    print("[OK] %d trends" % len(trends))

    problems = find_problems()
    save_problems(problems)
    print("[OK] %d problems" % len(problems))

    opportunities = build_opportunities(trends, problems)
    save_opportunities(opportunities)
    print("[OK] %d opportunities" % len(opportunities))
