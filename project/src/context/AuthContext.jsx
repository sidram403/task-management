// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser  = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get('/auth/getUser'); // Adjust endpoint as needed
          setUser (response.data.user);
          setIsAuthenticated(true)
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser (null); // Reset user if there's an error
        }
      } else {
        setUser (null); // Reset user if no token
      }
    };

    fetchUser();
  }, [token]);

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      setUser (response.data.user);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      const { token} = response.data; // Assuming API returns token and user data
      Cookies.set('authToken', token, { expires: 7 }); // Save token in cookies for 7 days
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = async () => {
    setUser (null);
    setToken('');
    setIsAuthenticated(false)
    localStorage.removeItem('token');
    await axiosInstance.post('/auth/logout')
    setUser(null)

  };


  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};