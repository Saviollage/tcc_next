import styles from "../styles/components/WaitMessage.module.css";
import { useRouter } from "next/router";

export function WaitMessage() {
  var userName = "";
  if (typeof window !== "undefined") {
    userName = localStorage.getItem("participantName");
  }

  return (
    <div className={styles.waitMessageContainer}>
      <img src="ball-triangle.svg" />
      <h2> Hi, {userName}</h2>
      <p> Please wait for the questions </p>
    </div>
  );
}
