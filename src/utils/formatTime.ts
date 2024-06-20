function formatTimestamp(timestamp: string | number): string {

  let timestampNum: number;

  if (typeof timestamp === 'string') {
    timestampNum = parseInt(timestamp);
  } else {
    timestampNum = timestamp;
  }

  if (timestampNum.toString().length === 10) {
    timestampNum *= 1000;
  }


  const date = new Date(timestampNum);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  if (year === currentYear) {
    return `${month}-${day} ${hours}:${minutes}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}

export { formatTimestamp }