export const COLORS = ['grey', 'red', 'blue', 'sky', 'green', 'yellow'];

export const randomColor = () => {
  return COLORS[Math.floor(Math.random()*COLORS.length)];
};
