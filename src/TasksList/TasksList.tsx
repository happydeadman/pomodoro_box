import React, { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { useActions } from "../Hooks/useActions";
import { useOutside } from "../Hooks/useOutside";
import { Icons, EIcons } from "../Icons/Icons";
import { ITasks } from "../Main";
import { Modal } from "../Modal";
import styles from "./TasksList.module.scss";

interface ITasksListProps {
  tasks: ITasks[];
}
interface ITime {
  minutes: number;
  hours?: number;
}

export function TasksList({ tasks }: ITasksListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [taskId, setTaskId] = useState("");
  const [totalTime, setTotalTime] = useState<ITime>({ minutes: 0, hours: 0 });
  const { increasePomodoroTask, decreasePomodoroTask, editTask } = useActions();
  const { ref, isShow, setIsShow } = useOutside(false);

  const refInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    refInput.current && refInput.current.focus();
  }, [isShow]);

  useEffect(() => {
    function getTimeFromMins() {
      let mins: number = 0;
      if (tasks) {
        tasks.forEach((task) => {
          mins += task.time * task.pomodoro;
        });

        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        setTotalTime({ minutes: minutes, hours: hours });
      }
      if (!tasks) setTotalTime({ minutes: mins });
    }
    getTimeFromMins();
  }, [tasks]);

  return (
    <div>
      <ul className={styles.list}>
        {tasks?.map((task, index) => (
          <li className={styles.item} key={task.id}>
            <span>
              <span className={styles.number}>{index + 1}</span>
              {task.name}
            </span>
            <Dropdown
              button={
                <button className={styles.menu}>
                  <Icons name={EIcons.menu} />
                </button>
              }
            >
              <ul className={styles.menuList}>
                <li className={styles.menuItem}>
                  <button
                    onClick={() => increasePomodoroTask({ id: task.id })}
                    className={styles.menuBtn}
                  >
                    <Icons name={EIcons.plus} /> Увеличить
                  </button>
                </li>
                <li className={styles.menuItem}>
                  <button
                    disabled={task.pomodoro <= 1}
                    onClick={() => decreasePomodoroTask({ id: task.id })}
                    className={styles.menuBtn}
                  >
                    <Icons name={EIcons.minus} />
                    Уменьшить
                  </button>
                </li>
                <li className={styles.menuItem}>
                  <button
                    onClick={() => {
                      setValue(task.name);
                      setTaskId(task.id);
                      setIsModalOpen(false);
                      setIsShow(true);
                    }}
                    className={styles.menuBtn}
                  >
                    <Icons name={EIcons.edit} />
                    Редактировать
                  </button>
                </li>
                <li className={styles.menuItem}>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setTaskId(task.id);
                    }}
                    className={styles.menuBtn}
                  >
                    <Icons name={EIcons.del} />
                    Удалить
                  </button>
                </li>
              </ul>
            </Dropdown>
          </li>
        ))}
      </ul>

      {isShow && (
        <div className={styles.editMenu} ref={ref}>
          <div className={styles.editMenuContainer}>
            <input
              className={styles.input}
              onChange={(e) => handleChange(e)}
              type="text"
              ref={refInput}
              value={value}
            />
            <div className="flex flex-col">
              <button
                className={styles.editMenuBtn}
                onClick={() => {
                  editTask({ id: taskId, name: value });
                  setIsShow(false);
                  setValue("");
                }}
              >
                Изменить
              </button>
              <Button
                use="danger"
                onClick={() => {
                  setIsShow(false);
                  setValue("");
                }}
                text={"Отмена"}
              />
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}

      {tasks && tasks.length !== 0 && (
        <span
          className={styles.time}
        >{`${totalTime.hours} час ${totalTime.minutes} мин`}</span>
      )}

      {isModalOpen && (
        <Modal
          id={taskId}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
