import styles from "../styles/pages/Room.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Question } from "../components/Question";
import { WaitMessage } from "../components/WaitMessage";
import { useState } from "react";
import { constants } from "../util/constants";

export default function Room() {
  const router = useRouter();
  const [minInterval, setMinInterval] = useState(15);
  const [maxInterval, setMaxInterval] = useState(45);

  const data = router.query;

  const getData = async () => {
    const res = await fetch(
      constants.APP_URL + "/room/" + localStorage.getItem('roomPin'),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).catch((err) => {
      console.log(err);
      return err;
    });

    if (res.status === 200) {
      const data = await res.json();

      setMinInterval(data.room.minInterval)
      setMaxInterval(data.room.maxInterval - minInterval)
    }
  }

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
  }

  function waitNewQuestion() {
    if (!haveData)
      setTimeout(
        () => {
          getData()
          setData(!haveData);
          if (typeof Notification !== "undefined") {
            new Notification("🎓 Focus", {
              body: "Nova pergunta disponível!\nAbra a aplicação para exibí-la",
              icon: "Logo.png",
            });
          }
        },
        (minInterval + Math.floor(Math.random() * maxInterval)) * 60 * 1000
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
