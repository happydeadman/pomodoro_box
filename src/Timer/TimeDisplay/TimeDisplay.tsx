import React, { useEffect, useState } from "react";
import { getPadTime } from "../../Hooks/js/getPadTime";
import { useActions } from "../../Hooks/useActions";
import { EIcons, Icons } from "../../Icons/Icons";
import styles from "./TimeDisplay.module.scss";

interface ITimeDisplayProps {
  time: number;
  isRunning?: boolean;
  isWork?: boolean;
  currentTask: any;
  pomodoroId: string;
}

export function TimeDisplay(props: ITimeDisplayProps) {
  const { time, isRunning, isWork, currentTask, pomodoroId } = props;
  const { spendTime } = useActions();

  const [count, setCount] = useState(5);

  const minutes = getPadTime(Math.floor(count / 60));
  const seconds = getPadTime(Math.floor(count - Number(minutes) * 60));

  const handleCount = () => {
    isRunning && setCount((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    if (count === 0) {
      spendTime({
        id: currentTask.id,
        pomodoroId: pomodoroId,
        timeSpend: count,
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
