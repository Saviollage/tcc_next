import styles from "../styles/components/DashContent.module.css";
import { Scatter, Bar } from 'react-chartjs-2';
import { changeRoomStatus } from '../components/RoomCard'
import { constants } from '../util/constants'
import { useState } from "react";

export function DashContent({ data }) {
    const [roomStatus, changeRoomStatus] = useState(data.room.active)
    const dataChart = {
        datasets: [
            {
                label: 'Z-Score Alunos',
                data: data.participantsAnswersData,
                backgroundColor: '#ff9000',
                pointRadius: 7,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                suggestedMin: -2,
                suggestedMax: 2,
                grid: {
                    display: true,
                    drawBorder: true,
                },
                ticks: {
                    count: 3
                },
                title: {
                    display: true,
                    text: 'Desafio'
                }
            },
            x: {
                suggestedMin: -2,
                suggestedMax: 2,
                grid: {
                    display: true,
                    drawBorder: true,
                },
                ticks: {
                    count: 3
                },
                title: {
                    display: true,
                    text: 'Habilidade'
                }
            },
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Distribuição FLOW',
            },
        }
    };
    const colors = ['#2e384d',
        '#ff9000',
        '#bdd3de',
        '#5342EB',
        '#6D31D4',
        '#B339F6']


    // const barChartsData = {
    //     labels: [''],
    //     datasets: [...data.moments[0].moment.questions.map(item => {
    //         return {
    //             label: constants.legend[item.questionId],
    //             data: [item.avg],
    //             backgroundColor: colors[item.questionId]
    //         }
    //     })]
    // }
    const labels = data.moments[0].moment.questions.map(item => constants.legend[item.questionId])
    const datas = data.moments[0].moment.questions.map(item => item.avg)
    const barChartsData = {
        labels: labels,
        datasets: [{
            data: datas,
            backgroundColor: colors
        }

        ]
    }

    const barChartOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                suggestedMin: 0,
                suggestedMax: 9,
                grid: {
                    display: false
                }
            },
        },

        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Médias da turma',
            },
        },
    }



    console.log(barChartsData)
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
                    <h2>{data.participantsAnswersData.length}</h2> <p>Respostas</p>
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
            <div className={styles.chartsAndData}>
                <div className={styles.chart}>
                    <Scatter data={dataChart} options={options} type='Scatter' />
                </div>
                <div className={styles.roomDetails}>
                    <Bar data={barChartsData} options={barChartOptions} type='horizontalBar' />
                </div>
            </div>
            <div>

            </div>
        </div>

    </div>)
}