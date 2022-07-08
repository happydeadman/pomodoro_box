import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITasks } from "../../Main";

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
        current.pomodoro++;
      }
    },
    decreasePomodoroTask: (
      state: ITasks[],
      action: PayloadAction<{ id: string }>
    ) => {
      const current = state.find((i) => i.id === action.payload.id);
      if (current) {
        current.pomodoro--;
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
