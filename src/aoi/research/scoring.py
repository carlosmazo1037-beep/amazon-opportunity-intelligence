"""Evidence scoring - clasifica oportunidades segun evidencia disponible.

Estados:
- DATO_VERIFICADO: fuente directa y verificable (Google Trends, RSS oficial)
- HIPOTESIS: inferencia analitica (keyword -> producto, aun no verificada)
- PENDIENTE: sin datos suficientes
"""


def classify(opportunity: dict) -> dict:
    """Clasifica cada dimension de una oportunidad segun evidencia.

    Args:
        opportunity: dict con country, keyword, product, source

    Returns:
        dict con estados por dimension: demand, problem, content, competition
    """
    source = opportunity.get("source", "")

    demand = "DATO_VERIFICADO" if source == "google_trends" else "PENDIENTE"
    problem = "DATO_VERIFICADO" if source == "google_news" else "HIPOTESIS"

    return {
        "demand": demand,
        "problem": problem,
        "content": "PENDIENTE",      # v0.7.0: validar con YouTube
        "competition": "PENDIENTE",  # v0.8.0: validar con Amazon
    }


def overall_status(scores: dict) -> str:
    """Estado global: si demand o problem estan verificados, es HIPOTESIS avanzada."""
    verified = sum(1 for v in scores.values() if v == "DATO_VERIFICADO")
    if verified >= 2:
        return "ALTA_CONFIANZA"
    if verified == 1:
        return "HIPOTESIS"
    return "PENDIENTE"
