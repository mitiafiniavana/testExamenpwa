const container = document.getElementById("root");
const moviename = document.getElementById("query");
const search = document.getElementsByClassName("btn")[2];
const spinner = document.getElementById("spinner");
const formulaire = document.getElementById("formulaire");
const keyValue = document.getElementById("keyValue");
const checkKey = document.getElementById("checkKey");
const remove = document.getElementById("remove");
const wrapper = document.getElementById("wrap");

var API_KEY=""
// var API_KEY="f91017a8a042da0d3b251a9187da7f97"
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTEwMTdhOGEwNDJkYTBkM2IyNTFhOTE4N2RhN2Y5NyIsInN1YiI6IjY1MzRiYmM0YzhhNWFjMDBlMmI3MDQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmIpDTzM8iPA7irTZ1HjUs2fzT4tHweFnH_Bi777ws8'
  }
};
remove.addEventListener('click', async () => {
  localStorage.removeItem("apikey");
  wrapper.style.display = "none";
  formulaire.style.display = "flex"
})

checkKey.addEventListener('click', async () => {
  // checkKey.style.display = "none"; // Disable the search button
  spinner.style.display = "block"; // Show the spinner
  fetch(`https://api.themoviedb.org/3/search/movie?query=d&api_key=${keyValue.value}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      spinner.style.display = "none"; // hide the spinner
      if(json.status_code === 7){
        alert(json.status_message)
        confirm("Essayer ça: f91017a8a042da0d3b251a9187da7f97")
      }
      if(json.results){
        localStorage.setItem('apikey', keyValue.value)
        window.location.reload();
        // wrapper.style.display = "flex",
        formulaire.style.display = "none"
      }
    })
    .catch(err => {
      spinner.style.display = "none"; // hide the spinner
      console.error('error:' + err)
    });
})

search.addEventListener('click', async () => {
  search.style.display = "none"; // Disable the search button
  spinner.style.display = "block"; // Show the spinner
  let output = "";
  if(moviename.value !== ""){
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${moviename.value}&api_key=${API_KEY}`)
    .then(res => {
      if(!res.ok){
        return [];
      }
      return res.json();
    })
      spinner.style.display = "none"; // Show the spinner
      search.style.display = "inline"; // Re-enable the search button
      data?.results.map((movie) =>
      (output += `
        <div class="col">
          <div class="card">
            <a class="card-media" href="https://image.tmdb.org/t/p/w500${movie?.poster_path}">
              <img src="https://image.tmdb.org/t/p/w500${movie?.poster_path}" alt="No image" width="100%" />
            </a>
            <div class="card-content">
              <div class="card-cont-header">
                <div class="cont-left">
                  <h3 style="font-weight: 600">${movie?.original_title}</h3>
                  <span style="color: #12efec">${movie?.release_date}</span>
                </div>
              </div>
              <div class="describe">
                ${movie?.overview}
              </div>
            </div>
          </div>
        </div>
      `)
    );
    container.innerHTML = output;
  }
  else{
    spinner.style.display = "none"; // Show the spinner
    search.style.display = "inline"; // Re-enable the search button
    alert("Champ de recherche vide")
  }
})

function getApiKey(){
  const apikey = localStorage.getItem('apikey')
  console.log(apikey)
  if(apikey){
    API_KEY = apikey;
    formulaire.style.display = "none";
    wrapper.style.display = "flex";
  }
}
document.addEventListener("DOMContentLoaded", getApiKey);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
