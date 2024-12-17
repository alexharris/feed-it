

export function sayHello() {
  console.log('Hello');
}

export function getImage(image, src) {
  if(image) {
    return image
  } else {
    const urlObj = new URL(src);
    return `${urlObj.origin}/favicon.ico`; 
  } 
}

export function calculateAverageDailyPosts(dates) {
  
  // Given a range of dates, calculate the average number of posts per day
  const itemDates = Object.values(dates);
  // console.log('Item Dates:', itemDates);
  
  // Some potential date formats:
  // 2024-12-12T22:48:23.000Z
  //Tue, 10 Dec 2024 15:15:49 GMT

  const parseDate = (dateString) => {
    // Try to parse as ISO 8601 format
    let parsedDate = new Date(dateString);
    if (!isNaN(parsedDate)) {
      return parsedDate;
    }
  
    // Try to parse as RFC 2822 format
    parsedDate = new Date(Date.parse(dateString));
    if (!isNaN(parsedDate)) {
      return parsedDate;
    }
  
    // If the date string doesn't match any known format, return null
    return null;
  };

  
  const parsedDates = itemDates.map(date => parseDate(date)).filter(date => date !== null);
  parsedDates.forEach((date, index) => {
    // console.log(`Parsed Date ${index + 1}:`, date);
  });

  if (parsedDates.length === 0) {
    console.log('No valid dates found.');
    return 0;
  }

  const earliestDate = new Date(Math.min(...parsedDates));
  const latestDate = new Date(Math.max(...parsedDates));
  // console.log('Earliest Date:', earliestDate);
  // console.log('Latest Date:', latestDate);

  //get the number of days betweenthe earliest and the latest date
  const totalDays = (latestDate - earliestDate) / (1000 * 60 * 60 * 24);
  // console.log('Total Days:', totalDays);

  //get the total number of posts
  const totalPosts = parsedDates.length;
  // console.log('Total Posts:', totalPosts);

  //calculate the average
  const average = totalPosts / totalDays;
  // console.log('Average:', average);

  //round the average to 2 decimal places
  const roundedAverage = average.toFixed(2);
  // console.log('Rounded Average:', roundedAverage);

  return {earliestDate, latestDate, roundedAverage, totalDays};

}


