'use client';
import styles from './IngredientsModal.module.css';

interface IngredientsModalProps {
  onClose: () => void;
}

export default function IngredientsModal({ onClose }: IngredientsModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ingredients</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <p className={styles.description}>
            Sugar, Glucose syrup, Citric acid, 
            Natural and artificial strawberry flavor, 
            Color (E120)
          </p>
        </div>
      </div>
    </div>
  );
}