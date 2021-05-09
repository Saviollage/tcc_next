import styles from "../styles/components/RoomCard.module.css";

export function Roomcard({ room }) {
    return (
        <div className={styles.container}>
            <h2> {room.name} </h2>
            <div> <p> {room.pin} </p> </div>
            <div className={styles.line}></div>
            <div className={styles.row}>
                <div className={styles.activeText}>
                    {room.active && <div style={{ color: 'green' }}> Ativa </div>}
                    {!room.active && <div style={{ color: 'red' }}> Inativa </div>}
                </div>
                <div className={styles.participants}>
                    {room.quantParticipants} <img src="group.svg" />
                </div>
            </div>
        </div>
    );
}