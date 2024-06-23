const calculateDuration = (postDate: Date | string): string => {
  // Ensure postDate is a Date object
  const parsedPostDate = typeof postDate === 'string' ? new Date(postDate) : postDate;
  if (!(parsedPostDate instanceof Date && !isNaN(parsedPostDate.getTime()))) {
      throw new Error('Invalid postDate');
  }

  // Get the current date
  const currentDate = new Date();

  // Calculate time difference in milliseconds
  const timeDifference = currentDate.getTime() - parsedPostDate.getTime();
  
  // Convert time difference to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);
  
  if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
  }

  // Convert time difference to minutes
  const minutesDifference = Math.floor(secondsDifference / 60);
  
  if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
  }

  // Convert time difference to hours
  const hoursDifference = Math.floor(minutesDifference / 60);

  if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
  }

  // Convert time difference to days
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference < 30) {
      return `${daysDifference} days ago`;
  }

  // Convert time difference to months
  const monthsDifference = Math.floor(daysDifference / 30);

  if (monthsDifference < 12) {
      return `${monthsDifference} months ago`;
  }

  // Convert time difference to years
  const yearsDifference = Math.floor(monthsDifference / 12);

  return `${yearsDifference} years ago`;
};

export default calculateDuration;
