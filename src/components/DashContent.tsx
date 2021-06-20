import styles from "../styles/components/DashContent.module.css";
import { Scatter } from 'react-chartjs-2';
import { changeRoomStatus } from '../components/RoomCard'
import { useState } from "react";

export function DashContent({ data }) {
    const [roomStatus, changeRoomStatus] = useState(data.room.active)
    const dataChart = {
        datasets: [
            {
                label: 'Z-Score Alunos',
                data: data.participantsAnswersData,
                backgroundColor: '#ff9000',
            },
        ],
    };

    const options = {
        scales: {
            
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (<div className={styles.container}>

        <div className={styles.card}>

            <h2>
                {data.room.name}
            </h2>
            <p>
                {data.room.pin}
            </p>
            <div className={styles.line}></div>
            <div className={styles.roomData}>
                <button className={styles.activeText} onClick={() => changeRoomStatus({
                    isActive: roomStatus,
                    storeId: data.room._id,
                    update: () => changeRoomStatus(!status)
                })}>
                    {roomStatus && <div style={{ color: 'green' }}> Ativa </div>}
                    {!roomStatus && <div style={{ color: 'red' }}> Inativa </div>}
                </button>
                <div className={styles.roomDataItem}>
                    <h2>{data.room.quantAnswers}</h2> <p>Respostas</p>
                </div>
                <div className={styles.roomDataItem}>
                    <h2>{data.room.quantParticipants}</h2> <p>Participantes</p>
                </div>
                <div className={styles.roomDataItem}>
                    <h2>{new Date(data.room.createdAt).toLocaleDateString()}</h2>
                    <p>{new Date(data.room.createdAt).toLocaleTimeString()}</p>
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.chart}>
                <Scatter data={dataChart} options={options} type='Scatter' />
            </div>
            <div>

            </div>
        </div>

    </div>)
}