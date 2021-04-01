import styles from "../styles/components/Question.module.css";
import Icon from "@material-ui/core/Icon";
import { constants } from "../util/constants";
import { useRouter } from "next/router";

export function Question() {
  const router = useRouter();

  async function submitForm(event) {
    event.preventDefault();
  }


  return (
    <div className={styles.enterRoomContainer}>
      <div>
        <h1>Focus</h1>
      </div>
      
    </div>
  );
}
