from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import MySQLdb.cursors
import os 
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables
load_dotenv()
print(os.getenv('HOST'))

# MySQL Configuration
app.config['MYSQL_HOST'] = os.getenv('HOST')
app.config['MYSQL_USER'] = os.getenv('USER')
app.config['MYSQL_PASSWORD'] = os.getenv('PASS')
app.config['MYSQL_DB'] = os.getenv('DB')
app.config['MYSQL_CURSORCLASS'] = os.getenv('CURSORCLASS')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

#misc configurations
mysql = MySQL(app)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

#test enpoint to ensure everything is working 
@app.route('/')
def index():
    return jsonify({"message": "Hello, World!"})  

#register endpoint 
@app.route('/api/v1/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password_hash')
    registertype = data.get('registertype')

    if not email or not password or not registertype:
        return jsonify({"message": "Please fill out all fields"}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        return jsonify({"message": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    cursor.execute(
        "INSERT INTO users (email, password_hash, registertype) VALUES (%s, %s, %s)",
        (email, hashed_password, registertype)
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "User registered successfully"}), 201

#login endpoint 
@app.route('/api/v1/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"message": "Please fill out all fields"}), 400
    
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    
    if not user:
        return jsonify({"message": "User does not exist"}), 401
        
    if not bcrypt.check_password_hash(user['password_hash'], password):
        return jsonify({"message": "Invalid password"}), 401
    
    if user and bcrypt.check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity={
            "email": user['email'],
            "user_id": user['user_id'],  # Include user_id in the token
            "registertype": user['registertype']  # Include registertype in the token
        })
        return jsonify({
            "access_token": access_token,
        }), 200

#trainers endpoint
@app.route('/api/v1/trainers', methods=['GET'])
def get_trainers():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM trainers")
    trainers = cursor.fetchall()
    
    return jsonify({"trainers": trainers}), 200


@app.route('/api/v1/trainers', methods=['POST'])
def create_trainer():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    age = data.get('age')
    gender = data.get('gender')
    years_experience = data.get('years_experience')
    location = data.get('location')
    about_text = data.get('about_text')
    specialty = data.get('specialty')

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO trainers (first_name, last_name, age, gender, years_experience, location, about_text, specialty) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (first_name, last_name, age, gender, years_experience, location, about_text, specialty)
    )

    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "User registered successfully"}), 201


if __name__ == '__main__':
    app.run(debug=True)
