// Get the values from the user input
function getValues() {
    let loanAmount = document.getElementById("loanAmount").value;
    let months = document.getElementById("months").value;
    let rate = document.getElementById("rate").value;
    let loanData = {};

    loanAmount = parseFloat(loanAmount);
    months = parseInt(months);
    rate = parseInt(rate);

    loanData = calculateLoan(loanAmount,months,rate);
    
    displayData(loanData);

}

// Calulcate the data for the result table
function calculateLoan(loanAmount, months, rate) {
    let totalMonthlyPayment = loanAmount * (rate / 1200) / (1 - Math.pow(1 + rate / 1200,-months));
    let balance = loanAmount;
    let totalInterest = 0;
    
    let monthSchedule = [];
    let loanData = {};

    for (let i = 0; i < months; i++) {
        let returnObj = {};
        let interest = balance * (rate / 1200);
        let principal = totalMonthlyPayment - interest;
        balance -= principal;
        totalInterest += interest;
        
        returnObj.payment = totalMonthlyPayment.toFixed(2);
        returnObj.interest = interest.toFixed(2);
        returnObj.principal = principal.toFixed(2);
        returnObj.totalInterest = totalInterest.toFixed(2);
        returnObj.balance = Math.round(balance.toFixed(2) * 100) / 100;
        monthSchedule.push(returnObj);
    }

    loanData.monthlyPayments = totalMonthlyPayment.toFixed(2);
    loanData.totalPrincipal = loanAmount.toFixed(2);
    loanData.totalInterest = totalInterest.toFixed(2);
    loanData.totalCost = (loanAmount + totalInterest).toFixed(2);
    loanData.monthSchedule = monthSchedule;

    return loanData;
}

// Display the loan data in the table rows
function displayData(loanData){
    // get the table body element from the page
    let tableBody = document.getElementById("results")

    // get the template row
    let templateRow = document.getElementById("templateRow");
    // clear the table
    tableBody.innerHTML = "";
    
    for (let i = 0; i < loanData.monthSchedule.length; i++) {
        
        let tableRow = document.importNode(templateRow.content,true);

        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = i + 1;
        rowCols[1].textContent = loanData.monthSchedule[i].payment;
        rowCols[2].textContent = loanData.monthSchedule[i].principal;
        rowCols[3].textContent = loanData.monthSchedule[i].interest;
        rowCols[4].textContent = loanData.monthSchedule[i].totalInterest;
        rowCols[5].textContent = loanData.monthSchedule[i].balance;
        
        tableBody.appendChild(tableRow);
    }

    document.getElementById("monthlyPayments").innerHTML = '$' + loanData.monthlyPayments;
    document.getElementById("totalPrincipal").innerHTML = '$' + loanData.totalPrincipal;
    document.getElementById("totalInterest").innerHTML = '$' + loanData.totalInterest;
    document.getElementById("totalCost").innerHTML = '$' + loanData.totalCost;
}