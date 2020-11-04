
// fetch(url)
//     .then(receive the response and parse it into a JSON (hash in javascript))
//     .then(call this json data and do something with this data)

const buildHTMLFrom = (movie) => {
  const title = movie.Title
  const poster = movie.Poster
  const html = `
  <li>
  <p>${title}</p>
  <img src="${poster}">
  </li>
  `;
  
  return html;
}

const fetchApiAndUpdateDOM = (movieName) => {
  const url = `http://www.omdbapi.com/?s=${movieName}&apikey=adf1f2d7`
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const movies = data.Search;
      
      // for each movie
      movies.forEach((movie) => {
        // we will build an HTML element
        const movieHTML = buildHTMLFrom(movie);
        // Insert this movie HTML element into the DOM (<ul>)
        const list = document.getElementById('results');
        list.insertAdjacentHTML('beforeend', movieHTML);
      });
    });
};

// we want to fetch the api when the user submits the form
const form = document.querySelector('form#search-movies');


// ONLY HAPPENS ON FORMS
form.addEventListener('submit', (event) => {
  // the default behavior of the submit event is to reload the page
  event.preventDefault();
  
  // take the text that the user inputted
  // const input = event.currentTarget.querySelector('input#keyword');
  const input = form.querySelector('input#keyword');
  const movieName = input.value;

  // before fetching the api, we have to empty the <ul>
  const ul = document.querySelector('ul#results');
  ul.innerHTML = '';

  // fetch the api with that text
  fetchApiAndUpdateDOM(movieName);
});