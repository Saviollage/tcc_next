import styles from "../styles/components/EnterRoom.module.css";
import { constants } from "../util/constants";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useEffect, useState } from "react";

export function EnterRoom() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();
  const [isLoading, setLoading] = useState(false);

  const submitForm = async (formData) => {
    setLoading(true);
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
      setLoading(false);
      console.log(err);
      return err;
    });
    setLoading(false);
    const data = await res.json();

    if (res.status === 200) {
      if (typeof window !== "undefined") {
        localStorage.setItem("roomName", data.room.name);
        localStorage.setItem("roomId", data.room._id);
        localStorage.setItem("participantId", data.participant._id);
        localStorage.setItem("participantName", data.participant.name);
        localStorage.setItem("roomPin", data.room.pin);
      }
      router.push("/room");
    } else {
      addToast(
        data.error == "Room not found"
          ? constants.text.message.errors.enterRoom.notfound
          : constants.text.message.errors.enterRoom.closed,
        {
          appearance: "warning",
          autoDismiss: true,
        }
      );
    }
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.emptySpace}></div>
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
              placeholder={constants.text.fields.enterRoom.name}
            />
            {errors.name && (
              // if errors then display alert
              <div className={styles.formError}>
                {errors.name?.type === "required" && (
                  <p>{constants.text.message.errors.enterRoom.nameRequired}</p>
                )}
                {errors.name?.type === "maxLength" && (
                  <p>{constants.text.message.errors.enterRoom.charLimit20}</p>
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
              placeholder={constants.text.fields.enterRoom.studentId}
            />
            {errors.code && (
              // if errors then display alert
              <div className={styles.formError}>
                {errors.code?.type === "required" && (
                  <p>
                    {constants.text.message.errors.enterRoom.studentIdRequired}
                  </p>
                )}
                {errors.code?.type === "maxLength" && (
                  <p>{constants.text.message.errors.enterRoom.charLimit20}</p>
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
              name="roomPin"
              type="text"
              autoComplete="roomId"
              placeholder={constants.text.fields.enterRoom.roomId}
            />
            {errors.roomPin && (
              // if errors then display alert
              <div className={styles.formError}>
                {errors.roomPin?.type === "required" && (
                  <p>
                    {constants.text.message.errors.enterRoom.roomIdRequired}
                  </p>
                )}
                {errors.roomPin?.type === "maxLength" && (
                  <p>{constants.text.message.errors.enterRoom.charLimit7}</p>
                )}
              </div>
            )}
            <br />
            <button type="submit" disabled={isLoading}>
              {constants.text.fields.enterRoom.button}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.loading}>
        {isLoading && <img src="ball-triangle.svg" />}
      </div>
    </div>
  );
}
