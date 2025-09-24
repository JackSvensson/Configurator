'use client';

import { useState } from "react";
import ProductScene from "@/components/ProductScene/ProductScene";
import Configurator from "@/components/Configurator/Configurator";
import IngredientsButton from "@/components/IngredientsButton/IngredientsButton";

export default function Home() {
  const [config, setConfig] = useState({ flavour: 'orange', shape: 'diamond', color: 'blue' });

  const handleConfigChange = (nextConfig: typeof config) => {
    console.log('Config changed:', nextConfig);
    setConfig(nextConfig);
  };
  return (
    <main>
      <ProductScene config={config} />
      <Configurator config={config} onChange={handleConfigChange} />
      <IngredientsButton currentFlavour={config.flavour} />
    </main>
  );
}