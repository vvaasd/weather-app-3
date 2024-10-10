import { SLIDER_TYPES } from 'constants';

export class DateService {
  static getTimeByTimezone = (
    targetDate = new Date(),
    timezoneInMilliseconds = 10800000,
  ) => {
    const utcTime =
      targetDate.getTime() + targetDate.getTimezoneOffset() * 60000;

    return new Date(utcTime + timezoneInMilliseconds);
  };

  static getFormattedLongDate = (targetDate = new Date()) => {
    const formatter = new Intl.DateTimeFormat('ru', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    return formatter.format(targetDate);
  };

  static getFormattedShortTime = (targetDate = new Date()) => {
    const formatter = new Intl.DateTimeFormat('ru', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return formatter.format(targetDate);
  };

  static getForemattedSliderDate = (targetDate = new Date(), sliderType) => {
    let options = {};
    if (sliderType === SLIDER_TYPES.forOneDay) {
      options = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      };
    } else if (sliderType === SLIDER_TYPES.forFiveDays) {
      options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      };
    }

    const formatter = new Intl.DateTimeFormat('ru', options);

    return formatter.format(targetDate);
  };

  static getFormattedTimeByDate = (targetDate = new Date()) => {
    const formatter = Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });

    return formatter.format(targetDate);
  };

  static getFormattedTimeByMs = (timeMs = 0) => {
    const timeInSeconds = Math.floor(timeMs / 1000);

    const minutes = Math.floor((timeInSeconds / 60) % 60);
    const hours = Math.floor((timeInSeconds / 3600) % 24);

    let formatedMinutes = String(minutes).padStart(2, '0');
    let formatedHours = String(hours).padStart(2, '0');

    return `${formatedHours}:${formatedMinutes}`;
  };
}
