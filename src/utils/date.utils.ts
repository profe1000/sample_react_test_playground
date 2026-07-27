export const convertToShortDate = (date: string) => {
  const curdate = new Date(date);
  return curdate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });
};

export const convertToLongDate = (date: string) => {
  const curdate = new Date(date);
  return curdate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
