const dimmer = document.getElementById('dimmer');
const tela = document.getElementById('tela');
dimmer.addEventListener('input', () => {
    const valor = dimmer.value;
    const opacidade = 1 - valor / 100;
    tela.style.opacity = opacidade;
});