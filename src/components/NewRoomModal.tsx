import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/components/NewRoomModal.module.css";
import { constants } from "../util/constants";

export function NewRoomModal({ onClick, show }) {
    const router = useRouter();
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setLoading] = useState(false);

    const submitForm = async (formData) => {
        const dataToRequest = { ...formData, createdBy: localStorage.getItem('email') }
        setLoading(true);
        const res = await fetch(
            constants.APP_URL + constants.events.NEW_ROOM,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(dataToRequest),
            }
        ).catch((err) => {
            setLoading(false);
            console.log(err);
            return err;
        });

        if (res.status === 200) {
            const data = await res.json();
            setLoading(false);
            onClick()
        } else {
            console.error('Deu ruim')
        }
    };
    if (show)
        return (
            <div className={styles.fullContainer}>
                <div className={styles.emptySpace}></div>
                <div className={styles.newRoomContainer}>
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
                                placeholder={constants.text.fields.newRoom.name}
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
                                id="description"
                                name="description"
                                type="text"
                                autoComplete="description"
                                placeholder={constants.text.fields.newRoom.description}
                            />
                            {errors.code && (
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
                            <button type="submit" disabled={isLoading}>
                                {constants.text.fields.newRoom.button}
                            </button>
                        </form>
                    </div>
                </div>
                <div className={styles.loading}>
                    {isLoading && <img src="ball-triangle.svg" />}
                </div>
            </div>
        )
    else
        return null
}