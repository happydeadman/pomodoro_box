import React, { useEffect, useState } from "react";
import { getPadTime } from "../../Hooks/js/getPadTime";
import { useActions } from "../../Hooks/useActions";
import { useTypedSelector } from "../../Hooks/useTypedSelector";
import { EIcons, Icons } from "../../Icons/Icons";
import styles from "./TimeDisplay.module.scss";

interface ITimeDisplayProps {
  isRunning?: boolean;
  isWork?: boolean;
}

export function TimeDisplay(props: ITimeDisplayProps) {
  const { isRunning, isWork } = props;
  const { spendTime } = useActions();
  const { tasks } = useTypedSelector((state) => state);
  const [count, setCount] = useState(5);

  const currentTask = tasks?.[0];
  const minutes = getPadTime(Math.floor(count / 60));
  const seconds = getPadTime(Math.floor(count - Number(minutes) * 60));

  const handleCount = () => {
    isRunning && setCount((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    if (count === 0) {
      spendTime({
        id: currentTask.id,
        pomodoroId: currentTask.pomodoro[0].id,
        timeSpend: currentTask.pomodoro[0].time,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleCount();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  // useEffect(() => {
  //   setTimeLeft(5);
  // }, [currentTask, time]);

  return (
    <div className={styles.time}>
      <span className={styles.timeNumber}>
        {minutes}:{seconds}
      </span>

      <button>
        <Icons name={EIcons.add} />
      </button>
    </div>
  );
}
