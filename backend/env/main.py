from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import bcrypt
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

class Login(BaseModel):
    email: str
    password_hash: str

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


@app.post("/login")
async def login(user: Login):
    connection = get_database_connection()
    cursor = connection.cursor()

    try:
        query = "SELECT email, password_hash, registertype FROM users WHERE email = %s"
        cursor.execute(query, (user.email,))  # Proper parameterized query
        
        user_record = cursor.fetchone()  # Fetch the user record
        
        if not user_record:
            raise HTTPException(status_code=401, detail="User not found")

        # Verify the hashed password using bcrypt
        if not bcrypt.checkpw(user.password.encode('utf-8'), user_record["password_hash"].encode('utf-8')):
            raise HTTPException(status_code=401, detail="Incorrect password")

        return {"message": "Login successful", "registertype": user_record["registertype"]}

    finally:
        cursor.close()  # Always close cursor
        connection.close()  # Close the connection


@app.get("/users")
async def read_users():
    connection = get_database_connection()
    cursor = connection.cursor(dictionary=True)  # Ensure results are in dictionary format
    query = "SELECT * FROM users"
    cursor.execute(query)
    users = cursor.fetchall()
    connection.close()

    return {"users": users}  # Wrap in a dictionary for JSON serialization



@app.get("/")
def read_root():
    return {"message": "Hello World"}
