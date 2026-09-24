"""Opportunity Engine - combina trends + problems en oportunidades clasificadas."""
from aoi.research.matcher import match
from aoi.research.scoring import classify, overall_status
from aoi.core.logger import logger


def build_opportunities(trends: list, problems: list = None) -> list:
    """Convierte trends + problems en oportunidades con productos candidatos.

    Args:
        trends: lista de dicts con country, keyword, status
        problems: lista opcional de dicts con country, keyword, title, source

    Returns:
        lista de oportunidades con country, keyword, product, source, scores
    """
    problems = problems or []
    opportunities = []
    seen = set()

    # Procesar trends
    for item in trends:
        keyword = item.get("keyword", "")
        products = match(keyword)

        for product in products:
            key = (item["country"], keyword.lower(), product)
            if key in seen:
                continue
            seen.add(key)

            opp = {
                "country": item["country"],
                "keyword": keyword,
                "product": product,
                "source": "google_trends",
            }
            scores = classify(opp)
            opp["demand"] = scores["demand"]
            opp["problem"] = scores["problem"]
            opp["content"] = scores["content"]
            opp["competition"] = scores["competition"]
            opp["status"] = overall_status(scores)
            opportunities.append(opp)

    # Procesar problems
    for item in problems:
        keyword = item.get("keyword", "")
        products = match(keyword)

        for product in products:
            key = (item["country"], keyword.lower(), product)
            if key in seen:
                continue
            seen.add(key)

            opp = {
                "country": item["country"],
                "keyword": keyword,
                "product": product,
                "source": "google_news",
            }
            scores = classify(opp)
            opp["demand"] = scores["demand"]
            opp["problem"] = scores["problem"]
            opp["content"] = scores["content"]
            opp["competition"] = scores["competition"]
            opp["status"] = overall_status(scores)
            opportunities.append(opp)

    logger.info("Built %d opportunities" % len(opportunities))
    return opportunities
