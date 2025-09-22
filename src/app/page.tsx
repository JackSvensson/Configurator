import Image from "next/image";
import styles from "./page.module.css";
import ProductScene from "@/components/ProductScene/ProductScene";
import IngredientsButton from "@/components/IngredientsButton/IngredientsButton";

export default function Home() {
  return (
    <main>
      <ProductScene />
      <IngredientsButton />
    </main>
  );
}