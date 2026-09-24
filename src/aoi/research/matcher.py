
"""Keyword-to-product matcher - reglas de negocio para Amazon Associates."""
RULES = {
    # ---------- HOGAR: ORGANIZACION ----------
    "organize": ["under sink organizer", "drawer organizer", "closet organizer", "desk organizer"],
    "organizer": ["under sink organizer", "cable organizer", "makeup organizer", "pantry organizer"],
    "storage": ["storage bins", "vacuum storage bags", "stackable storage", "under bed storage"],
    "shelf": ["floating shelf", "corner shelf", "over toilet shelf", "spice shelf"],
    "basket": ["wicker basket", "storage basket", "laundry basket"],
    "hook": ["adhesive hooks", "wall hooks", "over door hooks"],
    "rack": ["shoe rack", "drying rack", "spice rack"],

    # ---------- HOGAR: LIMPIEZA ----------
    "clean": ["cleaning brush", "grout cleaner", "mold remover", "reusable cleaning cloths"],
    "mold": ["mold remover gel", "anti mold spray", "bathroom mold cleaner"],
    "stain": ["stain remover", "carpet stain cleaner", "upholstery cleaner"],
    "dust": ["microfiber duster", "electric duster", "dusting mitt"],
    "vacuum": ["handheld vacuum", "robot vacuum", "vacuum bags"],
    "mop": ["spin mop", "electric mop", "microfiber mop pads"],

    # ---------- COCINA ----------
    "kitchen": ["spice rack", "sink caddy", "dish drying rack", "cutting board set"],
    "spice": ["spice rack", "spice grinder", "spice jars set"],
    "coffee": ["coffee grinder", "pour over kit", "milk frother"],
    "lunch": ["bento box", "lunch bag", "thermos"],
    "air fryer": ["air fryer liners", "air fryer accessories", "air fryer cookbook"],
    "instant pot": ["instant pot accessories", "pressure cooker cookbook", "silicone trivet"],
    "meal prep": ["meal prep containers", "meal prep cookbook", "portion control plates"],
    "knife": ["kitchen knife set", "knife sharpener", "cutting board"],
    "baking": ["baking mat", "measuring cups", "cake pan set"],
    "utensil": ["utensil set", "utensil holder", "silicone spatula"],
    "water bottle": ["insulated water bottle", "water bottle brush", "bottle carrier"],

    # ---------- CABLE MANAGEMENT ----------
    "cable": ["cable management kit", "cable clips", "cord organizer", "cable sleeve"],
    "charger": ["charging station", "cable organizer box", "wireless charger stand"],
    "wire": ["cable ties", "wire clips", "cable management tray"],
    "usb": ["usb hub", "usb c adapter", "usb charging station"],

    # ---------- BANO ----------
    "bathroom": ["shower caddy", "toothbrush holder", "soap dispenser"],
    "shower": ["shower caddy", "shower curtain liner", "shower squeegee"],
    "toilet": ["toilet paper holder", "toilet brush", "toilet plunger"],
    "towel": ["towel rack", "towel warmer", "towel hooks"],

    # ---------- DORMITORIO ----------
    "bed": ["bed sheet clips", "mattress protector", "bed risers"],
    "pillow": ["memory foam pillow", "pillow case set", "neck pillow"],
    "mattress": ["mattress protector", "mattress topper", "mattress vacuum bag"],
    "sheet": ["bed sheet set", "sheet clips", "sheet organizer"],
    "curtain": ["blackout curtains", "curtain rods", "curtain clips"],
    "lamp": ["bedside lamp", "reading light", "smart bulb"],

    # ---------- SALON ----------
    "sofa": ["sofa cover", "couch cushion", "sofa organizer"],
    "tv": ["tv wall mount", "tv stand", "tv cable organizer"],
    "rug": ["area rug", "rug pad", "rug gripper"],
    "decor": ["wall art", "picture frame", "decorative vase"],

    # ---------- FITNESS ----------
    "gym": ["resistance bands", "yoga mat", "water bottle"],
    "yoga": ["yoga mat", "yoga blocks", "yoga strap"],
    "weight": ["dumbbell set", "kettlebell", "weight bench"],
    "running": ["running shoes", "running belt", "sports headphones"],
    "bike": ["bike lock", "bike pump", "bike light"],

    # ---------- MASCOTAS ----------
    "pet": ["pet hair remover", "slow feeder bowl", "pet water fountain"],
    "dog": ["dog leash", "dog bed", "dog brush"],
    "cat": ["cat tree", "cat litter mat", "cat toy set"],
    "aquarium": ["aquarium filter", "fish tank heater", "aquarium gravel"],

    # ---------- BEBE ----------
    "baby": ["baby monitor", "bottle sterilizer", "diaper caddy"],
    "toddler": ["toddler cup", "toddler plate set", "toddler backpack"],
    "kid": ["kids backpack", "kids water bottle", "kids lunch box"],

    # ---------- OFICINA ----------
    "desk": ["desk organizer", "monitor stand", "laptop stand", "desk lamp"],
    "office": ["paper organizer", "file cabinet", "pen holder"],
    "chair": ["office chair", "chair cushion", "chair mat"],
    "monitor": ["monitor stand", "monitor arm", "monitor light bar"],
    "keyboard": ["mechanical keyboard", "keyboard wrist rest", "keyboard cover"],

    # ---------- VIAJE ----------
    "travel": ["packing cubes", "travel adapter", "neck pillow travel"],
    "luggage": ["luggage set", "luggage scale", "luggage tag"],
    "passport": ["passport holder", "passport wallet", "travel document organizer"],

    # ---------- JARDIN ----------
    "garden": ["garden tool set", "plant watering can", "seed starter kit"],
    "plant": ["plant pot", "plant stand", "self watering planter"],
    "patio": ["patio furniture cover", "outdoor string lights", "patio heater"],

    # ---------- AUTO ----------
    "car": ["car phone mount", "car vacuum", "car organizer"],
    "auto": ["car seat cover", "steering wheel cover", "car charger"],
    "drive": ["dash cam", "car phone holder", "car emergency kit"],

    # ---------- ELECTRONICA ----------
    "phone": ["phone case", "phone stand", "phone grip"],
    "laptop": ["laptop stand", "laptop sleeve", "laptop cooling pad"],
    "headphone": ["headphone stand", "headphone case", "earbuds"],
    "speaker": ["bluetooth speaker", "speaker stand", "portable speaker"],

    # ---------- ROPA ----------
    "cloth": ["clothes hangers", "garment bag", "clothes steamer"],
    "shoe": ["shoe rack", "shoe organizer", "shoe inserts"],
    "laundry": ["laundry basket", "laundry sorter", "lint roller"],
}


def match(keyword: str) -> list:
    """Devuelve productos candidatos para un keyword."""
    if not keyword:
        return []

    keyword_lower = keyword.lower()
    products = []

    for trigger, items in RULES.items():
        if trigger in keyword_lower:
            products.extend(items)

    seen = set()
    unique = []
    for p in products:
        if p not in seen:
            seen.add(p)
            unique.append(p)

    return unique