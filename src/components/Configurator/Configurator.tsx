'use client';

import React, { useCallback } from 'react';
import OptionButton from './OptionButton';
import BlueberryIcon from './icons/Blueberry';
import CherryIcon from './icons/Cherry';
import OrangeIcon from './icons/Orange';
import DiamondIcon from './icons/Diamond';
import RoundIcon from './icons/Round';
import styles from './Configurator.module.css';


export interface Config {
flavour: string;
shape: string;
color: string;
}

interface ConfiguratorProps {
config: Config;
onChange: (next: Config) => void;
}

function calculateTotalCost(config: Config): number {
let cost = 5; // Base cost

// Flavour cost
switch (config.flavour) {
    case 'orange':
    cost += 1;
    break;
    case 'cherry':
    cost += 1.5;
    break;
    case 'blueberry':
    cost += 2;
    break;
    default:
    break;
}

// Shape cost
if (config.shape === 'diamond') {
    cost += 2;
}

// Color cost
if (config.color === 'purple' || config.color === 'pink') {
    cost += 1;
}

return cost;
}   

export default function Configurator({ config, onChange }: ConfiguratorProps) {
const flavours = [
{ id: 'orange', label: 'Orange', color: '#FBC670', Icon: OrangeIcon },
{ id: 'cherry', label: 'Cherry', color: '#FB7070', Icon: CherryIcon },
{ id: 'blueberry', label: 'Blueberry', color: '#9CBDE6', Icon: BlueberryIcon },
];

const shapes = [
{ id: 'diamond', label: 'Diamond', Icon: DiamondIcon },
{ id: 'round', label: 'Round', Icon: RoundIcon },
];

const colors = [
{ id: 'blue', label: 'blue', color: '#1DD0DA' },
{ id: 'purple', label: 'purple', color: '#C236DF' },
{ id: 'pink', label: 'pink', color: '#F889E0' },
];

const handleSelect = useCallback(
(id: string) => onChange({ ...config, flavour: id }),
[config, onChange]
);


return (
    <div className={styles.configuratorContainer}>
        <div className={styles.configurator}>
        <div role="radiogroup" aria-label="Flavours" className={styles.group}>
            <h2 className={styles.groupTitle}>Flavours</h2>
            <div className={styles.options}>
        {flavours.map((f) => (
        <OptionButton
        key={f.id}
        id={f.id}
        label={f.label}
        color={f.color}
        Icon={f.Icon}
        selected={config.flavour === f.id}
        onSelect={handleSelect}
        />
        ))}
            </div>
        </div>

        <div role="radiogroup" aria-label="Shapes" className={styles.group}>
            <h2 className={styles.groupTitle}>Shape</h2>
            <div className={styles.options}>
        {shapes.map((s) => (
        <OptionButton
        key={s.id}
        id={s.id}
        label={s.label}
        Icon={s.Icon}
        selected={config.shape === s.id}
        onSelect={(id) => onChange({ ...config, shape: id })}
        />
        ))}
            </div>
        </div>


        <div role="radiogroup" aria-label="Colors" className={styles.group}>
            <h2 className={styles.groupTitle}>Ring color</h2>
            <div className={styles.options}>
        {colors.map((c) => (
        <OptionButton
        key={c.id}
        id={c.id}
        label={c.label}
        color={c.color}
        selected={config.color === c.id}
        onSelect={(id) => onChange({ ...config, color: id })}
        />
        ))}
            </div>
        </div>

        </div>
        <div className={styles.addToCart}>
            <strong className={styles.totalCost}>{calculateTotalCost(config) + " kr"}</strong>
            <button className={styles.addToCartButton} onClick={() => console.log(config)}>Add to Cart</button>
        </div>
</div>
);
}