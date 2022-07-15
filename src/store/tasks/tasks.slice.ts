import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITasks } from "../../Main";
import { generateRandomString } from "../../utils/react/generateRandomIndex";

const initialState: ITasks[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: ITasks[], action: PayloadAction<ITasks>) => {
      state.push(action.payload);
    },

    removeTask: (state: ITasks[], action: PayloadAction<{ id: string }>) => {
      return state.filter((i) => i.id !== action.payload.id);
    },
    increasePomodoroTask: (
      state: ITasks[],
      action: PayloadAction<{ id: string }>
    ) => {
      const current = state.find((i) => i.id === action.payload.id);
      if (current) {
        current.pomodoro.push({
          time: 25,
          timeSpend: 0,
          id: generateRandomString(),
        });
      }
    },
    decreasePomodoroTask: (
      state: ITasks[],
      action: PayloadAction<{ id: string }>
    ) => {
      const current = state.find((i) => i.id === action.payload.id);
      if (current) {
        current.pomodoro.pop();
      }
    },
    spendTime: (
      state: ITasks[],
      action: PayloadAction<{
        id: string;
        pomodoroId: string;
        timeSpend: number;
      }>
    ) => {
      const currentTask = state.find((i) => i.id === action.payload.id);
      if (currentTask) {
        const currentPomodoro = currentTask.pomodoro.find(
          (i) => i.id === action.payload.pomodoroId
        );
        if (currentPomodoro) {
          currentPomodoro.timeSpend = action.payload.timeSpend;
        }
      }
    },
    editTask: (
      state: ITasks[],
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const current = state.find((i) => i.id === action.payload.id);
      if (current) {
        current.name = action.payload.name;
      }
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
