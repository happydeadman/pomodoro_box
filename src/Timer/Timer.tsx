import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import styles from "./Timer.module.scss";
import { useTypedSelector } from "../Hooks/useTypedSelector";
import classNames from "classnames";
import { TimeDisplay } from "./TimeDisplay";

export function Timer() {
  const { tasks } = useTypedSelector((state) => state);

  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const currentTask = tasks?.[0];

  const handleClick = () => {
    setIsPaused(false);
    setIsWork(false);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const classesTable = classNames(
    styles[`timerTop`],
    {
      [styles[`isWorking`]]: isWork && isRunning,
    },
    {
      [styles[`isWorking`]]: isWork && isPaused,
    },
    {
      [styles[`break`]]: isBreak && isPaused,
    },
    {
      [styles[`break`]]: isBreak && isRunning,
    }
  );

  return (
    <div className={styles.timerContainer}>
      <div className={classesTable}>
        <span>{tasks.length === 0 ? "Задач нет" : currentTask.name}</span>
        <span>Помидор 1</span>
      </div>
      <div className={styles.timerBottom}>
        {tasks.length === 0 ? (
          <div className={styles.emptyTasks}>Активных задач нет</div>
        ) : (
          <div>
            <TimeDisplay
              time={currentTask?.pomodoro[0].time}
              isRunning={isRunning}
              currentTask={currentTask}
              pomodoroId={currentTask?.pomodoro[0].id}
            />
            <div className={styles.taskNameContainer}>
              <span className={styles.taskNumber}>Задача 1 - </span>
              <span className={styles.taskName}>{currentTask.name}</span>
            </div>
            {isRunning && !isPaused && isWork && (
              <div className={styles.control}>
                <Button
                  onClick={() => {
                    handlePause();
                  }}
                  text={"Пауза"}
                  use="primary"
                />
                <Button text={"Стоп"} use="danger" />
              </div>
            )}
            {isRunning && !isPaused && isBreak && (
              <div className={styles.control}>
                <Button
                  onClick={() => {
                    setIsPaused(true);
                  }}
                  text={"Пауза"}
                  use="primary"
                />
                <Button text={"Пропустить"} use="danger" />
              </div>
            )}
            {isPaused && isBreak && (
              <div className={styles.control}>
                <Button
                  onClick={() => {
                    setIsPaused(false);
                  }}
                  text={"Продолжить"}
                  use="primary"
                />
                <Button text={"Пропустить"} use="danger" />
              </div>
            )}
            {!isRunning && !isPaused && (
              <div className={styles.control}>
                <Button
                  onClick={() => {
                    setIsWork(true);
                    handleStart();
                  }}
                  text={"Старт"}
                  use="primary"
                />
                <Button disabled={true} text={"Стоп"} use="hollow" />
              </div>
            )}
            {isPaused && isWork && (
              <div className={styles.control}>
                <Button
                  onClick={() => {
                    setIsPaused(false);
                  }}
                  text={"Продолжить"}
                  use="primary"
                />
                <Button
                  onClick={() => {
                    handleClick();
                  }}
                  text={"Сделано"}
                  use="danger"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
