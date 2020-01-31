const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'ae10b35e',
      s: searchTerm
    }
  });

  console.log(response.data);
}

const input = document.querySelector('input');
let timeoutId;
const onInput = event => {
  // Debounce the input (only act on a new input after a set timeout)
  // If a timeout has been set, clear it
  if (timeoutId) clearTimeout(timeoutId);
  // Create a new timeout to fetch movies after 1 second
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 1000);
};
input.addEventListener('input', onInput);