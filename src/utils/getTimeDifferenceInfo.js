import { DateService } from 'services';

export const getTimeDifferenceInfo = (timeMs = 0, timezoneMs = 0) => {
  const nowDate = DateService.getTimeByTimezone(new Date(), timezoneMs);
  const targetDate = DateService.getTimeByTimezone(
    new Date(timeMs),
    timezoneMs,
  );
  const targetTimeStr = DateService.getFormattedTimeByDate(targetDate).replace(
    /^0/,
    '',
  );

  let targetDescription = '';
  if (nowDate > targetDate) {
    targetDescription = `Прошло ${DateService.getFormattedTimeByMs(
      nowDate - targetDate,
    )}`;
  } else if (nowDate < targetDate) {
    targetDescription = `Осталось ${DateService.getFormattedTimeByMs(
      targetDate - nowDate,
    )}`;
  }

  return [targetTimeStr, targetDescription];
};
