"""Opportunity Engine - combina trends + problems en oportunidades clasificadas."""
from aoi.research.matcher import match
from aoi.research.scoring import classify, overall_status
from aoi.research.ai_filter import is_amazon_relevant
from aoi.core.logger import logger


def _process_items(items: list, source: str, opportunities: list, seen: set, use_ai: bool = True):
    skipped_ai = 0
    skipped_match = 0
    initial = len(opportunities)

    for item in items:
        keyword = item.get("keyword", "")
        if not keyword:
            continue

        if use_ai:
            if not is_amazon_relevant(keyword):
                skipped_ai += 1
                continue

        products = match(keyword)
        if not products:
            skipped_match += 1
            continue

        for product in products:
            key = (item["country"], keyword.lower(), product)
            if key in seen:
                continue
            seen.add(key)

            opp = {
                "country": item["country"],
                "keyword": keyword,
                "product": product,
                "source": source,
            }
            scores = classify(opp)
            opp["demand"] = scores["demand"]
            opp["problem"] = scores["problem"]
            opp["content"] = scores["content"]
            opp["competition"] = scores["competition"]
            opp["status"] = overall_status(scores)
            opportunities.append(opp)

    logger.info("%s: total=%d skipped_ai=%d skipped_match=%d added=%d" % (
        source, len(items), skipped_ai, skipped_match, len(opportunities) - initial))


def build_opportunities(trends: list, problems: list = None, use_ai: bool = True) -> list:
    problems = problems or []
    opportunities = []
    seen = set()

    _process_items(trends, "google_trends", opportunities, seen, use_ai)
    _process_items(problems, "google_news", opportunities, seen, use_ai)

    logger.info("Built %d opportunities" % len(opportunities))
    return opportunities
