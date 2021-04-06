import styles from "../styles/pages/Room.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Question } from "../components/Question";
import { WaitMessage } from "../components/WaitMessage";
import { useState } from "react";
import { setInterval } from "node:timers";

export default function Room() {
  const router = useRouter();
  const data = router.query;

  const [haveData, setData] = useState(false);

  var roomName = "";
  if (typeof window !== "undefined") {
    roomName = localStorage.getItem("roomName");
  }

  function requestForPermissions() {
    if (typeof Notification !== "undefined") {
      if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
    /*
    TODO:
    adicionar pedido de acesso a camera (somente)
    */
  }
  // 15 * counter + random(45)

  function waitNewQuestion() {
    if (!haveData)
      setTimeout(
        () => {
          setData(!haveData);
          if (typeof Notification !== "undefined") {
            new Notification("🎓 Focus", {
              body: "Nova pergunta disponível!\nAbra a aplicação para exibí-la",
              icon: "Logo.png",
            });
          }
        },
        (15 + Math.floor(Math.random() * 45)) * 60 * 1000
        // 5000
      );
  }

  requestForPermissions();
  waitNewQuestion();
  return (
    <div className={styles.container}>
      <Head>
        <title> 🎓 | Focus </title>
      </Head>
      <div className={styles.header}>
        {roomName.toLocaleUpperCase()}
        <div></div>
      </div>
      <div className={styles.content}>
        {haveData && <Question onFinish={() => setData(!haveData)} />}
        {!haveData && <WaitMessage />}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
