from database.init_db import create_database

def run():
    print("AOI iniciado")
    create_database()
    print("Pipeline finalizado correctamente")

if __name__=="__main__":
    run()
