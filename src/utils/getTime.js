export function getTime(UTCtime, timezone) {  
    const localDate = new Date();
    const localTimezone = localDate.getTimezoneOffset();
  
    const timestampDate = new Date(UTCtime * 1000 + timezone * 1000 + localTimezone * 60000);
    const regionDate = new Date(Date.now() + timezone * 1000 + localTimezone * 60000);
  
    const diff = timestampDate.getTime() - regionDate.getTime();
    const formattedDiff = new Date(Math.abs(diff) + localTimezone * 60000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  
    return {
      time: timestampDate.toLocaleTimeString("ru-RU", { hour: "numeric", minute: "2-digit" }),
      diffDescription: `${diff > 0 ? "Осталось" : "Прошло"}: ${formattedDiff}`
    }
  }