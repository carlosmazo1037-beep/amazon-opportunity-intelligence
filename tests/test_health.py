
from src.core.health import database_ok

def test_database():

    assert database_ok()