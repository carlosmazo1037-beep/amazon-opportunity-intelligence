
import sqlite3

def database_ok():

    try:
        sqlite3.connect("database/aoi.db").close()

        return True

    except:

        return False