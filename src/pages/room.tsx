import styles from "../styles/pages/Room.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Question } from "../components/Question";
import { WaitMessage } from "../components/WaitMessage";

export default function Room() {
  const router = useRouter();
  const data = router.query;
  const haveData = false;
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

  requestForPermissions();
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
        {haveData && <Question />}
        {!haveData && <WaitMessage />}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
