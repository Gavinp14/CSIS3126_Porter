import unittest
import json
import os
import sys
from dotenv import load_dotenv
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token

# Add the backend directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

# Import the Flask app and all its configurations
from app import app, mysql, bcrypt, jwt

class TestLogin(unittest.TestCase):
    def setUp(self):
        # Load environment variables
        load_dotenv()
        
        # Configure test client
        app.config['TESTING'] = True
        self.client = app.test_client()
        
        # Test user data
        self.test_user = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'registertype': 'client'
        }
        
        # Create test user in database
        with app.app_context():
            # Hash the password
            hashed_password = bcrypt.generate_password_hash(self.test_user['password']).decode('utf-8')
            
            # First, delete any existing test user
            cursor = mysql.connection.cursor()
            cursor.execute("DELETE FROM users WHERE email = %s", (self.test_user['email'],))
            mysql.connection.commit()
            
            # Insert test user
            cursor.execute(
                "INSERT INTO users (email, password_hash, registertype) VALUES (%s, %s, %s)",
                (self.test_user['email'], hashed_password, self.test_user['registertype'])
            )
            mysql.connection.commit()
            cursor.close()

    def tearDown(self):
        # Clean up test data
        with app.app_context():
            cursor = mysql.connection.cursor()
            cursor.execute("DELETE FROM users WHERE email = %s", (self.test_user['email'],))
            mysql.connection.commit()
            cursor.close()

    def test_login_success(self):
        """Test successful login"""
        with app.app_context():
            response = self.client.post(
                '/api/v1/login',
                json={
                    'email': self.test_user['email'],
                    'password': self.test_user['password']
                }
            )
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertIn('access_token', data)

    def test_login_wrong_password(self):
        """Test login with wrong password"""
        with app.app_context():
            response = self.client.post(
                '/api/v1/login',
                json={
                    'email': self.test_user['email'],
                    'password': 'wrongpassword'
                }
            )
            self.assertEqual(response.status_code, 401)
            data = json.loads(response.data)
            self.assertEqual(data['message'], 'Invalid password')

    def test_login_nonexistent_user(self):
        """Test login with non-existent user"""
        with app.app_context():
            response = self.client.post(
                '/api/v1/login',
                json={
                    'email': 'nonexistent@example.com',
                    'password': 'somepassword'
                }
            )
            self.assertEqual(response.status_code, 401)
            data = json.loads(response.data)
            self.assertEqual(data['message'], 'User does not exist')

    def test_login_missing_fields(self):
        """Test login with missing fields"""
        with app.app_context():
            # Missing password
            response = self.client.post(
                '/api/v1/login',
                json={
                    'email': self.test_user['email']
                }
            )
            self.assertEqual(response.status_code, 400)
            data = json.loads(response.data)
            self.assertEqual(data['message'], 'Please fill out all fields')

            # Missing email
            response = self.client.post(
                '/api/v1/login',
                json={
                    'password': self.test_user['password']
                }
            )
            self.assertEqual(response.status_code, 400)
            data = json.loads(response.data)
            self.assertEqual(data['message'], 'Please fill out all fields')

if __name__ == '__main__':
    unittest.main()

