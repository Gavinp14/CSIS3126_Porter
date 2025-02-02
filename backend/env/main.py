from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from .config import get_database_connection

#initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class User(BaseModel):
    firstname: str
    lastname: str
    email: str
    password_hash: str
    registertype: str

@app.post("/users")
async def create_user(user: User):
    connection = get_database_connection()
    cursor = connection.cursor()
    query = "INSERT INTO users (firstname, lastname, email, password_hash, registertype) VALUES (%s, %s, %s, %s, %s)"
    values = (user.firstname, user.lastname, user.email, user.password_hash, user.registertype)
    cursor.execute(query, values)
    connection.commit()
    connection.close()
    return {"message": "User created successfully"}


@app.get("/users")
async def read_users():
    connection = get_database_connection()
    cursor = connection.cursor()
    query = "SELECT * FROM users"
    cursor.execute(query)
    users = cursor.fetchall()
    connection.close()
    return users


@app.get("/")
def read_root():
    return {"message": "Hello World"}
