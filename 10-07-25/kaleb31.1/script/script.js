const btn = document.getElementById('adicionar-Degrau');
const escada = document.getElementById('escada');
let degraus = 0;
const cores = [ '#4caf50', '#2196f3', '#ff9800', '#9c2780', '#f44336', '#3f51f5', '#3f51f5', '#00bcd4', '#e91e63'];
btn.addEventListener('click', () => {
    const degrau = document.createElement('div');
    degrau.classList.add('degrau');
    const translateX = degraus * 20;
    const translateY = -degraus * 20;
    degrau.style.transform = `translate(${translateX}px, ${translateY}px)`;
    const cor = cores[degraus % cores.length];
    degrau.style.background = cor;
    escada.appendChild(degrau);
    degraus++;
});