import { ATTEMPTS } from './constants.js';
import { makeElementVisible, makeElementInvisible } from './utils.js';
import Game from './game.js';
import { playBackgroundSound, playLoseSound, playWindSound, stopBackgroundSound } from './sound.js';

class System {
    #count;

    triesElement = document.getElementById('tries');
    startTextElement = document.getElementById('startText');
    failTextElement = document.getElementById('failText');
    successTextElement = document.getElementById('successText');
    overTextElement = document.getElementById('overText');
    startBtnElement = document.getElementById('startBtn');
    restartBtnElement = document.getElementById('restartBtn');
    resetBtnElement = document.getElementById('resetBtn');

    constructor() {
        this.#count = ATTEMPTS;
        this.triesElement.innerText = this.#count;
        makeElementVisible(this.startTextElement);
        this.startBtnElement.addEventListener("click", this.#start);
        this.restartBtnElement.addEventListener('click', this.#restart);
    }

    #decreaseCount = () => { 
        this.#count -= 1;
        this.triesElement.innerText = this.#count;
    }

    #gameStart = async () => {
        this.#decreaseCount();
        const result = await new Game();

        stopBackgroundSound();
        
        if (result) {
            playWindSound();
            makeElementVisible(this.successTextElement);
        } else {
            playLoseSound();
            if (this.#count > 0) makeElementVisible(this.failTextElement);
            else makeElementVisible(this.overTextElement);
        }
    }

    #start = () => {
        makeElementInvisible(this.startTextElement);
        playBackgroundSound();
        this.#gameStart();
    }

    #restart = () => {
        makeElementInvisible(this.failTextElement);
        playBackgroundSound();
        this.#gameStart();
    }

    cleanup() {
        this.triesElement.innerText = ATTEMPTS;
        this.startBtnElement.removeEventListener('click', this.#start);
        this.restartBtnElement.removeEventListener('click', this.#restart);
        makeElementInvisible(this.successTextElement);
        makeElementInvisible(this.overTextElement);
    }
}

export default System;