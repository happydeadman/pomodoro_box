import React from "react";
import { EIcons, Icons } from "../Icons/Icons";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#3" className={styles.logo} aria-label="Логотип pomodoro">
          <Icons name={EIcons.logo} />
          <span className={styles.logoText}>pododoro_box</span>
        </a>
      </div>
      <div className={styles.statistic}>
        <a href="#4" className={styles.link}>
          <Icons name={EIcons.stat} />
          <span className={styles.statText}>Статистика</span>
        </a>
      </div>
    </header>
  );
}
