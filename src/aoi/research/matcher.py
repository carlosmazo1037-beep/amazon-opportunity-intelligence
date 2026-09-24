# src/aoi/research/matcher.py
RULES = {
    "organize": ["under sink organizer", "drawer organizer", "closet organizer"],
    "clean":    ["cleaning brush", "grout cleaner"],
    # ... amplía según necesites
}

def match(keyword: str) -> list[str]:
    """Devuelve productos candidatos para un keyword."""
    keyword = keyword.lower()
    products = []
    for trigger, items in RULES.items():
        if trigger in keyword:
            products.extend(items)
    return products