import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.title}>
        Welcome to my shop!
      </div>
      <div className={styles.top}>
        <Link to="/products">
          <button className={styles.home_button} id='shop-now'>Shop Now!</button>
        </Link>
      </div>
      <div className={styles.bottom}>
        <Link to="/login">
          <button className={styles.lower_button}>Log in</button>
        </Link>
        <Link to="/registration">
          <button className={styles.lower_button}>Register</button>
        </Link>
      </div>
    </div>
  );
}