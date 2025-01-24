export function getDateStringWithoutTime(myDate: string): string {
  const fullDate = new Date(myDate);
  const formattedDateWithoutTime = new Date(
    fullDate.getFullYear(),
    fullDate.getMonth(),
    fullDate.getDate()
  ).toLocaleDateString();

  return formattedDateWithoutTime;
}
