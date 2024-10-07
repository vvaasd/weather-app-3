import { upperCaseFirst } from './upperCaseFirst';

const formatterDateUTC = new Intl.DateTimeFormat('ru', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function getFiveDaysSliderData(forecastList) {
  return Array.from({ length: 5 }, (_, i) => {
    const startIndex = i * 8;

    const date = upperCaseFirst(
      formatterDateUTC.format(new Date(forecastList[startIndex]?.dt * 1000))
    );
    const imgName = forecastList[startIndex]?.weather[0]?.icon;

    const currentDayList = forecastList.slice(startIndex, startIndex + 8);

    const weatherRangeByTemp = currentDayList.reduce(
      (acc, obj) => {
        const temp = obj.main.temp;
        if (temp > acc.max.main.temp) {
          acc.max = obj;
        }
        if (temp < acc.min.main.temp) {
          acc.min = obj;
        }

        return acc;
      },
      { max: currentDayList[0], min: currentDayList[0] }
    );

    const tempRange = {
      min: Math.round(weatherRangeByTemp.min.main.temp),
      max: Math.round(weatherRangeByTemp.max.main.temp),
    };

    return {
      time: date,
      imgName: imgName,
      tempStr: `от ${tempRange.min}° до ${tempRange.max}°`,
    };
  });
}
