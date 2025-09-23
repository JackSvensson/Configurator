'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './IngredientsModal.module.css';

interface IngredientsModalProps {
  onClose: () => void;
  buttonPosition?: { x: number; y: number };
}

export default function IngredientsModal({ onClose, buttonPosition }: IngredientsModalProps) {
  const [lineCoords, setLineCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      const buttonX = buttonPosition?.x || 120;
      const buttonY = buttonPosition?.y || (window.innerHeight - 60);
      
      const popupX = tooltipRect.left;
      const popupY = tooltipRect.bottom;
      
      setLineCoords({
        x1: buttonX,
        y1: buttonY,
        x2: popupX,
        y2: popupY
      });
    }
  }, [buttonPosition]);

  return (
    <>
      {/* Invisible overlay to detect clicks outside */}
      <div className={styles.overlay} onClick={onClose} />
      
      {/* SVG for diagonal line */}
      <svg className={styles.lineConnector}>
        <line 
          x1={lineCoords.x1} 
          y1={lineCoords.y1} 
          x2={lineCoords.x2} 
          y2={lineCoords.y2}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1"
        />
      </svg>
      
      {/* Tooltip popup */}
      <div className={styles.tooltip} ref={tooltipRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ingredients</h2>
          <button className={styles.closeButton} onClick={onClose} type="button">
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
            Sugar, Glucose syrup, Citric acid, Natural and artificial orange flavor, Color (E110)
          </p>
        </div>
      </div>
    </>
  );
}