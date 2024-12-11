export function sayHello() {
  console.log('Hello');
}

export function calculateAverageDailyPosts(dates) {
  
  // Given a range of dates, calculate the average number of posts per day
  const itemDates = Object.values(dates);
  console.log('Item Dates:', itemDates);
  
  const parseDate = (dateString) => {
    const [dayOfWeek, month, day, year] = dateString.split(' ');
    const parsedDate = new Date(`${month} ${day}, ${year}`);
    return isNaN(parsedDate) ? null : parsedDate;
  };

  const parsedDates = itemDates.map(date => parseDate(date)).filter(date => date !== null);
  parsedDates.forEach((date, index) => {
    console.log(`Parsed Date ${index + 1}:`, date);
  });

  if (parsedDates.length === 0) {
    console.log('No valid dates found.');
    return 0;
  }

  const earliestDate = new Date(Math.min(...parsedDates));
  const latestDate = new Date(Math.max(...parsedDates));
  console.log('Earliest Date:', earliestDate);
  console.log('Latest Date:', latestDate);

  //get the number of days betweenthe earliest and the latest date
  const totalDays = (latestDate - earliestDate) / (1000 * 60 * 60 * 24);
  console.log('Total Days:', totalDays);

  //get the total number of posts
  const totalPosts = parsedDates.length;
  console.log('Total Posts:', totalPosts);

  //calculate the average
  const average = totalPosts / totalDays;
  console.log('Average:', average);

  //round the average to 2 decimal places
  const roundedAverage = average.toFixed(2);
  console.log('Rounded Average:', roundedAverage);

  return roundedAverage;

}