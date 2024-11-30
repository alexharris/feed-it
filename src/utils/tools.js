export function sayHello() {
  console.log('Hello');
}

export function calculateAverageDailyPosts(dates) {
  // Given a range of dates, calculate the average number of posts per day

  const itemDates = Object.values(dates);
  console.log(itemDates)

 //get the earliest nd the latest date
  const earliestDate = new Date(Math.min(...itemDates.map(date => new Date(date))));
  const latestDate = new Date(Math.max(...itemDates.map(date => new Date(date))));

  // //get the number of days betweenthe earliest and the latest date
  const totalDays = (latestDate - earliestDate) / (1000 * 60 * 60 * 24);

  console.log(totalDays)
  // //get the total number of posts
  const totalPosts = itemDates.length;

  // //calculate the average
  const average = totalPosts / totalDays;

  //round the average to 2 decimal places
  const roundedAverage = average.toFixed(2);

  return roundedAverage;

}