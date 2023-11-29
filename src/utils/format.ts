import { WEEKDAYS } from "./constants";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const weekday = date.getDay();

  return `${yyyy}.${mm}.${dd} ${WEEKDAYS[weekday]}`;
};
