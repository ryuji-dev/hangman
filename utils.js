export const makeElementVisible = (e) => {
    e.classList.add('flex-visible');
    e.classList.remove('invisible');
}

export const makeElementInvisible = (e) => {
    e.classList.remove('flex-visible');
    e.classList.add('invisible');
}