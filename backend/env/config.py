import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

def get_database_connection():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="trainerpro"
)