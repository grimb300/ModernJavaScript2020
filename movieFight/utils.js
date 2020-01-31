// Generic debounce function
const debounce = (func, delay = 1000) => {
  let timeoutId;
  // Return a function with optional arguments "args"
  return (...args) => {
    // If timeout has been set, clear it
    if (timeoutId) clearTimeout(timeoutId);

    // Create a new 1 second timeout for the callback function applying the optional "args"
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};