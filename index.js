import System from './system.js';
import { makeElementInvisible } from './utils.js';

window.addEventListener('DOMContentLoaded', () => {
    const resetBtnElements = document.getElementsByClassName('reset-btn')
    const answerTextElement = document.getElementById('answerText');
    let currentSystem = new System();

    Array.from(resetBtnElements).forEach((e) => {
        e.addEventListener('click', () => {
            currentSystem.cleanup();
            makeElementInvisible(answerTextElement)
            currentSystem = new System();
        })
    })
})