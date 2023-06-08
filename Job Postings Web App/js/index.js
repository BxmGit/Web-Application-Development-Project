// This is the javascript code I have created for the index.html page (homepage). The following javascript, provides the searchbar functionality which will open a new tab on the vacancies page with job listing searched for.
// This javascript also pulls through the top job listings from the api and lists them in the top vacancies div, using the top-job-listings id.

//Here window.onload, waits for the webpage to load before executing the JobSearch and TopJobs functions.
window.onload = function () {
  JobSearch();
  TopJobs();
};


//Initialise the JobSearch function which will allow users to search for a job vacancy.
function JobSearch() {
  // searchBar variable will take the input from the DOM through the search-form id after it is submitted.
  const searchBar = document.getElementById("search-bar"); 
  searchBar.onsubmit = function (event) {
    //event.preventDefault() stop the submission of the searchbar without any input/
    event.preventDefault();
    //Takes the user input from search-input id from the DOM.
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.trim();
    // if a search input exists then the user will be redirected to a new tab with the search input as a encoded URL search parameter.
    if (searchTerm) {
      window.location.href = `vacancies.html?search=${encodeURIComponent(
        searchTerm
      )}`;
    }
  };
}


//Initialise the TopJobs function, which will get the top job listings from the api.
function TopJobs() {
  //Store the api url for the top jobs. In this case the top jobs are the listed jobs where you search for nothing in the api.
  const url = "http://api.lmiforall.org.uk/api/v1/vacancies/search?keywords=";
  //Using the fetch js function, pull the data from the url variable storing the api endpoint we was to request data from.
  fetch(url)
  // When data is recieved it, converts it into json format to be used by the following function(data)
    .then(function (response) {
      return response.json();
    })
    // When there is data pulled from the api, and converted into json, the function displayTopJobs is called using the json data, pulled from the api.
    .then(function (data) {
      displayTopJobs(data);
    })
    //If there are any errors in fetching the data from the api, a console message will be displayed instead of crashing the webpage and the java script will continue.
    .catch(function (error) {
      console.error("Error fetching top jobs:", error);
    });
}

//Initialise the displayTopJobs function using the data parameter, which will display the job listings on the home page.
function displayTopJobs(data) {
  //The script takes the element input stored by the DOM with the id top-jobs-list and stores it in a variable.
  const topJobsListings = document.getElementById("top-job-listings");
  //Loops through the first 10 items in the data parameter to then posted to the webpage.
  for (let i = 0; i < 10; i++) {
    //Stores the iteration of the loop in job variable.
    const job = data[i];
    //Creates a list element.
    const listItem = document.createElement("li");
    //Creates an anchor element on the webpage.
    const jobLink = document.createElement("a");
    //This stores the job title on the previously created anchor element.
    jobLink.textContent = job.title;
    //This takes the title of the job, encodes it and adds to the end of the url for the vacancies search.
    jobLink.href = `vacancies.html?jobTitle=${encodeURIComponent(job.title)}`; // Changed 'search' to 'jobTitle'
    //The following two lines append the job title to the anchor element which is then appeneded to the top job listing area.
    listItem.appendChild(jobLink);
    topJobsListings.appendChild(listItem);
  }
}
