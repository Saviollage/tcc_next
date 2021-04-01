import styles from "../styles/components/Question.module.css";
import Icon from "@material-ui/core/Icon";
import { constants } from "../util/constants";
import { useRouter } from "next/router";

export function Question() {
  const router = useRouter();

  async function submitForm(event) {
    event.preventDefault();
  }


  async function waitForNewNotification() {
    // 15 * counter + random(45)
  }

  return (
    <div className={styles.enterRoomContainer}>
     
      
    </div>
  );
}
