import classNames from "classnames";
import React from "react";
import styles from "./Button.module.scss";

type TUse = "primary" | "danger" | "hollow";
type TSize = "big" | "small" | "medium";

interface IButtonProps {
  text?: string;
  size?: TSize;
  disabled?: boolean;
  use: TUse;
  onClick?: () => void;
}

export function Button(props: IButtonProps) {
  const { text, use, size, onClick, disabled } = props;
  const classes = classNames(styles[`${use}`], styles[`${size}`], {
    [styles[`disabled`]]: disabled,
  });
  return (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {text}
    </button>
  );
}
