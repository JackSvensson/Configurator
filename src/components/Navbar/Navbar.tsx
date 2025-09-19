import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo/Brand section */}
      <div className={styles.brand}>
        <div className={styles.logo}>
          {/* Diamond icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 8L12 22L20 8L12 2Z" fill="currentColor"/>
          </svg>
        </div>
        <span className={styles.brandName}>RINGPOP</span>
      </div>

      {/* Navigation links */}
      <div className={styles.navigation}>
        <span className={styles.navItem}>SHOP</span>
        <span className={styles.navItem}>ABOUT</span>
        <span className={styles.navItem}>CONTACT</span>
      </div>

      {/* Actions section */}
      <div className={styles.actions}>
        {/* Basket icon */}
        <div className={styles.actionItem}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" fill="currentColor"/>
          </svg>
          <span className={styles.actionText}>Basket</span>
          <span className={styles.badge}>2</span>
        </div>

        {/* Search icon */}
        <div className={styles.actionItem}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5S5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14Z" fill="currentColor"/>
          </svg>
          <span className={styles.actionText}>Search</span>
        </div>
      </div>
    </nav>
  );
}