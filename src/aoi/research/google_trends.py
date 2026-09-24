"""Google Trends engine - fetches trending searches using trendspyg."""
from trendspyg import download_google_trends_rss
from aoi.core.config import TREND_COUNTRIES
from aoi.core.logger import logger


def get_trends() -> list:
    """Fetch trending searches for supported countries via RSS.

    Returns a list of dicts with: country, keyword, status.
    """
    data = []

    for pn, code in TREND_COUNTRIES.items():
        try:
            trends = download_google_trends_rss(geo=code)
            for item in trends[:10]:
                data.append({
                    "country": code,
                    "keyword": item["trend"],      # <-- string plano, no objeto
                    "status": "DATO_VERIFICADO",
                })
            logger.info("Google Trends %s: %d keywords" % (pn, min(10, len(trends))))
        except Exception as e:
            logger.warning("Google Trends %s fallo: %s" % (pn, e))

    logger.info("Google Trends total: %d keywords" % len(data))
    return data