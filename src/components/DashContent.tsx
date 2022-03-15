import styles from "../styles/components/DashContent.module.css";
import { Scatter, Bar } from 'react-chartjs-2';
import { changeRoomStatus } from '../components/RoomCard'
import { constants } from '../util/constants'
import { useState } from "react";
import { EditRoomModal } from "../components/EditRoomModal"
import { useRouter } from "next/router";

export function DashContent({ data }) {
    const router = useRouter();
    const [isModalShowing, setModalShowing] = useState(false)

    const [roomStatus, changeRoomStatus] = useState(data.room.active)
    const dataChart = {
        datasets: [
            {
                label: 'Z-Score',
                data: data.participantsAnswersData,
                backgroundColor: '#ff9000',
                pointRadius: 7,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                suggestedMin: -2,
                suggestedMax: 2,
                grid: {
                    display: true,
                    drawBorder: true,
                },
                ticks: {
                    count: 5
                },
                title: {
                    display: true,
                    text: 'Challenges'
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
                    count: 5
                },
                title: {
                    display: true,
                    text: 'Skills'
                }
            },
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'FLOW',
            },
        }
    };
    const colors = ['#2e384d',
        '#ff9000',
        '#bdd3de',
        '#5342EB',
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
    const labels = data.moments[0].moment.questions.map(item => item.questionId > 1 ? constants.legend[item.questionId] : undefined)
    const datas = data.moments[0].moment.questions.map(item => item.questionId > 1 ? item.avg : undefined)
    const barChartsData = {
        labels: labels,
        datasets: [{
            data: datas,
            backgroundColor: colors
        }

        ]
    }

    const barChartOptions = {
        responsive: true,
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
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Average',
            },
        },
    }
    return isModalShowing ? (<div className={styles.container}>
        <EditRoomModal
            key={new Date().getMilliseconds()}
            onClick={() => {
                setModalShowing(false)
            }}
            show={isModalShowing}
            roomData={data.room}


        />
    </div>) :
        (<div className={styles.container}>

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
                        {roomStatus && <div style={{ color: 'green' }}> Open </div>}
                        {!roomStatus && <div style={{ color: 'red' }}> Close </div>}
                    </button>
                    <div className={styles.roomDataItem}>
                        <h2>{data.participantsAnswersData.length}</h2> <p>Answers</p>
                    </div>
                    <div className={styles.roomDataItem}>
                        <h2>{data.room.quantParticipants}</h2> <p>Participants</p>
                    </div>
                    <div className={styles.roomDataItem}>
                        <h2>{new Date(data.room.createdAt).toLocaleDateString()}</h2>
                        <p>{new Date(data.room.createdAt).toLocaleTimeString()}</p>
                    </div>
                    <div className={styles.roomDataItem}>
                        <h2>{data.room.minInterval}</h2>
                        <p>Minimum time</p>
                    </div>
                    <div className={styles.roomDataItem}>
                        <h2>{data.room.maxInterval}</h2>
                        <p>Maximum time</p>
                    </div>
                    <div>
                        <button className={styles.editButton}
                            onClick={() => setModalShowing(true)}>
                            <img src="edit.png" alt="edit" />
                        </button>
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

        </div >)
}