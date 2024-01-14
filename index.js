// Your code here
// Create an employee record using createEmployeeRecord function. This function takes in an array with 4 elements. 3 strings and a number.

function createEmployeeRecord(employeeInfo){
    // Initialize an object with empty arrays for timeInEvnts and timeOutEvents
    const employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return employeeRecord;
}

// createEmployeeRecords function takes an array of arrays as an argument. Each nested array represents the information for an employee record. It converts each nested array into an employee record using createEmployeeRecord function and accumulates them into a new array. Return the new array of records

function createEmployeeRecords(employeeRecords){
    const records = [];

    for(let i = 0; i < employeeRecords.length; i++){
        const employeeRecord = createEmployeeRecord(employeeRecords[i]);
        records.push(employeeRecord);
    }
    return records;
}

// createTimeInEvent function takes in an employee record object and a date stamp as arguments. It adds an object with keys to the timeInEvents array on the record object. The added object has 3 properties: - type:Set to 'Timein'. - hour: Derived from the argument. - date: Derived from the argument

function createTimeInEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(' ');

    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord;
}

// createTimeOutEvent function takes in an employee record object and a date stamp as arguments. It adds an object with keys to the timeOutEvents array on the record object. The added object has 3 properties: - type:Set to 'TimeOut'. - hour: Derived from the argument. - date: Derived from the argument

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord;
}

// hoursWorkedOnDate function takes in an employee record object and a date in the 'YYYY-MM-DD' format as arguments. It calculates and returns the number of hours worked on that date by finding the elapsed time between the timeInEvent and timeOutEvent for that date.

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;

    const hoursWorked = (timeOut - timeIn)/100;

    return hoursWorked;
}

// wagesEarnedOnDate function takes in an employee record object and a date in the 'YYYY-MM-DD' format as arguments. It calculates and returns the amount of pay owed to the employee for that date by multiplying the number of hours worked on that date (using the hoursWorkedOnDate function) by the employee's pay rate.

function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;

    const wagesEarned = hoursWorked * payRate;

    return wagesEarned;
}

// allWagesFor function takes an employee record object as an argument and returns the pay owed for all dates worked by the employee. It uses the wagesEarnedOnDate function to calculate the wages earned for each date and then accumulates the total amount by summing up the values for all dates.

function allWagesFor(employeeRecord){
    let totalWages = 0;
    const timeInEvents = employeeRecord.timeInEvents;

    for (let i = 0; i < timeInEvents.length; i++){
        const date = timeInEvents[i].date;
        const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
        totalWages += wagesEarned;
    }

    return totalWages;
}

// calculatePayroll function takes an array of employee record objects as an argument and returns the sum of pay owed to all employess for all dates. It uses the wagesEarnedOnDate function to calculate the wages earned for each date worked by each employee, and then accumulates the total amount by summing up the values for all employees and all dates.

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    for (let i = 0;  i < employeeRecords.length; i++){
        const employeeRecord = employeeRecords[i];
        const timeInEvents = employeeRecord.timeInEvents;

        for (let j = 0; j < timeInEvents.length; j++){
            const date = timeInEvents[j].date;
            const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
            totalPayroll += wagesEarned;
        }
    }

    return totalPayroll;
}
