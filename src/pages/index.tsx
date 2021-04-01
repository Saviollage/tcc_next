import { EnterRoom } from "../components/EnterRoom";
import styles from "../styles/pages/Home.module.css";
import Head from "next/head";

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title> Enter Room | Focus</title>
      </Head>
      <EnterRoom />
    </div>
  );
}
