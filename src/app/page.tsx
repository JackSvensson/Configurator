'use client';

import { useState } from "react";
import ProductScene from "@/components/ProductScene/ProductScene";
import Configurator from "@/components/Configurator/Configurator";


export default function Home() {
  const [config, setConfig] = useState({ flavour: 'orange', shape: 'diamond', color: 'blue' });
  return (
    <main>
      <ProductScene />
      <Configurator config={config} onChange={setConfig} />
    </main>
  );
}
