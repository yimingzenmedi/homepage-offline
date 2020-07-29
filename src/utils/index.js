import * as numeral from "numeral";

export const getRandom = (start, end, fixed=0) => {
  let differ = end - start;
  let random = Math.random();
  return numeral((start + differ * random).toFixed(fixed)).value();
};