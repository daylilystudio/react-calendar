import dayjs from "dayjs";

function getDaysOfMonth(year: number, month: number) {
  let firstDayOfMonth = dayjs(`${year}-${month}-1`);
  let lastDayOfMonth = dayjs(`${year}-${month + 1}-1`).subtract(1, "day");
  // 補上第一天前的日期
  while (firstDayOfMonth.day() !== 0) {
    firstDayOfMonth = firstDayOfMonth.subtract(1, "day");
  }

  // 補上最後一天後的日期
  while (lastDayOfMonth.day() !== 6) {
    lastDayOfMonth = lastDayOfMonth.add(1, "day");
  }

  const days = [];
  let tempDate = firstDayOfMonth;
  while (tempDate.isBefore(lastDayOfMonth) || tempDate.isSame(lastDayOfMonth)) {
    days.push(tempDate);
    tempDate = tempDate.add(1, "day");
  }
  
  return days;
}

export default getDaysOfMonth