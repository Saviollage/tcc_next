import { EnterRoom } from "../components/EnterRoom";
import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();
  const data = router.query;

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

  async function waitForNewNotification() {
    // 15 * counter + random(45)
  }

  requestForPermissions();
  return (
    <div className={styles.container}>
      <Head>
        <title> 🎓 | Focus </title>
      </Head>
      {data.participant}
      <br />
      {data.roomId}
    </div>
  );
}
