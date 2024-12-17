const backgroundSound = new Audio('./assets/sounds/background.mp3');
const successSound = new Audio('./assets/sounds/success.mp3');
const failSound = new Audio('./assets/sounds/fail.mp3');
const windSound = new Audio('./assets/sounds/win.mp3');
const loseSound = new Audio('./assets/sounds/lose.mp3');
function playBackgroundSound() {
    backgroundSound.loop = true;
    backgroundSound.play();
}

function stopBackgroundSound() {
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
}

function playSuccessSound() {    
    successSound.currentTime = 0;
    successSound.play();
}

function playFailSound() {
    failSound.currentTime = 0;
    failSound.play();
}

function playWindSound() {
    windSound.currentTime = 0;
    windSound.play();
}

function playLoseSound() {
    loseSound.currentTime = 0;
    loseSound.play();
}

export { playBackgroundSound, stopBackgroundSound, playSuccessSound, playFailSound, playWindSound, playLoseSound };