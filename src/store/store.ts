import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasks/tasks.slice";

export const store = configureStore({
  reducer: { tasks: tasksReducer },
});

export type TypeRootState = ReturnType<typeof store.getState>;
