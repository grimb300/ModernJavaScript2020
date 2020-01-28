// Alternative to load event
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    runApp();
  }
}

function runApp () {
	// Get handles to the sprites
	const player = document.querySelector('#player');
	const coin = document.querySelector('#coin');
	
	// Setup necessary dimensional constants
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;
	const windowBuffer = 50;
	const playerHeight = player.getBoundingClientRect().height;
	const playerWidth = player.getBoundingClientRect().width;
	const playerMovement = 50;
	const playerMaxY = windowHeight - windowBuffer - playerHeight;
	const playerMaxX = windowWidth - windowBuffer - playerWidth;
	const coinHeight = coin.getBoundingClientRect().height;
	const coinWidth = coin.getBoundingClientRect().width;
	
	// console.log(`Window is ${windowWidth}, ${windowHeight}`);
	// console.log(`Player is ${playerWidth}, ${playerHeight}`);
	
	// Function to randomize the position of the coin
	const moveCoin = () => {
		// Keep it within the window buffer
		const newX = windowBuffer + Math.floor(Math.random() * (windowWidth - (windowBuffer * 2) - coinWidth));
		const newY = windowBuffer + Math.floor(Math.random() * (windowHeight - (windowBuffer * 2) - coinHeight));
		coin.style.top = `${newY}px`;
		coin.style.left = `${newX}px`;
	};

	// Initialize the positions of the coin and player
	player.style.top = `${windowBuffer}px`;
	player.style.left = `${windowBuffer}px`;
	moveCoin();

	
	// Helper function to take a position string (ex: '50px') and return the integer value (ex: 50)
	const getPos = (str) => parseInt(str.slice(0,-2));
	
	// Add event listener for an arrow key press
	window.addEventListener('keyup', function(e) {
		// Do something only if it was an 'Arrow' key
		if (e.key.startsWith('Arrow')) {
			// Get the current player position and initialize the new position to be the same
			const currX = getPos(player.style.left);
			const currY = getPos(player.style.top);
			let newX = currX;
			let newY = currY;
			// this.console.log(`${e.key}: Player at ${currX}, ${currY}`);
	
			// Update new coordinates based on which arrow was pressed
			// Older browsers are just Down, Up, Right, Left
			switch (e.key) {
				case 'ArrowDown':
				case 'Down':
					newY += playerMovement;
					break;
				case 'ArrowUp':
				case 'Up':
					newY -= playerMovement;
					break;
				case 'ArrowRight':
				case 'Right':
					newX += playerMovement;
					player.style.transform = 'scale(1,1)'; // Face right (default)
					break;
				case 'ArrowLeft':
				case 'Left':
					newX -= playerMovement;
					player.style.transform = 'scale(-1,1)'; // Face left
					break;
			}
	
			// Move the player to the new coordinates (keeping it in the window)
			newX = (newX < windowBuffer) ? windowBuffer : newX;
			newX = (newX > playerMaxX) ? playerMaxX : newX;
			newY = (newY < windowBuffer) ? windowBuffer : newY;
			newY = (newY > playerMaxY) ? playerMaxY : newY;
			player.style.left = `${newX}px`;
			player.style.top = `${newY}px`;

			// Do stuff if the player reaches the coin
			if(isTouching(player, coin)) {
				// console.log('Stop touching me!!!!!');
				moveCoin();
			}
		
			// this.console.log(`Player now at ${player.style.left}, ${player.style.top}`)
		}
	});
	
	// Collision detection function provided by the tutorial
	function isTouching(a, b) {
		const aRect = a.getBoundingClientRect();
		const bRect = b.getBoundingClientRect();
	
		return !(
			aRect.top + aRect.height < bRect.top ||
			aRect.top > bRect.top + bRect.height ||
			aRect.left + aRect.width < bRect.left ||
			aRect.left > bRect.left + bRect.width
		);
	}
	
	// Calculate the max/min X/Y position of each image
	// Creating a buffer of 50px around the edge of the window
	const maxPlayerX = windowWidth - windowBuffer - playerWidth;
	const maxPlayerY = windowHeight - windowBuffer - playerHeight;
	const maxCoinX = windowWidth - windowBuffer - coinWidth;
	const maxCoinY = windowHeight - windowBuffer - coinHeight;
	
	
	
	// Loop the game forever
	// while(true) {
	
	// }
}