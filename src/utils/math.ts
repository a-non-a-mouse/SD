export const constrain = (num: number, min: number, max: number): number => {
  return num > max ? max : num < min ? min : num;
};
