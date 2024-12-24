import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { userLogin, adminLogin } from '../../services/api';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'user', 
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (credentials.role === 'user') {
        response = await userLogin({
          email: credentials.email,
          password: credentials.password,
        });
      } else {
        response = await adminLogin({
          email: credentials.email,
          password: credentials.password,
        });
      }
  
      
      console.log(response);
  
      
      if (response?.message === 'Login successful') {
        setMessage(response.message || 'Login successful!');
       
        localStorage.setItem('token', response.token);
        console.log(response.token); 
        setTimeout(() => {
          if (credentials.role === 'user') {
            navigate('/user-dashboard'); 
          } else {
            navigate('/admin-dashboard'); 
          }
        }, 1500);
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-gray-900 p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="text-gray-900 w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="text-gray-900 w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-100">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              className="text-gray-900 w-full p-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
