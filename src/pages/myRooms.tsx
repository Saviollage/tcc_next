import styles from "../styles/pages/MyRooms.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { constants } from "../util/constants";
import { Roomcard } from "../components/RoomCard";
import { NewRoomModal } from "../components/NewRoomModal"

export default function MyRooms() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [isModalShowing, setModalShowing] = useState(false)

  var token = "";
  var userName = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    userName = localStorage.getItem("userName");
  }

  const handleNewRoom = (event) => {
    setModalShowing(!isModalShowing)
  }

  const getData = async () => {
    setLoading(true)
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

      console.log(err);
      return err;
    });

    if (res.status === 200)
      setData(await res.json())
    setLoading(false);
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title> 🎓 | Focus </title>
      </Head>
      <div className={styles.header}>
        
          {userName.toLocaleUpperCase()}
          <div className={styles.line}></div>
        <button className={styles.headButton} onClick={() => router.push("/")}> SAIR </button>
      </div>
      <div className={styles.content}>
        {isModalShowing ?
          <NewRoomModal
            key={new Date().getMilliseconds()}
            onClick={() => {
              setModalShowing(false)
              getData()
            }}
            show={isModalShowing} /> :
          isLoading ?
            (<img src="ball-triangle.svg" />)
            : data.length > 0 ?
              (<div className={styles.roomList}>

                { data.map(
                  item =>
                  (<div>
                    <Roomcard room={item} update={() => getData()} key={item._id} />
                  </div>)
                )}
              </div>)
              : (<h2 style={{ color: 'var(--white)', fontFamily: 'Montserrat' }}> Nenhuma sala encontrada </h2>)}
      </div>
      <div className={styles.footer}>
        {!isModalShowing && <button onClick={handleNewRoom}> Criar nova sala </button>}
      </div>
    </div>
  );
}
