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

#get client and user info
@app.route('/api/v1/client/<int:user_id>', methods=['GET'])
def get_client_info(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users CROSS JOIN clients WHERE users.user_id = %s", (user_id,))
    clientInfo = cursor.fetchall()

    return jsonify({"client info": clientInfo}), 200

#get trainer and user info 
@app.route('/api/v1/trainer/<int:user_id>', methods=['GET'])
def get_trainer_info(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users CROSS JOIN trainers WHERE users.user_id = %s", (user_id,))
    trainerInfo = cursor.fetchall()

    return jsonify({"trainer info": trainerInfo}), 200

#trainers endpoints
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


#client endpoints
@app.route('/api/v1/clients', methods=['GET'])
def get_clients():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM clients")
    clients = cursor.fetchall()
    
    return jsonify({"clients": clients}), 200

@app.route('/api/v1/clients', methods=['POST'])
def create_client():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    age = data.get('age')
    gender = data.get('gender')
    hometown = data.get('hometown')
    fitness_goals = data.get('fitness_goals')
    user_id = data.get('user_id')

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO clients (first_name, last_name, age, gender, hometown, fitness_goals, user_id) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (first_name, last_name, age, gender, hometown, fitness_goals, user_id)
    )

    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Client registered successfully"}), 201

#program endpoints
@app.route('/api/v1/programs', methods=['GET'])
def get_programs():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM programs")
    programs = cursor.fetchall()

    return jsonify({"programs": programs}), 200

@app.route('/api/v1/programs', methods=['POST'])
def create_program():
    data = request.get_json()
    user_id = data.get('user_id')
    program_name = data.get('program_name')
    program_description = data.get('program_description')
    program_link = data.get('program_link')

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO programs (user_id, program_name, program_description, program_link) VALUES (%s, %s, %s, %s)",
        (user_id, program_name, program_description, program_link)
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Program added successfully"}), 201

@app.route('/api/v1/programs/<int:user_id>', methods=['GET'])
def get_program_info(user_id):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM programs WHERE user_id = %s", (user_id,))
        program_info = cursor.fetchall()

        # If no programs are found, return a proper error message
        if not program_info:
            return jsonify({"error": "No programs found for this user."}), 404

        # Return the raw program info as a list of tuples
        return jsonify({"programs": program_info}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    






























#progress endpoints
@app.route('/api/v1/progress/<int:user_id>', methods=['GET'])
def get_progress(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM progress WHERE user_id = %s", (user_id,))
    progress = cursor.fetchall()

    return jsonify({"progress": progress}), 200

@app.route('/api/v1/progress', methods=['POST'])
def create_progress():
    data = request.get_json()
    user_id = data.get('user_id')
    progress_date = data.get('progress_date')
    weight = data.get('weight')
    body_fat_percentage = data.get('body_fat_percentage')

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO progress (user_id, progress_date, weight, body_fat_percentage) VALUES (%s, %s, %s, %s)",
        (user_id, progress_date, weight, body_fat_percentage)
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Progress added successfully"}), 201



if __name__ == '__main__':
    app.run(debug=True)
