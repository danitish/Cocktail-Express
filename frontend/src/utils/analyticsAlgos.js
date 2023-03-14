const monthsByName = [
  { value: 1, name: "Jan" },
  { value: 2, name: "Feb" },
  { value: 3, name: "Mar" },
  { value: 4, name: "Apr" },
  { value: 5, name: "May" },
  { value: 6, name: "Jun" },
  { value: 7, name: "Jul" },
  { value: 8, name: "Aug" },
  { value: 9, name: "Sep" },
  { value: 10, name: "Oct" },
  { value: 11, name: "Nov" },
  { value: 12, name: "Dec" },
];

export function getEventYears(events = []) {
  const yearArr = [];
  for (let event of events) {
    yearArr.push(new Date(event.event_date).getFullYear());
  }
  yearArr.sort((a, b) => b - a);
  let sortedYearsArr = [];
  for (let i = 0; i < yearArr.length; i++) {
    if (yearArr[i] !== yearArr[i + 1]) {
      sortedYearsArr.push(yearArr[i]);
    }
  }
  return sortedYearsArr;
}

export function getDataFromYearlyEvents(events = [], year) {
  const filteredEvents = events.filter(
    (event) => new Date(event.event_date).getFullYear() === year
  );
  let data = [];
  if (filteredEvents) {
    for (let event of filteredEvents) {
      data.push({
        month: new Date(event.event_date).getMonth() + 1,
        profit: event.profit,
      });
    }
  }
  if (data.length) {
    for (let obj of data) {
      const monthName = monthsByName.find((month) => month.value === obj.month);
      if (monthName) {
        obj.month = monthName.name;
      }
    }
  }
  let combinedData = data.reduce((acc, cur) => {
    const { month, profit } = cur;
    if (!acc[month]) {
      acc[month] = profit;
    } else {
      acc[month] += profit;
    }
    return acc;
  }, {});

  let combinedDataArr = Object.entries(combinedData).map(([month, profit]) => ({
    month,
    profit,
  }));

  const dataArray = monthsByName.reduce((acc, cur) => {
    const found = combinedDataArr.find((data) => data.month === cur.name);
    if (found) {
      acc.push(found);
    } else {
      acc.push({ month: cur.name, profit: 0 });
    }
    return acc;
  }, []);

  return dataArray;
}
