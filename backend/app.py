from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import MySQLdb.cursors

app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'trainerpro'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
CORS(app)
bcrypt = Bcrypt(app)

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
    
    # Return user type along with success message
    return jsonify({
        "message": "Login successful",
        "registertype": user['registertype']
    }), 200

    


if __name__ == '__main__':
    app.run(debug=True)
