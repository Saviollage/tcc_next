import styles from "../styles/components/DashContent.module.css";

export function DashContent({data}) {
    return (<div className={styles.container}>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
    </div>)
}