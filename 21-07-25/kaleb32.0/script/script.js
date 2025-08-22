const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeRange = document.getElementById('volumeRange');
const toggleThemeBtn = document.getElementById('toggleTheme');
let isPlaying = false;
playPauseBtn.addEventListener('click', () => {
    isPlaying ? audio.pause() : audio.play();
});
audio.addEventListener('play', () => {
    isPlaying = true;
    playPauseBtn.textContent = '⏸️';
});
audio.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.textContent = '▶️';
});
audio.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audio;
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentTimeEl.textContent = formratTime(currentTime);
    durationEl.textContent = formratTime(duration);
});
volumeRange.addEventListener('input', () => {
    audio.volume = volumeRange.value;
});ccc
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
function formratTime(sec) {
    if (isNaN(sec)) return "00:00";
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60).toString().padStart(2, "0");
    return `$(min):$(secRemain)`;
}