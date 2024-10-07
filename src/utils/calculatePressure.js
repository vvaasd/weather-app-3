export function calculatePressure(pressure) {
    return Math.floor(pressure * 0.750064)
}

export function getDescriptionPressure(pressure) {
    if(pressure >= 740 && pressure <= 760) return 'Нормальное'
    if(pressure < 740) return 'Низкое'
    return 'Высокое'
}