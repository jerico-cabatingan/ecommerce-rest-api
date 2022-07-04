import React, { useState, useEffect } from 'react';
import { registerNewUser, login } from '../../api/index';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';

export const Registration = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerNewUser(fname, lname, email, username, password);

    if (result.detail) {
      setError(result.detail);
    } 
    else if (result && !error) {
      const credentials = await login(result.username, password);

      !credentials ? setError(credentials) :
        setFname('');
        setLname('');
        setUsername('');
        setEmail('');
        setPassword('');
        setError(null);
        sessionStorage.setItem('id', credentials.id);
        sessionStorage.setItem('username', credentials.username);
        sessionStorage.setItem('isLoggedIn', true);
        navigate('/products');
    }
  };


  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>First Name</label>
          <input className={styles.input} 
            type="text" 
            value={fname} 
            onChange={({target}) => setFname(target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Last Name</label>
          <input className={styles.input} 
            type="text" 
            value={lname} 
            onChange={({target}) => setLname(target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>E-mail</label>
          <input className={styles.input} 
            type="text" 
            value={email} 
            onChange={({target}) => setEmail(target.value)}
          />
        </div>

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

        <div className={styles.field}>
          <button className={styles.authButton} type="submit">Register!</button>
        </div>

        { error && <h5 className={styles.h5}>{error}</h5> }
      </form>

      <div className={styles.field}>
         <h6 className={styles.h6}>or register with</h6>
        <a href='http://localhost:3001/auth/google'>
          <button className={styles.authButton}>Google</button>
        </a>
        <a href='http://localhost:3001/auth/facebook'>
          <button className={styles.authButton}>Facebook</button>
        </a>
      </div>

      <div className={styles.field}>
        <h6 className={styles.h6}>Already have an account?</h6>
        <Link to='/login'>
          <button className={styles.authButton}>
            Log in
          </button>
        </Link>
      </div>
    </section>
  )
};