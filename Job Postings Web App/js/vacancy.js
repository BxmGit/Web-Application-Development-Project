//Waits for the webpage to fully load before executing the homepageSearch function.
document.addEventListener("DOMContentLoaded", function() {
  homepageSearch();
});

//This function handles the homepage searchbar input or if a link from the top job listings on the homepage is clicked when loading the webpage.
function homepageSearch() {
  // Gets the searchbar input or the job title clicked from the URL parameters.
  var urlParams = new URLSearchParams(window.location.search);
  var searchInput = urlParams.get("search") || urlParams.get("jobTitle");

  // If there is an input from the homepage, search for them using the searchVacancies function.
  //Otherwise the users input from the searchbar on the vacancies page will be stored in the searchInput variable to be searched in the function.
  if (searchInput) {
    document.getElementById("search-input").value = searchInput;
    searchVacancies(searchInput);
  }

  // Event listener is added to wait for the submit to be clicked to run the script.
  document.getElementById("search-bar").addEventListener("submit", function(event) {
    //Prevent the page from auto refreshing when the button is submitted by the user.
    event.preventDefault();
    //Store the users input in the variable to be searched using the searchVacancies function.
    var searchInput = document.getElementById("search-input").value.trim();
    searchVacancies(searchInput);
  });
}

// This function searches for job vacancies using the API.
// It takes the searchInput as an argument and fetches data from the API.
function searchVacancies(searchInput) {
  var url = "http://api.lmiforall.org.uk/api/v1/vacancies/search?keywords=" + searchInput;

//Use the fetch function to fetch the api, stored in the url parameter.
  fetch(url)
  // When data is recieved it, converts it into json format to be used by the following function(vacancies)
    .then(function(response) {
      return response.json();
    })
    .then(function(vacancies) {
      // Call the 'displayVacancies' function with the first 10 job vacancies.
      displayVacancies(vacancies.slice(0, 10));
    });
}




//Function which will display the job vacancy titles on the page.
function displayVacancies(vacancies) {
  //Gets the container element to store the results.
  const vacanciesContainer = document.getElementById("vacancies-container");
  vacanciesContainer.innerHTML = "";
  //Loop through the vacancies in the vacancies array. Which will then be used to create a div element containing the array data.
  for (let i = 0; i < vacancies.length; i++) {
    const vacancy = vacancies[i];
    const vacancyDiv = createVacancyElement(vacancy);
    //This element is then appeneded to the vacancies container, which will then be used to add the element to the page.
    vacanciesContainer.appendChild(vacancyDiv);
  }
}

//This function creates the vacancy details element to be shown on the page when a job title is clicked. 
function createVacancyElement(vacancy) {
  //Creates a new element for the vacancy details to be stored.
  const vacancyDiv = document.createElement("details");
  vacancyDiv.className = "vacancy";

  //Creates a new element for the vacancy summary to be stored.
  const summary = document.createElement("summary");
  summary.innerHTML = '<div class="job-title-box">' + vacancy.title + '</div>';
  //Appends the new summary element to the details element.
  vacancyDiv.appendChild(summary);

  // Adds an event listener so when the job vacancy is clicked the vacancyInformation function is called.
  summary.addEventListener("click", function () {
    showSelectedVacancyAndJobInfo(vacancy);
  });

  return vacancyDiv;
}

//This function provides the functionallity behind the additional general information about the job vacancy. 
function showSelectedVacancyAndJobInfo(vacancy) {
  //Take the job searched, and encodes for urls. Then it adds it onto the api endpoint url for the second request.
  const jobTitle = encodeURIComponent(vacancy.title);
  const secondApiUrl = "http://api.lmiforall.org.uk/api/v1/soc/search?q=" + jobTitle;
  //Fetch the data from the api.
  fetch(secondApiUrl)
  //Converts the fetched data into json format.
    .then(function (response) {
      return response.json();
    })
    //This checks to see if there is more than 0 elements in the array, before continuing. 
    .then(function (jobInfo) {
      if (jobInfo.length > 0) {
        const jobDetails = jobInfo[0];
        const jobInfoContainer = document.getElementById("job-info-container");

        //This creates the HTML layout for the general information about the vacancies on the webpage.
        jobInfoContainer.innerHTML = 
          "<p><strong>General Information about this type of job:</strong></p>" +
          "<p><b>Title:</b> " + jobDetails.title + "</p>" +
          "<p><b>Description:</b> " + jobDetails.description + "</p>" +
          "<p><b>Tasks:</b> " + jobDetails.tasks + "</p>" +
          "<p><a href='" + vacancy.link + "' target='_blank'>Link to the job posting</a></p>";
      }
    });
}
