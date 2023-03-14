// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(function(arr) {
        return createEmployeeRecord(arr)
    });
}

function createTimeInEvent(employeeRec, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRec.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: `${date}`
    })
    return employeeRec
}

function createTimeOutEvent(employeeRec, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRec.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: `${date}`
    })
    return employeeRec
}

function hoursWorkedOnDate(employeeRec, formDate) {
    let dateSoughtIn = employeeRec.timeInEvents.find(function(element) {
        if (element.date === formDate) {
            return element.date
        }
    })

    let dateSoughtOut = employeeRec.timeOutEvents.find(function(element) {
        if (element.date === formDate) {
            return element.date
        }
    })

    let hours1 = dateSoughtOut.hour - dateSoughtIn.hour;
    return hours1 / 100
}

function wagesEarnedOnDate(employeeRec, formDate) {
    let payOwed = hoursWorkedOnDate(employeeRec, formDate) * employeeRec.payPerHour;
    return parseFloat(payOwed)
}

function allWagesFor(employeeRec) {
    let dates = employeeRec.timeInEvents.map(element => {
        return element.date
    });

    let payOwed = dates.reduce(function(accumulator, currentValue) {
        return accumulator + wagesEarnedOnDate(employeeRec, currentValue)
    }, 0)

    return payOwed
}

function calculatePayroll(arrayEmployeeRec) {
    return arrayEmployeeRec.reduce(function(accumulator, currentValue) {
        return accumulator + allWagesFor(currentValue)
    }, 0)
}
