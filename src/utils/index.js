import * as numeral from "numeral";
import config from "../config";

export const getRandom = (start, end, fixed = 0) => {
  let differ = end - start;
  let random = Math.random();
  return numeral((start + differ * random).toFixed(fixed)).value();
};

export const saveLocalStorage = data => {
  localStorage.setItem(config.LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const loadLocalStorage = () => {
  return JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_KEY));
};
