// If the location url contains a hash value, decode the message
if (location.hash) {
  // Hide message-form and unhide decoded-form
  document.querySelector('#message-form').classList.add('hide');
  document.querySelector('#decoded-form').classList.remove('hide');

  // Decode the hash, making sure the leading '#' is removed
  const decodedMessage = atob(location.hash.replace('#', ''));

  // Display the message
  document.querySelector('#decoded-form h1').innerHTML = decodedMessage;
}

// Add event listener to the submit button
document.querySelector('form').addEventListener('submit', (event) => {
  // Suppress the default behavior
  event.preventDefault();

  // Grab the message to encode
  const messageInput = document.querySelector('#message-input');

  // Convert from ascii to base64
  const encodedMessage = btoa(messageInput.value);

  // Hide the message card and unhide the link card
  document.querySelector('#message-form').classList.add('hide');
  document.querySelector('#link-form').classList.remove('hide');

  // Display the link
  const linkInput = document.querySelector('#link-input');
  linkInput.value = `${window.location}#${encodedMessage}`;
  linkInput.select();
});
