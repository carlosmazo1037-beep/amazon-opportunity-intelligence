"""Google Trends engine."""
import time
from pytrends.request import TrendReq
from aoi.core.config import TREND_COUNTRIES
from aoi.core.logger import logger

def get_trends() -> list:
    py = TrendReq(hl="en-US", tz=360, retries=3)
    data = []
    for pn, code in TREND_COUNTRIES.items():
        try:
            df = py.trending_searches(pn=pn)
            for term in df[0].head(10):
                data.append({"country": code, "keyword": str(term), "status": "DATO_VERIFICADO"})
            logger.info("Google Trends %s: %d keywords" % (pn, min(10, len(df))))
        except Exception as e:
            logger.warning("Google Trends %s fallo: %s" % (pn, e))
        time.sleep(60)
    logger.info("Google Trends total: %d keywords" % len(data))
    return data
