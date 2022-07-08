import { assoc } from "../js/assoc";

export const generateRandomString = () =>
  Math.random().toString(36).substring(2, 15);

export const assingId = assoc("guid", generateRandomString());

export const generateId = <O extends object>(obj: O) =>
  assoc("guid", generateRandomString())(obj);
