import styles from './IngredientsButton.module.css';

export default function IngredientsButton() {
  return (
    <button className={styles.button}>
      <div className={styles.icon}>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          className={styles.iconSvg}
        >
          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="4" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="4" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
      <span className={styles.text}>Ingredients</span>
    </button>
  );
}