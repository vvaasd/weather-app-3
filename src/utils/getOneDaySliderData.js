const formatterTimeUTC = new Intl.DateTimeFormat('ru', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
});

export function getOneDaySliderData(forecastList) {
  return Array.from({ length: 8 }, (_, i) => {
    const time = formatterTimeUTC.format(new Date(forecastList[i]?.dt * 1000));
    const imgName = forecastList[i]?.weather[0]?.icon;
    const temp = Math.round(forecastList[i]?.main?.temp);

    return { time: time, imgName: imgName, tempStr: `${temp}°` };
  });
}
