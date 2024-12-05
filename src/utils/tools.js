export function sayHello() {
  console.log('Hello');
}

export function calculateAverageDailyPosts(dates) {
  // Given a range of dates, calculate the average number of posts per day
  const itemDates = Object.values(dates);
  // console.log('Item Dates:', itemDates);
  //get the earliest nd the latest date
  const earliestDate = new Date(Math.min(...itemDates.map(date => new Date(date))));
  const latestDate = new Date(Math.max(...itemDates.map(date => new Date(date))));
  // console.log('Earliest Date:', earliestDate);
  // console.log('Latest Date:', latestDate);

  //get the number of days betweenthe earliest and the latest date
  const totalDays = (latestDate - earliestDate) / (1000 * 60 * 60 * 24);
  // console.log('Total Days:', totalDays);

  //get the total number of posts
  const totalPosts = itemDates.length;
  // console.log('Total Posts:', totalPosts);

  //calculate the average
  const average = totalPosts / totalDays;
  // console.log('Average:', average);

  //round the average to 2 decimal places
  const roundedAverage = average.toFixed(2);
  // console.log('Rounded Average:', roundedAverage);

  return roundedAverage;

}