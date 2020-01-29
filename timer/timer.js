class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.durationInput.addEventListener('click', this.changeDuration);
    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  //////////////////////////////////////////////////////////////
  // Use arrow functions to make sure "this" is the Timer class
  //////////////////////////////////////////////////////////////

  changeDuration = () => {
    console.log('Time to change the duration!');
    console.log(this);
  }
  
  start = () => {
    // Invoke callback if defined
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    // Call tick() manually to start
    this.tick();
    // Then setup an interval to call tick() every second
    this.intervalId = setInterval(this.tick, 50);
  }
  
  pause = () => {
    clearInterval(this.intervalId);
  }

  tick = () => {
    // Stop the timer when it reaches 0
    if (this.timeRemaining === 0) {
      if (this.onComplete) {
        this.onComplete();
      }
      this.pause();
    } else {
      // Subtract 1 second using the getter/setter defined below
      this.timeRemaining = this.timeRemaining - .05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  }

  // Get/set timeRemaining
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
