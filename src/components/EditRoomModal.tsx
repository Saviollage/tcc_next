import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/components/NewRoomModal.module.css";
import { constants } from "../util/constants";

export function EditRoomModal({ onClick, show, roomData }) {
    const router = useRouter();
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setLoading] = useState(false);

    const submitForm = async (formData) => {
        const { name, minInterval, maxInterval } = formData
        const dataToRequest = {
            name: name || roomData.name,
            minInterval: Number(minInterval) || roomData.minInterval,
            maxInterval: Number(maxInterval) || roomData.maxInterval,
            roomId: localStorage.getItem('roomId')
        }
        console.log(JSON.stringify(dataToRequest))
        setLoading(true);
        const res = await fetch(
            constants.APP_URL + constants.events.EDIT_ROOM,
            {
                method: "PUT",
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
            // onClick()
            router.reload()
        } else {
            console.error('Deu ruim')
        }
    };
    if (show)
        return (
            <div className={styles.fullContainer}>
                <div className={styles.emptySpace}></div>
                <div className={styles.newRoomContainer}>
                    <h3> Editar sala </h3>
                    <br />
                    <div className={styles.formColumn}>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <input
                                ref={register({
                                    maxLength: 20,
                                })}
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder={roomData.name}
                            />
                            {errors.name && (
                                // if errors then display alert
                                <div className={styles.formError}>
                                    {errors.name?.type === "required" && (
                                        <p>{constants.text.message.errors.editRoom.nameRequired}</p>
                                    )}
                                    {errors.name?.type === "maxLength" && (
                                        <p>{constants.text.message.errors.editRoom.charLimit20}</p>
                                    )}
                                </div>
                            )}
                            <br />
                            Intervalo mínimo
                            <input
                                ref={register({
                                    valueAsNumber: true
                                })}
                                id="minInterval"
                                name="minInterval"
                                type="text"
                                autoComplete="minInterval"
                                placeholder={roomData.minInterval}
                            />
                            {errors.code && (
                                <div className={styles.formError}>

                                    {errors.code?.type === "valueAsNumber" && (
                                        <p>{'Apenas números'}</p>
                                    )}
                                </div>
                            )}
                            <br />
                            Intervalo máximo
                            <input
                                ref={register({
                                    valueAsNumber: true
                                })}
                                id="maxInterval"
                                name="maxInterval"
                                type="text"
                                autoComplete="maxInterval"
                                placeholder={roomData.maxInterval}
                            />
                            {errors.code && (
                                <div className={styles.formError}>

                                    {errors.code?.type === "valueAsNumber" && (
                                        <p>{'Apenas números'}</p>
                                    )}
                                </div>
                            )}
                            <br />
                            <button type="submit" disabled={isLoading}>
                                {'Confirmar edição'}
                            </button>
                        </form>
                    </div>
                    <button className={styles.returnButton} onClick={() => onClick()}>
                        Voltar
                    </button>
                </div>
                <div className={styles.loading}>
                    {isLoading && <img src="ball-triangle.svg" />}
                </div>
            </div>
        )
    else
        return null
}