"""Google News RSS engine - detects problems and demand signals from news."""
import feedparser
from urllib.parse import quote
from aoi.core.config import TREND_COUNTRIES
from aoi.core.logger import logger

# Queries por defecto: buscan senales de problema y demanda
DEFAULT_QUERIES = [
    "under sink organizer problem",
    "cable management messy",
    "closet organizer small space",
    "kitchen storage solution",
]


def find_problems(country_code: str = "US", queries: list = None) -> list:
    """Fetch news items for problem-related queries via Google News RSS.

    Returns a list of dicts with: country, keyword, source, title, link, status.
    """
    queries = queries or DEFAULT_QUERIES
    data = []

    for query in queries:
        try:
            # Google News RSS endpoint - no API key needed
            url = (
                f"https://news.google.com/rss/search?"
                f"q={quote(query)}&hl=en-US&gl={country_code}&ceid={country_code}:en"
            )
            feed = feedparser.parse(url)

            for entry in feed.entries[:10]:
                data.append({
                    "country": country_code,
                    "keyword": query,
                    "source": "google_news",
                    "title": entry.get("title", ""),
                    "link": entry.get("link", ""),
                    "status": "DATO_VERIFICADO",
                })

            logger.info("Google News %s '%s': %d items" % (country_code, query, min(10, len(feed.entries))))
        except Exception as e:
            logger.warning("Google News %s '%s' fallo: %s" % (country_code, query, e))

    logger.info("Google News total: %d items" % len(data))
    return data
