export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function daysInYear(date: Date): number {
  return isLeapYear(date.getFullYear()) ? 366 : 365;
}

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  if (startDate.getFullYear() !== untilDate.getFullYear()) {
    throw new Error("Employment must be within a single calendar year.");
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysWorked = Math.floor((untilDate.getTime() - startDate.getTime()) / msPerDay) + 1;
  const totalDays = daysInYear(startDate);

  const proRata = vacationDays * (daysWorked / totalDays) * (percentage / 100);
  return parseFloat(proRata.toFixed(2));
}
