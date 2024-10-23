import { DateService, StringService } from 'services';
import { SLIDER_TYPES } from 'constants';

export const mapForecastData = (forecastList) => {
  const oneDayForecast = Array.from({ length: 8 }, (_, i) => {
    const time = DateService.getForemattedSliderDate(
      new Date(forecastList[i]?.dt * 1000),
      SLIDER_TYPES.forOneDay,
    );
    const imgName = forecastList[i]?.weather[0]?.icon;
    const temp = Math.round(forecastList[i]?.main?.temp);

    return { time: time, imgName: imgName, temperatureStr: `${temp}°` };
  });

  const fiveDaysForecast = Array.from({ length: 5 }, (_, i) => {
    const startIndex = i * 8;

    const date = StringService.upperCaseFirst(
      DateService.getForemattedSliderDate(
        new Date(forecastList[startIndex]?.dt * 1000),
        SLIDER_TYPES.forFiveDays,
      ),
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
      { max: currentDayList[0], min: currentDayList[0] },
    );

    const tempRange = {
      min: Math.round(weatherRangeByTemp.min.main.temp),
      max: Math.round(weatherRangeByTemp.max.main.temp),
    };

    return {
      time: date,
      imgName: imgName,
      temperatureStr: `от ${tempRange.min}° до ${tempRange.max}°`,
    };
  });

  return { forOneDay: oneDayForecast, forFiveDays: fiveDaysForecast };
};
