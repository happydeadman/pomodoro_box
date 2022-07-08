import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { tasksActions } from "../store/tasks/tasks.slice";

const allActions = {
  ...tasksActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
