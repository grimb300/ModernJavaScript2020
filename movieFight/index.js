const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
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
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  }
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  }
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'ae10b35e',
      i: movie.imdbID
    }
  });

  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = parseFloat(leftStat.dataset.value);
    const rightSideValue = parseFloat(rightStat.dataset.value);

    if (rightSideValue > leftSideValue) {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    } else if (leftSideValue > rightSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    }
  });
};

const cleanNumber = (num) => {
  // Remove dollar signs ($) and commas (,) 
  const rawNum = num.replace(/\$/g, '').replace(/,/g, '');
  // Convert to a float
  const returnNum = parseFloat(rawNum);
  // Return the number, or 0 if Nan
  return isNaN(returnNum) ? 0 : returnNum;
}

const movieTemplate = (movieDetail) => {
  const imgSrc = movieDetail.Poster === 'N/A' ? '' : movieDetail.Poster;
  const boxOffice = cleanNumber(movieDetail.BoxOffice);
  const metascore = cleanNumber(movieDetail.Metascore);
  const imdbRating = cleanNumber(movieDetail.imdbRating);
  const imdbVotes = cleanNumber(movieDetail.imdbVotes);
  // For the awards, add up all the numbers in the string (not perfect)
  const numAwards = movieDetail.Awards.split(' ').reduce((total, currWord) => {
    const value = parseInt(currWord)
    if (isNaN(value)) {
      return total;
    } else {
      return total + value;
    }
  }, 0);

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${imgSrc}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value=${numAwards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${boxOffice} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};