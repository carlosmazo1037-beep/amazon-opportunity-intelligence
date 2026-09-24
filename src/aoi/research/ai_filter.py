"""AI filter - usa Groq (compatible con OpenAI SDK) para filtrar keywords."""
import time

from openai import OpenAI

from aoi.core.config import GROQ_API_KEY
from aoi.core.logger import logger

_client = None


def _get_client():
    global _client
    if _client is None:
        if not GROQ_API_KEY:
            logger.warning("GROQ_API_KEY no configurada, ai_filter deshabilitado")
            return None
        _client = OpenAI(
            base_url="https://api.groq.com/openai/v1",
            api_key=GROQ_API_KEY,
        )
    return _client


PROMPT_TEMPLATE = (
    'Responde SOLO con SI o NO.\n'
    '\n'
    'Pregunta: el keyword "{keyword}" es sobre un PRODUCTO FISICO '
    'que se puede comprar en Amazon?\n'
    '\n'
    'SI si menciona o implica un producto fisico:\n'
    '- "under sink organizer", "cable management", "kitchen storage"\n'
    '- "air fryer accessories", "dog bed", "yoga mat"\n'
    '\n'
    'NO si es sobre:\n'
    '- Deportes: equipos, partidos, jugadores, resultados\n'
    '- Politica: elecciones, presidentes, guerras\n'
    '- Celebridades: actores, cantantes, escandalos\n'
    '- Noticias: muertes, accidentes, clima\n'
    '- Eventos: premios, festivales, conciertos\n'
    '- Geografia: paises, ciudades, regiones\n'
    '\n'
    'Respuesta:'
)

def is_amazon_relevant(keyword: str) -> bool:
    client = _get_client()
    if client is None:
        return True

    if not keyword or len(keyword.strip()) < 3:
        return False

    try:
        resp = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": PROMPT_TEMPLATE.format(keyword=keyword)}],
            max_tokens=200,
            temperature=0,
            extra_body={"reasoning_effort": "low"},
        )
        answer = resp.choices[0].message.content.strip().upper()
        result = answer.startswith("SI") or answer.startswith("S?")

        time.sleep(0.5)
        return result

    except Exception as e:
        logger.warning("ai_filter fallo para '%s': %s" % (keyword, e))
        return True
