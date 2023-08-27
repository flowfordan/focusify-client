import Image from "next/image";
import styles from "./page.module.css";
import { PageHome } from "pages_units";

export default function Home() {
  return (
    <main className={styles.main}>
      <PageHome />
    </main>
  );
}
