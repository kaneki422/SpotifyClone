console.log("Song cards found:", document.querySelectorAll(".song-card").length);


const cards = document.querySelectorAll(".song-card");

const nowPlaying = document.getElementById("nowPlaying");
const npTitle = document.getElementById("np-title");
const npArtist = document.getElementById("np-artist");
const npImage = document.getElementById("np-image");
const playBtn = document.getElementById("play");
const progress = document.getElementById("np-progress");

let currentIndex = null;
let audios = [];

cards.forEach((card, index) => {
  const audio = card.querySelector("audio");
  const title = card.querySelector("h3").textContent;
  const artist = card.querySelector("p").textContent;
  const image = card.querySelector("img").src;
  const playCardBtn = card.querySelector(".card-play");

  audios.push({ audio, title, artist, image });

  playCardBtn.addEventListener("click", () => {
  console.log("Clicked:", title);
    currentIndex = index;
    loadSong();
    playSong();
    nowPlaying.classList.remove("hidden");
  });
});

function loadSong() {
  audios.forEach(s => {
    s.audio.pause();
    s.audio.currentTime = 0;
  });

  const song = audios[currentIndex];
  npTitle.textContent = song.title;
  npArtist.textContent = song.artist;
  npImage.src = song.image;
}

function playSong() {
  const song = audios[currentIndex];
  song.audio.play();
  playBtn.textContent = "❚❚";
}

function pauseSong() {
  audios[currentIndex].audio.pause();
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  const audio = audios[currentIndex].audio;
  audio.paused ? playSong() : pauseSong();
});

// Progress bar
setInterval(() => {
  if (currentIndex === null) return;
  const audio = audios[currentIndex].audio;
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;
}, 300);

progress.addEventListener("input", () => {
  if (currentIndex === null) return;
  const audio = audios[currentIndex].audio;
  audio.currentTime = (progress.value / 100) * audio.duration;
});
