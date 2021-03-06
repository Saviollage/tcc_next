import styles from "../styles/pages/Dashboard.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { constants } from "../util/constants";
import { Roomcard } from "../components/RoomCard";
import { DashContent } from "../components/DashContent"

export default function Dashboard() {
    const router = useRouter()
    const { roomId } = router.query
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    
    setInterval(() => setUpdate(!update), 300000)
    
    var token = "";
    var userName = "";
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        userName = localStorage.getItem("userName");
    }

    const getData = async () => {
        setLoading(true)
        const res = await fetch(
            constants.APP_URL + constants.events.DASHBOARD + '/' + roomId,
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

        if (res.status === 200) {
            const results = await res.json()
            setData(results)
            console.log(results)
        }
        setLoading(false);

    }

    useEffect(() => {
        if (roomId)
            getData()
    }, [roomId, update])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Head>
                    <title> 🎓 | Focus </title>
                </Head>
                <div>
                    <button className={styles.headButton} onClick={() => router.push('/myRooms')}>
                        <img src="back.png" alt="back" />
                    </button>
                </div>
                <div className={styles.mainName}>
                    {userName.toLocaleUpperCase()}
                    <div className={styles.line}></div>
                </div>
                <div>
                    <button className={styles.headButton} onClick={() => router.push("/")}>
                        <img src="leave.png" alt="leave" />
                    </button>
                </div>
            </div>

            <div>
                {
                    (isLoading || !data) ?
                        (<div className={styles.loading}>
                            <img src="ball-triangle.svg" />
                        </div>
                        )
                        : <DashContent data={data} />
                }
            </div>

            <div>
                
            </div>
        </div>
    );
}
