'use client';

import React from 'react';
import styles from './Configurator.module.css';

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface OptionButtonProps {
  id: string;
  label: string;
  color?: string;
  Icon?: IconComponent;
  selected?: boolean;
  onSelect: (id: string) => void;
}

function OptionButton({ id, label, color = '', Icon, selected = false, onSelect }: OptionButtonProps) {

const style: React.CSSProperties & Record<string, string> = color ? { '--accent': color } : {};

const iconWrapClass = Icon ? styles.iconWrap : `${styles.iconWrap} ${styles.noIcon}`;


  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      className={`${styles.option} ${selected ? styles.selected : ''}`}
      style={style}
      onClick={() => onSelect(id)}
    >
        <span className={iconWrapClass}>
            {Icon ? (
                <Icon className={styles.icon} aria-hidden="true" focusable={false} />
            ) : null}
            <span className={styles.dot} aria-hidden="true" />
        </span>

      <span className={styles.label}>{label}</span>
    </button>
  );
}

export default React.memo(OptionButton);

