import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { HomeNav, Login } from '../../Components';

function Home() {
  console.log('onLogin');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt(token);
      console.log('iam here');
      console.log(user);
      console.log(token);
      if (user) {
        navigate('/client/home');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div>
      <HomeNav sginup />
      <Login />
    </div>
  );
}

export default Home;
