import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useActions } from "../Hooks/useActions";
import styles from "./Modal.module.scss";

interface IModal {
  onClose?: () => void;
  id: string;
}

export function Modal(props: IModal) {
  const refModal = useRef<HTMLDivElement>(null);
  const { id, onClose } = props;
  const { removeTask } = useActions();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && ref.current.contains(event.target)) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const node = document.querySelector("#modal_root");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={refModal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Удалить задачу?</h3>
          <button className={styles.close} onClick={() => onClose?.()}>
            <span>X</span>
          </button>
        </div>

        <button
          className={styles.deleteBtn}
          onClick={() => {
            removeTask({ id });
            onClose?.();
          }}
        >
          Удалить
        </button>
        <button className={styles.abortBtn} onClick={() => onClose?.()}>
          Отмена
        </button>
      </div>
      <div ref={ref} className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </div>,
    node
  );
}
