'use client';

import React, { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const prevCountRef = useRef(itemCount);

  useEffect(() => {
    prevCountRef.current = itemCount;
  }, [itemCount]);

  const isUpdating = itemCount > prevCountRef.current;

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.brandContainer}>
          <span className={styles.brandName}>RINGPOP</span>
          <div className={styles.logo}>
            <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.1994 10.943L21.8557 3.94299C21.7918 3.87251 21.7131 3.81604 21.6248 3.77737C21.5365 3.73869 21.4406 3.71871 21.3436 3.71877H8.65614C8.5596 3.71803 8.464 3.73716 8.37571 3.77487C8.28742 3.81259 8.20847 3.86804 8.14411 3.93752L1.80036 10.9375C1.6909 11.0596 1.63189 11.2163 1.63461 11.3777C1.63733 11.5392 1.70158 11.694 1.81508 11.8125L14.5026 24.9375C14.5662 25.0034 14.6432 25.056 14.7287 25.0919C14.8143 25.1279 14.9066 25.1464 14.9999 25.1464C15.0932 25.1464 15.1855 25.1279 15.2711 25.0919C15.3566 25.056 15.4336 25.0034 15.4972 24.9375L28.1847 11.8125C28.2966 11.6943 28.3599 11.5406 28.3626 11.3804C28.3654 11.2203 28.3073 11.0647 28.1994 10.943ZM9.10247 12.0313L13.022 21.4911L3.8768 12.0313H9.10247ZM19.4337 12.0313L14.9999 22.7325L10.5661 12.0313H19.4337ZM10.9218 10.7188L14.9999 5.46877L19.078 10.7188H10.9218ZM20.8973 12.0313H26.123L16.9778 21.4911L20.8973 12.0313ZM26.1898 10.7188H20.7772L16.3593 5.03127H21.0355L26.1898 10.7188ZM8.96426 5.03127H13.6405L9.22254 10.7188H3.80997L8.96426 5.03127Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.navigation}>
        <span className={styles.navItem}>SHOP</span>
        <span className={styles.navItem}>ABOUT</span>
        <span className={styles.navItem}>CONTACT</span>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <div className={styles.iconContainer}>
            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 20C1.95 20 1.47917 19.8042 1.0875 19.4125C0.695833 19.0208 0.5 18.55 0.5 18V6C0.5 5.45 0.695833 4.97917 1.0875 4.5875C1.47917 4.19583 1.95 4 2.5 4H4.5C4.5 2.9 4.89167 1.95833 5.675 1.175C6.45833 0.391667 7.4 0 8.5 0C9.6 0 10.5417 0.391667 11.325 1.175C12.1083 1.95833 12.5 2.9 12.5 4H14.5C15.05 4 15.5208 4.19583 15.9125 4.5875C16.3042 4.97917 16.5 5.45 16.5 6V18C16.5 18.55 16.3042 19.0208 15.9125 19.4125C15.5208 19.8042 15.05 20 14.5 20H2.5ZM2.5 18H14.5V6H12.5V8C12.5 8.28333 12.4042 8.52083 12.2125 8.7125C12.0208 8.90417 11.7833 9 11.5 9C11.2167 9 10.9792 8.90417 10.7875 8.7125C10.5958 8.52083 10.5 8.28333 10.5 8V6H6.5V8C6.5 8.28333 6.40417 8.52083 6.2125 8.7125C6.02083 8.90417 5.78333 9 5.5 9C5.21667 9 4.97917 8.90417 4.7875 8.7125C4.59583 8.52083 4.5 8.28333 4.5 8V6H2.5V18ZM6.5 4H10.5C10.5 3.45 10.3042 2.97917 9.9125 2.5875C9.52083 2.19583 9.05 2 8.5 2C7.95 2 7.47917 2.19583 7.0875 2.5875C6.69583 2.97917 6.5 3.45 6.5 4Z" fill="white"/>
            </svg>
            {itemCount > 0 && (
              <span 
                className={`${styles.badge} ${isUpdating ? styles.badgeUpdate : ''}`}
                key={itemCount} // Force re-render for animation
              >
                {itemCount}
              </span>
            )}
          </div>
          <span className={styles.actionText}>Basket</span>
        </div>

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