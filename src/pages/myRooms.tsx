import styles from "../styles/pages/MyRooms.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MyRooms() {
  const router = useRouter();
  const [haveData, setData] = useState(false);
  var token = "";
  var userName = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    userName = localStorage.getItem("userName");
  }
  return (
    <div className={styles.container}>
      <Head>
        <title> 🎓 | Focus </title>
      </Head>
      <div className={styles.header}>
        {userName.toLocaleUpperCase()}
        <div></div>
      </div>
      <div className={styles.content}></div>
      <div className={styles.footer}></div>
    </div>
  );
}
