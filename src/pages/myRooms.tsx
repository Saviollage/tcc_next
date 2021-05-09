import styles from "../styles/pages/MyRooms.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { constants } from "../util/constants";
import { Roomcard } from "../components/RoomCard";
import { NewRoomModal } from "../components/newRoomModal";

export default function MyRooms() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [isModalShowing, setModalShowing] = useState(false)

  var token = "";
  var userName = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    userName = localStorage.getItem("userName");
  }

  const handleNewRoom = (event) => {
    setModalShowing(true)

    console.log('Mudando modal', isModalShowing)
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        constants.APP_URL + constants.events.MY_ROOMS,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      ).catch((err) => {
        setLoading(false);
        console.log(err);
        return err;
      });

      if (res.status === 200)
        setData(await res.json())
    }

    getData()

  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title> 🎓 | Focus </title>
      </Head>
      {/* <NewRoomModal
        onClick={() => setModalShowing(false)}
        show={isModalShowing} /> */}

      <div className={styles.header}>
        {userName.toLocaleUpperCase()}
        <div></div>
      </div>
      <div className={styles.content}>
        {isLoading && <img src="ball-triangle.svg" />}


        <div className={styles.roomList}>
          {(!isLoading && data.length > 0) && data.map(item =>
            (<div><Roomcard room={item} key={item._id} /></div>)
          )}

          {(!isLoading && data.length === 0) &&
            (<h2 style={{ color: 'var(--white)', fontFamily: 'Montserrat' }}> Nenhuma sala encontrada </h2>)
          }

        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={handleNewRoom}> Criar nova sala </button>
      </div>
    </div>
  );
}
