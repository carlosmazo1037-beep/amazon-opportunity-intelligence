"""Keyword-to-product matcher - reglas de negocio para Amazon Associates."""
RULES = {
    # Organizacion
    "organize": ["under sink organizer", "drawer organizer", "closet organizer", "desk organizer"],
    "organizer": ["under sink organizer", "cable organizer", "makeup organizer", "pantry organizer"],
    "storage": ["storage bins", "vacuum storage bags", "stackable storage", "under bed storage"],
    "shelf": ["floating shelf", "corner shelf", "over toilet shelf", "spice shelf"],

    # Limpieza
    "clean": ["cleaning brush", "grout cleaner", "mold remover", "reusable cleaning cloths"],
    "mold": ["mold remover gel", "anti mold spray", "bathroom mold cleaner"],
    "stain": ["stain remover", "carpet stain cleaner", "upholstery cleaner"],

    # Cocina
    "kitchen": ["spice rack", "sink caddy", "dish drying rack", "cutting board set"],
    "spice": ["spice rack", "spice grinder", "spice jars set"],
    "coffee": ["coffee grinder", "pour over kit", "milk frother"],
    "lunch": ["bento box", "lunch bag", "thermos"],

    # Cable management
    "cable": ["cable management kit", "cable clips", "cord organizer", "cable sleeve"],
    "charger": ["charging station", "cable organizer box", "wireless charger stand"],

    # Bano
    "bathroom": ["shower caddy", "toothbrush holder", "soap dispenser"],
    "shower": ["shower caddy", "shower curtain liner", "shower squeegee"],

    # Dormitorio
    "bed": ["bed sheet clips", "mattress protector", "bed risers"],
    "pillow": ["memory foam pillow", "pillow case set", "neck pillow"],

    # Fitness
    "gym": ["resistance bands", "yoga mat", "water bottle"],
    "yoga": ["yoga mat", "yoga blocks", "yoga strap"],

    # Mascotas
    "pet": ["pet hair remover", "slow feeder bowl", "pet water fountain"],
    "dog": ["dog leash", "dog bed", "dog brush"],

    # Bebe
    "baby": ["baby monitor", "bottle sterilizer", "diaper caddy"],

    # Oficina
    "desk": ["desk organizer", "monitor stand", "laptop stand", "desk lamp"],
    "office": ["paper organizer", "file cabinet", "pen holder"],

    # Viaje
    "travel": ["packing cubes", "travel adapter", "neck pillow travel"],

    # Jardin
    "garden": ["garden tool set", "plant watering can", "seed starter kit"],
}


def match(keyword: str) -> list:
    """Devuelve productos candidatos para un keyword.

    Args:
        keyword: texto del trend o problema

    Returns:
        lista de productos (strings), sin duplicados
    """
    if not keyword:
        return []

    keyword_lower = keyword.lower()
    products = []

    for trigger, items in RULES.items():
        if trigger in keyword_lower:
            products.extend(items)

    # Dedupe manteniendo orden
    seen = set()
    unique = []
    for p in products:
        if p not in seen:
            seen.add(p)
            unique.append(p)

    return unique
