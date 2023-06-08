//This javascript provides the functionality for the pay calculator. Users input the job title, payment amount, timeframe and hours worked.
//The script will carry out the necessary  calculations and then will display the results below the form for users to compare.

//Begins with a listener event to initialise the script, in this case when the submit button is pressed by the user. 
document.getElementById("pay-calculator-form").addEventListener("submit", function (event) {
    //Prevents the script from loading automatically.
    event.preventDefault();

    //Initalise the variables, each element entered into the form are stored in the variables respectively as values.
    const jobTitle = document.getElementById("job-title").value;
    const pay = parseFloat(document.getElementById("pay").value);
    const Timeframe = document.getElementById("pay-timeframe").value;
    const hoursPerWeek = parseFloat(document.getElementById("hours-per-week").value);


    //Initalise the variables which will be used in the calculations for results.
    const yearlyWage = calculateYearlyWage(pay, Timeframe);
    const monthlyWage = yearlyWage / 12;
    const weeklyWage = yearlyWage / 52;
    const hourlyWage = weeklyWage / hoursPerWeek;

    //Initialise the calculateyearlywage function, which will take the user inputed data and calculate the results to be displayed based on the timeframe they enter.
    function calculateYearlyWage(pay, Timeframe) {
        //Initialises the variable yearlyWage which will be store the calculation.
        let yearlyWage;
        //The switch function performs diferent calculations based on what is stored in Timeframe variable.
        switch (Timeframe) {
            //The case for the timeframe will be calculated.
            case "year":
                yearlyWage = pay;
                break;
            case "month":
                yearlyWage = pay * 12;
                break;
            case "week":
                yearlyWage = pay * 52;
                break;
            case "hour":
                yearlyWage = pay * 52 * hoursPerWeek; 
                break;
            default:
                yearlyWage = 0;
        }
        return yearlyWage;
    }

    // This creates and displays the results from the payment calculator.
    const Results = document.createElement("div");
    Results.className = "result-box";
    //This creates the layout for which the results will be displayed on the webpage, with the additional variables being added from the calculation to display the calculations results.
    Results.innerHTML = `
    <h3>Job: <b>${jobTitle}</b></h3>
    Working <b>${hoursPerWeek}</b> hours a week for <b>£${pay.toFixed(2)}</b> per <b>${Timeframe.charAt(0).toUpperCase() + Timeframe.slice(1)}</b> breaks down into:
    <ul>
        <li>£${hourlyWage.toFixed(2)} per Hour</li>
        <li>£${weeklyWage.toFixed(2)} per Week</li>
        <li>£${monthlyWage.toFixed(2)} per Month</li>
        <li>£${yearlyWage.toFixed(2)} per Year</li>
    </ul>
    <a href="vacancies.html?jobTitle=${encodeURIComponent(jobTitle)}" target="_blank">Click here for current ${jobTitle} vacancies.</a>
`;
//Here the results are appended to the results id div container. It is then displayed in block format in the results-section div.
    document.getElementById("results").appendChild(Results);
    document.getElementById("results-section").style.display = "block";


});
