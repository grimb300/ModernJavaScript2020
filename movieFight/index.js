const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'ae10b35e',
      s: searchTerm
    }
  });

  // If Error response, return empty array
  if (response.data.Error) return [];
  // Else return the Search results
  return response.data.Search;
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
  const movies = await fetchData(event.target.value);

  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const option = document.createElement('a');

    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" />
      ${movie.Title} 
    `;

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener('input', debounce(onInput, 1000));