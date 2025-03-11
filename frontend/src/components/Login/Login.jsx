import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/login', {
        email,
        password
      });
      
      if (response.data.token) {
        login({
          token: response.data.token,
          user_id: response.data.user_id,
          role: response.data.role
        });
        // Redirect user after login
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  // Rest of component
} 