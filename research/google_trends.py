
from pytrends.request import TrendReq

COUNTRIES = {
    "US": "united_states",
    "ES": "spain",
    "GB": "united_kingdom",
    "DE": "germany",
    "JP": "japan"
}

def get_trends():
    pytrends = TrendReq(hl="en-US", tz=360)
    results = []

    for code, country in COUNTRIES.items():
        try:
            df = pytrends.trending_searches(pn=code)

            for term in df[0].head(10):
                results.append({
                    "country": country,
                    "keyword": term,
                    "source": "Google Trends",
                    "status": "DATO_VERIFICADO"
                })

        except Exception as e:
            print(f"{country}: {e}")

    return results