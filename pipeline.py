from database.init_db import create_database
from src.core.logger import logger

def run():
    logger.info("Pipeline iniciado")
    create_database()
    logger.info("Pipeline finalizado")
    print("AOI OK")

if __name__=="__main__":
    run()
