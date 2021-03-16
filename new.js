function getValues()
{
	//button click gets values from inputs
	var balance = parseFloat(document.getElementById("principal").value);
	var interestRate = parseFloat(document.getElementById("interest").value / 100);
  var amounted = parseFloat(document.getElementById("amount").value);
  var install = (document.getElementById("interval").value);
	var date = (document.getElementById("date").value);
	
	//set the div string
	var div = document.getElementById("Result");
	
	//in case of a re-calc, clear out the div!
	div.innerHTML = "";
	
//validate inputs - display error if invalid, otherwise, display table
var balVal = validateInputs(balance);
var intrVal = validateInputs(interestRate);
var amtVal = validateInputs(amounted);
var insVal = validateInputs(install);
var datVal = validateInputs(date);

if (balVal && intrVal && amtVal && insVal && datVal)
{
	//Returns div string if inputs are valid
	div.innerHTML += repay(balance, interestRate, amounted, install, date);
}
else
{
	//returns error if inputs are invalid
	div.innerHTML += "Please check your inputs and retry.";
}
}
/**
 * repay function:
 * Calculates the elements of the loan using user inputs
*/

function repay(balance, interestRate, amounted, install, date)
{ 
	if (install == "Monthly") {

  // Calculate how many months for simple interest rate
  var money = balance / amounted;

  var charge = money / 12;

  //Calculate the per month interest rate
	var monthlyRate = interestRate / 12;

  //Calculate total paid
  var paid = balance * (1 + (interestRate * (charge)));
	
	//begin building the return string for the display of the amort table
    var result = 
				"Start Date: " + date + "<br />" +
        "Loan amount: $" + balance.toFixed(2) +  "<br />" + 
        "Simple Rate: " + (interestRate * 100).toFixed(2) +  "%<br />" +
        "Number of months: " + money.toFixed(1) + "<br />" +
         install + " payment: $" + amounted.toFixed(2) + "<br />" +
        "Total paid: $" + (paid).toFixed(2) + "<br /><br />";
        
    //add header row for table to return string
  	result += 
        "<table border='1'><tr><th>Month #</th><th>Balance</th>" + 
        "<th>Interest</th><th>Principal</th>";
    
    /**
     * Loop that calculates the monthly amounts then adds 
     * them to the return string 
     */

	for (var count = 0; count < money; ++count)
	{ 
		//in-loop interest amount holder
		var interest = 0;
		
		//in-loop monthly principal amount holder
		var monthlyPrincipal = 0;
		
		//start a new table row on each loop iteration
		result += "<tr align=center>";
		
		//display the month number in col 1 using the loop count variable
		result += "<td>" + (count + 1) + "</td>";
		
		
		//code for displaying in loop balance
		result += "<td> $" + balance.toFixed(2) + "</td>";
		
		//calc the in-loop interest amount and display
		interest = balance * monthlyRate;
		result += "<td> $" + interest.toFixed(2) + "</td>";
		
		//calc the in-loop monthly principal and display
		monthlyPrincipal = amounted - interest;
		result += "<td> $" + monthlyPrincipal.toFixed(2) + "</td>";
		
		//end the table row on each iteration of the loop	
		result += "</tr>";
		
		//update the balance for each loop iteration
		balance = balance - monthlyPrincipal;		
	}
	
	//Final piece added to return string before returning it - closes the table
    result += "</table>";
	
	//returns the concatenated string to the page
    return result;
} 
}
function validateInputs(value)
{
	//some code here to validate inputs
	if ((value == null) || (value == ""))
	{
		return false;
	}
	else
	{
		return true;
	}
}
