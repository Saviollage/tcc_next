import styles from "../styles/components/EnterRoom.module.css";
import { constants } from "../util/constants";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

export function EnterRoom() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  const submitForm = async (formData) => {
    const res = await fetch(
      constants.APP_URL + constants.events.PARTICIPANTS_NEW,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    ).catch((err) => {
      console.log(err);
      return err;
    });

    const data = await res.json();
    if (res.status === 200) {
      router.push({
        pathname: "/room",
        query: {
          roomId: data.room._id,
          participant: data.participant._id,
        },
      });
    } else {
      addToast(data.error, { appearance: "warning" });
    }
  };

  return (
    <div className={styles.enterRoomContainer}>
      <div className={styles.firstColumn}>
        {/* <Icon className={styles.icon}>school</Icon> */}
        <img src="Logo.png"></img>
        <h1>FOCUS</h1>
      </div>
      <div className={styles.dividerArea}>
        <div></div>
      </div>
      <div className={styles.formColumn}>
        <form onSubmit={handleSubmit(submitForm)}>
          <input
            ref={register({
              required: true,
              maxLength: 20,
            })}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Name"
          />
          {errors.name && (
            // if errors then display alert
            <div className={styles.formError}>
              {errors.name?.type === "required" && <p>Name is required</p>}
              {errors.name?.type === "maxLength" && (
                <p>Max length of name is 20 characters!</p>
              )}
            </div>
          )}
          <br />
          <input
            ref={register({
              required: true,
              maxLength: 20,
            })}
            id="code"
            name="code"
            type="text"
            autoComplete="code"
            placeholder="Student ID"
          />
          {errors.code && (
            // if errors then display alert
            <div className={styles.formError}>
              {errors.code?.type === "required" && (
                <p>Student ID is required</p>
              )}
              {errors.code?.type === "maxLength" && (
                <p>Max length of Student ID is 20 characters!</p>
              )}
            </div>
          )}
          <br />
          <input
            ref={register({
              required: true,
              maxLength: 7,
            })}
            id="roomId"
            name="roomId"
            type="text"
            autoComplete="roomId"
            placeholder="Room ID"
          />
          {errors.roomId && (
            // if errors then display alert
            <div className={styles.formError}>
              {errors.roomId?.type === "required" && <p>Room ID is required</p>}
              {errors.roomId?.type === "maxLength" && (
                <p>Max length of room ID is 7 characters!</p>
              )}
            </div>
          )}
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
