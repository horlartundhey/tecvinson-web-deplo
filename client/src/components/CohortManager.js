const generateCohorts = (selectedYear) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-11

  // Define cohort periods
  const cohortPeriods = [
    { id: 1, name: "March - May" }, // Cohort 1: March, April, May
    { id: 2, name: "September - November" } // Cohort 2: September, October, November
  ];

  // Define month ranges for each cohort
  const cohortMonthRanges = [
    { start: 2, end: 4 }, // March (2) to May (4)
    { start: 8, end: 10 } // September (8) to November (10)
  ];

  return cohortPeriods.map((period, index) => {
    const startMonth = cohortMonthRanges[index].start;
    const endMonth = cohortMonthRanges[index].end;

    // Check if the cohort is disabled
    let isDisabled = false;

    if (selectedYear < currentYear) {
      // If the selected year is in the past, disable the cohort
      isDisabled = true;
    } else if (selectedYear === currentYear) {
      // If the selected year is the current year, disable cohorts that have already started
      isDisabled = currentMonth >= startMonth;
    }

    // Define start and end dates for the cohort
    const startDate = new Date(selectedYear, startMonth, 1); // Start of the first month
    const endDate = new Date(selectedYear, endMonth + 1, 0); // End of the last month

    return {
      id: `${selectedYear}-${period.id}`, // Unique ID for the cohort
      name: `Cohort ${period.id} (${period.name})`, // Cohort name
      dateRange: `${startDate.toLocaleDateString('en-US', { month: 'short' })} - ${endDate.toLocaleDateString('en-US', { month: 'short' })} ${selectedYear}`, // Date range string
      fullName: `Cohort ${period.id} (${period.name}) ${startDate.toLocaleDateString('en-US', { month: 'short' })} - ${endDate.toLocaleDateString('en-US', { month: 'short' })} ${selectedYear}`,
      isDisabled, // Whether the cohort is disabled
      startDate, // Start date of the cohort
      endDate // End date of the cohort
    };
  });
};

export default generateCohorts;