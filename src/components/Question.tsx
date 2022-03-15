import styles from "../styles/components/Question.module.css";
import { constants } from "../util/constants";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import Icon from "@material-ui/core/Icon";
import { CustomSlider } from "./Slider";

export function Question({ onFinish }) {
  const router = useRouter();
  const [answerList, setAnswerlist] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const marks = [
    {
      value: 1,
      label: "Not at all",
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },

    {
      value: 5,
    },

    {
      value: 6,
    },

    {
      value: 7,
    },

    {
      value: 8,
    },
    {
      value: 9,
      label: "Very",
    },
  ];
  let currentValue = 0;

  function valuetext(value: number) {
    currentValue = value;
    return `${value}`;
  }

  async function handleQuestion() {
    if (index === constants.questionList.length - 1) {
      const answer = {
        roomId: "",
        participant: "",
        answers: [
          ...answerList,
          {
            questionId: index,
            answer: currentValue,
          },
        ],
      };
      if (typeof window !== "undefined") {
        answer.roomId = localStorage.getItem("roomId");
        answer.participant = localStorage.getItem("participantId");
      }
      setLoading(true);
      const res = await fetch(
        constants.APP_URL + constants.events.SEND_ANSWER,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(answer),
        }
      ).catch((err) => {
        setLoading(false);
        console.log(err);
        return err;
      });

      setLoading(false);
      if (res.status === 200) {
        onFinish();
        setIndex(0);
        setAnswerlist([]);
      }
    } else {
      setAnswerlist([
        ...answerList,
        {
          questionId: index,
          answer: currentValue,
        },
      ]);
      setIndex(index + 1);
    }
  }

  return (
    <div className={styles.questionContainer}>
      <div className={styles.title}>
        <Icon fontSize="large">school</Icon>
        <div></div>
        {constants.questionList[index]}
      </div>
      <CustomSlider
        defaultValue={5}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={9}
        marks={marks}
      />
      {!isLoading && (
        <button
          className={styles.button}
          onClick={handleQuestion}
          disabled={isLoading}
        >
          Enviar
        </button>
      )}
      {isLoading && <img src="grid.svg" height="60" />}
    </div>
  );
}
