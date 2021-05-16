import styles from "../styles/components/Login.module.css";
import { constants } from "../util/constants";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useEffect, useState } from "react";

export function Login() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();
  const [isLoading, setLoading] = useState(false);

  const submitForm = async (formData) => {
    setLoading(true);
    const res = await fetch(constants.APP_URL + constants.events.LOGIN, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((err) => {
      setLoading(false);
      console.log(err);
      return err;
    });
    setLoading(false);
    const data = await res.json();

    if (res.status === 200) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("email", data.user.email);

      }
      router.push("/myRooms");
    } else {
      addToast(data.error, {
        appearance: "warning",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.emptySpace}></div>
      <div className={styles.loginContainer}>
        <div className={styles.formColumn}>
          <form onSubmit={handleSubmit(submitForm)}>
            <input
              ref={register({
                required: true,
                maxLength: 30,
              })}
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              placeholder={constants.text.fields.login.email}
            />
            {errors.name && (
              // if errors then display alert
              <div className={styles.formError}>
                {errors.name?.type === "required" && (
                  <p>{constants.text.message.errors.login.emailRequired}</p>
                )}
                {errors.name?.type === "maxLength" && (
                  <p>{constants.text.message.errors.login.charLimit30}</p>
                )}
              </div>
            )}
            <br />
            <input
              ref={register({
                required: true,
                maxLength: 20,
              })}
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              placeholder={constants.text.fields.login.password}
            />
            {errors.code && (
              // if errors then display alert
              <div className={styles.formError}>
                {errors.code?.type === "required" && (
                  <p>{constants.text.message.errors.login.passRequired}</p>
                )}
                {errors.code?.type === "maxLength" && (
                  <p>{constants.text.message.errors.login.charLimit20}</p>
                )}
              </div>
            )}
            <br />
            <button type="submit" disabled={isLoading}>
              {constants.text.fields.login.button}
            </button>
          </form>
        </div>
        <div className={styles.dividerArea}>
          <div></div>
        </div>
        <div className={styles.firstColumn}>
          {/* <Icon className={styles.icon}>school</Icon> */}
          <img src="Logo_O.png"></img>
          <h1>FOCUS</h1>
        </div>
      </div>

      <div className={styles.loading}>
        {isLoading && <img src="ball-triangle.svg" />}
      </div>
    </div>
  );
}
