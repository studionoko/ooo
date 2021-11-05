export const clamp = (val, min, max) => {
  return Math.min(Math.max(val, min), max)
}

export const map = (val, om, ox, m, x) => {
  return ((val - om) * (x - m)) / (ox - om) + m
};