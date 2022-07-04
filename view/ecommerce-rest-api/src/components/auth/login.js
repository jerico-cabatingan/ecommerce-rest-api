import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/index';
// import { getLastCart } from '../../api/index';
import styles from './auth.module.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedlogin] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(username, password);
    
    !result ? setFailedlogin(true) :  
      setFailedlogin(false)
      sessionStorage.setItem('id', result.id);
      sessionStorage.setItem('username', result.username);
      navigate('/products')
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input className={styles.input} 
            type="text" 
            value={username} 
            onChange={({target}) => setUsername(target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input className={styles.input} 
            type="text" 
            value={password} 
            onChange={({target}) => setPassword(target.value)}
          />
        </div>

        { failedLogin === true && <h5 className={styles.h5}>Incorrect Details</h5>}

        <div className={styles.field}>
          <button className={styles.authButton} type="submit">Log In!</button>
        </div>
      </form>

      <div className={styles.field}>
        <h6 className={styles.h6}>or log in with</h6>
        <a href='http://localhost:3001/auth/google'>
          <button className={styles.authButton}>Google</button>
        </a>
        
        <a href='http://localhost:3001/auth/facebook'>
          <button className={styles.authButton}>Facebook</button>
        </a>
      </div>

      <div className={styles.field}>
        <h6>Don't have an account?</h6>
        <Link to='/registration'>
          <button className={styles.authButton}>
            Register
          </button>
        </Link>
      </div>
    </section>
  )
};