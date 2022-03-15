import { EnterRoom } from "../components/EnterRoom";
import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { Login } from "../components/Login";

export default function Home() {
  const [isStudent, changeMode] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title> Enter Room | Focus</title>
      </Head>
      <div className={styles.header}>
        <button onClick={() => changeMode(!isStudent)}>
          {isStudent ? "STUDENT" : "TEACHER"}
        </button>

        <div></div>
      </div>
      <div className={styles.content}>
        <ReactCardFlip
          isFlipped={isStudent}
          flipDirection="vertical"
          infinite={true}
        >
          <EnterRoom />
          <Login />
        </ReactCardFlip>
      </div>
    </div>
  );
}
