import { ANSWERS, TIME_LIMIT } from './constants.js';
import { playFailSound, playSuccessSound } from './sound.js';
import { makeElementInvisible, makeElementVisible } from './utils.js';

class Game {
    #timerCount;
    #timerId;
    #currentStage;
    #answer;
    #problemText;

    hangmanElements = document.querySelectorAll(".canvas > img");
    timerElement = document.getElementById('timer');
    problemTextElement = document.getElementById('problemText');
    answerTextElement = document.getElementById('answerText');
    alphabetBtnElements = document.querySelectorAll('.alphabets > button')
    alphabetEventListeners = [];

    constructor() {
        this.#timerCount = TIME_LIMIT;
        this.#currentStage = 0;
        this.#answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
        console.log(this.#answer); 
        this.#problemText = this.#answer.split('').map(cur => (cur === " " ? " " : "_")).join('');

        this.timerElement.innerText = this.#timerCount;
        this.problemTextElement.innerText = this.#problemText;
        makeElementVisible(this.problemTextElement);
        this.answerTextElement.innerText = `정답: ${this.#answer}`;
        makeElementInvisible(this.answerTextElement);

        return new Promise((resolve) => {
            this.#timerId = setInterval(() => {
                if (this.#timerCount <= 0) resolve(false);
                else this.#decreaseTimerCount();
            }, 1000);

            this.alphabetBtnElements.forEach((e) => {
                const onClick = () => {
                    this.#clickAlphabet(e, resolve);
                    e.removeEventListener('click', onClick);
                }
                this.alphabetEventListeners.push(onClick);
                e.addEventListener('click', onClick);
            })
        }).then(this.#gameOver);
    }

    #clickAlphabet = (e, resolve) => {
        e.classList.add('btn-invisible');
        e.removeEventListener('click', () => this.#clickAlphabet(e, resolve));

        if (this.#answer.includes(e.innerText)) {
            playSuccessSound();
            this.#updateProblemText(e.innerText);
            if (this.#problemText == this.#answer) resolve(true);
        } else {
            playFailSound();
            if (this.#currentStage < this.hangmanElements.length - 1) this.#nextStage();
            else resolve(false);
        }
    };

    #decreaseTimerCount() {
        this.#timerCount -= 1;
        this.timerElement.innerText = this.#timerCount;
    }

    #nextStage() {
        this.#currentStage += 1;
        Array.from(this.hangmanElements).slice(0, this.#currentStage).forEach((e)=> e.classList.remove('invisible'))
    }

    #updateProblemText(newAlphabet) {
        this.#problemText = this.#problemText.split('').map((cur, index) => {
            if (cur === ' ' || cur !== '_') return cur;
            return this.#answer[index] === newAlphabet ? newAlphabet : '_';
        }).join('');
        this.problemTextElement.innerText = this.#problemText;
    }

    #gameOver = (result) => {
        clearInterval(this.#timerId);
        makeElementVisible(this.answerTextElement);

        this.hangmanElements.forEach((e) => e.classList.add('invisible'));
        makeElementInvisible(this.problemTextElement);
        this.alphabetBtnElements.forEach((e, index) => {
            e.classList.remove("btn-invisible");
            e.removeEventListener('click', this.alphabetEventListeners[index]);
        });

        return result;
    }
}

export default Game;