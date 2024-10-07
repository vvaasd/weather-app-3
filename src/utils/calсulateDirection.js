const directions = ['Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный']; 

export function calсulateDirection(deg) {
    return directions[Math.round(deg / 45) % 8]
  }