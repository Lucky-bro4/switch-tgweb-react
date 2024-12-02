import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bottry-lucky-bro4.amvera.io/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        navigate('/adminPage');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className='btn-login' type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthPage;
