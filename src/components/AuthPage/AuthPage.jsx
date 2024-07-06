import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bottg-lucky-bro4.amvera.io:8000/login', { username, password }, { withCredentials: true });
      setMessage(response.json());
    } catch (error) {
      setMessage(error.response.data.message);
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
