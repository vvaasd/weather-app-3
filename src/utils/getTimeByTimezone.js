function getTimeByTimezone(
  targetDate = new Date(),
  timezoneInMilliseconds = 10800000
) {
  const utcTime = targetDate.getTime() + targetDate.getTimezoneOffset() * 60000;

  return new Date(utcTime + timezoneInMilliseconds);
}

export default getTimeByTimezone;
