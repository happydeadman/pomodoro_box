import * as React from "react";
import classNames from "classnames";
import styles from "./icon.css";
import {
  Logo,
  StatIcon,
  AddIcon,
  MenuIcon,
  PlusIcon,
  MinusIcon,
  EditIcon,
  DeleteIcon,
} from "../Icons";
import { ReactNode } from "react";

type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

export enum EIcons {
  logo = "MenuIcons",
  stat = "StatIcon",
  add = "AddIcon",
  menu = "MenuIcon",
  plus = "PlusIcon",
  minus = "MinusIcon",
  edit = "EditIcon",
  del = "DeleteIcon",
}

interface IIconsProps {
  size?: TSizes;
  name: EIcons;
}

function setIconComponent(name: EIcons): ReactNode {
  switch (name) {
    case EIcons.logo:
      return <Logo />;
    case EIcons.stat:
      return <StatIcon />;
    case EIcons.add:
      return <AddIcon />;
    case EIcons.menu:
      return <MenuIcon />;
    case EIcons.plus:
      return <PlusIcon />;
    case EIcons.minus:
      return <MinusIcon />;
    case EIcons.edit:
      return <EditIcon />;
    case EIcons.del:
      return <DeleteIcon />;
  }
}

export function Icons(props: IIconsProps) {
  const { size, name } = props;
  const classes = classNames(styles[`s${size}`]);
  return <span className={classes}>{setIconComponent(name)}</span>;
}
