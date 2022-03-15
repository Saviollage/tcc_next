import router from "next/router";
import styles from "../styles/components/RoomCard.module.css";
import { constants } from "../util/constants";

export const changeRoomStatus = async ({ storeId, isActive, update }) => {
    const res = await fetch(
        constants.APP_URL + '/room' +
        (isActive ?
            constants.events.DESACTIVATE : constants.events.ACTIVATE)
        + `/${storeId}`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        }
    )
        .catch((err) => {
            console.log(err);
            return err;
        });
    update()
}

export function Roomcard({ room, update, onClick }) {
    return (
        <div className={styles.container}>
            <button onClick={onClick}>
                <h2> {room.name} </h2>
                <div className={styles.date}> {new Date(room.createdAt).toLocaleDateString()}</div>
                <br />
                <div> <p> {room.pin}</p> </div>
            </button>
            <div className={styles.line}></div>
            <div className={styles.row}>
                <button className={styles.activeText} onClick={() => changeRoomStatus({
                    isActive: room.active,
                    storeId: room._id,
                    update
                })}>
                    {room.active && <div style={{ color: 'green' }}> Open </div>}
                    {!room.active && <div style={{ color: 'red' }}> Close </div>}
                </button>
                <div className={styles.participants}>
                    {room.quantParticipants} <img src="group.svg" />
                </div>
            </div>
        </div>
    );
}