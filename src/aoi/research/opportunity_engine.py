
from aoi.research.matcher import match

def build_opportunities(trends):
    opportunities=[]

    for item in trends:

        products=match(item["keyword"])

        for product in products:

            opportunities.append({
                "country":item["country"],
                "keyword":item["keyword"],
                "product":product,
                "source":item["source"],
                "status":"HIPOTESIS"
            })

    return opportunities