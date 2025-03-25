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

# Get messages between a user and a contact (works for both client and trainer)
@app.route('/api/v1/messages/thread/<int:user_id>/<int:contact_id>', methods=['GET'])
@jwt_required()
def get_message_thread_generic(user_id, contact_id):
    # Get identity from token
    current_user = get_jwt_identity()
    
    # Verify user is requesting their own messages
    if str(current_user.get('user_id')) != str(user_id):
        return jsonify({"error": "Unauthorized access"}), 403
    
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("""
        SELECT 
            message_id,
            sender_id,
            receiver_id,
            message_text
        FROM messages
        WHERE (sender_id = %s AND receiver_id = %s)
           OR (sender_id = %s AND receiver_id = %s)
        ORDER BY message_id ASC
    """, (user_id, contact_id, contact_id, user_id))
    
    message_thread = cursor.fetchall()
    cursor.close()
    
    return jsonify({"messages": message_thread}), 200

# Get all trainers that a client has messaged
@app.route('/api/v1/trainermessages/<int:user_id>', methods=['GET'])
@jwt_required()
def get_trainers_contacts(user_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("""
        SELECT DISTINCT 
            trainers.trainer_id, 
            trainers.first_name, 
            trainers.last_name
        FROM messages
        JOIN trainers ON messages.receiver_id = trainers.trainer_id
        WHERE messages.sender_id = %s
    """, (user_id,))
    
    trainers_messaged = cursor.fetchall()
    cursor.close()
    
    return jsonify({"trainers": trainers_messaged}), 200

@app.route('/api/v1/clientmessages/<int:trainer_id>', methods=['GET'])
def get_clients_contacts(trainer_id):
    # Get database cursor
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    try:
        # Modified query to correctly identify clients who have interacted with this trainer
        # This ensures we only get clients (not other trainers) and handles both directions of communication
        cursor.execute("""
            SELECT DISTINCT
                c.client_id,
                c.first_name,
                c.last_name,
                MAX(m.timestamp) as last_message_time
            FROM clients c
            JOIN messages m ON (c.client_id = m.sender_id AND m.receiver_id = %s) 
                           OR (c.client_id = m.receiver_id AND m.sender_id = %s)
            WHERE c.client_id != %s
            GROUP BY c.client_id, c.first_name, c.last_name
            ORDER BY last_message_time DESC
        """, (trainer_id, trainer_id, trainer_id))
        
        clients = cursor.fetchall()
        
        # Log success without exposing all client data
        print(f"Successfully retrieved {len(clients)} clients for trainer {trainer_id}")
        
        return jsonify({"success": True, "clients": clients}), 200
    
    except Exception as e:
        # Handle errors properly
        print(f"Error retrieving clients for trainer {trainer_id}: {str(e)}")
        return jsonify({"success": False, "error": "Failed to retrieve clients"}), 500
    
    finally:
        # Always close the cursor
        cursor.close()

# Send a message (works for both client and trainer)
@app.route('/api/v1/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    message_text = data.get('message_text')

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (%s, %s, %s)",  (sender_id, receiver_id, message_text)
    )       
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Message sent successfully"}), 201

  
#assign trainer to client
@app.route('/api/v1/trainer_clients/<int:client_id>', methods=['POST'])
def assign_trainer_to_client(client_id):
    data = request.get_json()
    id = data.get('id') 
    trainer_id = data.get('trainer_id')
    client_id = data.get('client_id')

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO trainer_clients (id, trainer_id, client_id) VALUES (%s, %s, %s)", (id, trainer_id, client_id))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Trainer assigned successfully"}), 201


#get all clients assigned for a trainer
@app.route('/api/v1/trainer_clients/<int:trainer_id>', methods=['GET'])
def get_assigned_clients(trainer_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        # Join the trainer_clients table with clients table to get client information
        cursor.execute("""
            SELECT 
                c.id,
                c.first_name,
                c.last_name,
                c.age,
                c.gender,
                c.hometown,
                c.fitness_goals
            FROM trainer_clients tc
            JOIN clients c ON tc.id = c.id
            WHERE tc.trainer_id = %s
            ORDER BY c.last_name, c.first_name
        """, (trainer_id,))
        
        clients = cursor.fetchall()
        
        # Log success
        print(f"Retrieved {len(clients)} assigned clients for trainer {trainer_id}")
        
        return jsonify({"success": True, "clients": clients}), 200
    
    except Exception as e:
        # Handle errors properly
        print(f"Error retrieving assigned clients for trainer {trainer_id}: {str(e)}")
        return jsonify({"success": False, "error": "Failed to retrieve assigned clients"}), 500
    
    finally:
        # Always close the cursor
        cursor.close()


#assign program to client
@app.route('/api/v1/assign-programs', methods=['POST'])
def assign_programs():
    data = request.get_json()
    client_id = data.get('client_id')
    program_id = data.get('program_id')

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO client_programs (client_id, program_id) VALUES (%s, %s)",
        (client_id, program_id)
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Program added successfully"}), 201





























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

@app.route('/api/v1/verify-token', methods=['GET'])
def verify_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'valid': False}), 401
    
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        # Check if user exists in database
        user = User.query.get(payload['sub'])
        if not user:
            return jsonify({'valid': False}), 401
        
        return jsonify({'valid': True, 'user_id': user.id, 'role': user.role})
    except jwt.ExpiredSignatureError:
        return jsonify({'valid': False, 'error': 'Token expired'}), 401
    except (jwt.InvalidTokenError, Exception) as e:
        return jsonify({'valid': False, 'error': str(e)}), 401

@app.route('/api/v1/trainer/all-messages/<int:trainer_id>', methods=['GET'])
def get_all_trainer_messages(trainer_id):
    """Simple debug endpoint that returns ALL messages involving the trainer"""
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    # Simple query to get all messages involving this trainer
    cursor.execute("""
        SELECT 
            messages.message_id,
            messages.sender_id,
            messages.receiver_id,
            messages.message_text,
            CONCAT(sender_info.first_name, ' ', sender_info.last_name) AS sender_name,
            CONCAT(receiver_info.first_name, ' ', receiver_info.last_name) AS receiver_name
        FROM messages
        LEFT JOIN clients AS sender_info ON messages.sender_id = sender_info.client_id
        LEFT JOIN clients AS receiver_info ON messages.receiver_id = receiver_info.client_id
        WHERE messages.sender_id = %s OR messages.receiver_id = %s
        ORDER BY messages.message_id DESC
    """, (trainer_id, trainer_id))
    
    messages = cursor.fetchall()
    cursor.close()
    
    return jsonify({"all_messages": messages}), 200

if __name__ == '__main__':
    app.run(debug=True)
