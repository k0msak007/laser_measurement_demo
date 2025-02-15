export const polarToCartesian = (distance: number, angle: number) => {
  const radians = (angle * Math.PI) / 180;
  return {
    x: distance * Math.cos(radians),
    y: distance * Math.sin(radians),
  };
};

export const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);