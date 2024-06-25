export function wasInLastDay(timestamp: number) {

    const currentTime = Date.now();
  
    const difference = currentTime - timestamp;
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
  
    return difference > twentyFourHoursInMs;
  
}