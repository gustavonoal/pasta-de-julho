const ICONS = {
    play: '<span class="material-icons">play_arrow</span>',
    pause: '<span class="material-icons">pause</span>',
    mute: '<span class="material-icons">volume_off</span>',
    low: '<span class="material-icons">volume_down</span>',
    high: '<span class="material-icons">volume_up</span>',
    fullscreen: '<span class="material-icons">fullscreen</span>',
    exitFullscreen: '<span class="material-icons">fullscreen_exit</span>',
};

const setIcon = (el, icon) => el.innerHTML = ICONS[icon];

const videoPlayerContainer = document.querySelector('.video-player-container');
const video = document.querySelector('.main-video');
const playPauseButton = document.querySelector('.play-pause-button');
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');
const volumeButton = document.querySelector('.volume-button');
const volumeSlider = document.querySelector('.volume-slider');
const fullscreenButton = document.querySelector('.fullscreen-button');

const setVolumeIcon = v => setIcon(volumeButton, v === 0 ? 'mute' : v < 0.5 ? 'low' : 'high');
const setPlayPauseIcon = paused => setIcon(playPauseButton, paused ? 'play' : 'pause');
const setFullscreenIcon = full => setIcon(fullscreenButton, full ? 'exitFullscreen' : 'fullscreen');

const formatTime = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

const updateProgress = () => {
    progressBar.value = video.currentTime;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
};

video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
    progressBar.max = video.duration;
    updateProgress();
});

video.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('input', () => {
    video.currentTime = progressBar.value;
});

const togglePlay = () => {
    if (video.paused || video.ended) {
        video.play();
        setPlayPauseIcon(false);
    } else {
        video.pause();
        setPlayPauseIcon(true);
    }
};

playPauseButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    setVolumeIcon(video.volume);
});

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoPlayerContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    setFullscreenIcon(!!document.fullscreenElement);
});

// Inicialização
setPlayPauseIcon(true);
setVolumeIcon(video.volume);
setFullscreenIcon(false);