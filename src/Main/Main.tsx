import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { useActions } from "../Hooks/useActions";
import { useTypedSelector } from "../Hooks/useTypedSelector";
import { TasksList } from "../TasksList";
import { Timer } from "../Timer";
import { generateRandomString } from "../utils/react/generateRandomIndex";
import styles from "./Main.module.scss";

export type ITasks = {
  name: string;
  id: string;
  // time: number;
  date: string;
  pomodoro: TPomodoro[];
};

type TPomodoro = {
  id: string;
  timeSpend: number;
  time: number;
};

export function Main() {
  const [value, setValue] = useState("");
  const { addTask } = useActions();
  const { tasks } = useTypedSelector((state) => state);
  const [isValid, setIsValid] = useState(false);
  const [inputError, setInputError] = useState(
    "Название задачи не может быть пустым!"
  );
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value.length === 0) {
      setInputError("Название задачи не может быть пустым!");
    } else setInputError("");
  };
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "taskName") setIsDirty(true);
  };

  const clickHandler = () => {
    const date = new Date();
    addTask({
      id: generateRandomString(),
      name: value.trim(),
      date: date.toUTCString(),
      pomodoro: [{ time: 25, timeSpend: 0, id: generateRandomString() }],
    });
    setValue("");
    setInputError("Название дела не может быть пустым!");
    setIsDirty(false);
  };

  useEffect(() => {
    if (inputError) {
      setIsValid(false);
    } else setIsValid(true);
  }, [inputError]);

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <h2 className={styles.title}>Ура! Теперь можно работать</h2>
        <ul className={styles.descriptionList}>
          <li>Выберите категорию и напишите название текущей задачи</li>
          <li>Запустите таймер («помидор»)</li>
          <li>Работайте пока «помидор» не прозвонит</li>
          <li>Сделайте короткий перерыв (3-5 минут)</li>
          <li>
            Продолжайте работать «помидор» за «помидором», пока задача не будут
            выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30
            минут).
          </li>
        </ul>

        <div className={styles.inputContainer}>
          <div className={styles.control}>
            {inputError && isDirty && (
              <div className={styles.error}>{inputError}</div>
            )}
            <input
              onBlur={onBlurHandler}
              className={styles.input}
              type="text"
              name="taskName"
              placeholder="Название задачи"
              value={value}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Button
              disabled={!isValid}
              onClick={clickHandler}
              text="Добавить"
              use={"primary"}
              size="big"
            />
          </div>
          {tasks && <TasksList tasks={tasks} />}
        </div>
      </div>
      <div className={styles.right}>
        <Timer />
      </div>
    </main>
  );
}
