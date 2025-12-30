document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const playPauseBtn = document.getElementById("playPause");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  const playerImg = document.querySelector(".player-left img");
  const playerTitle = document.querySelector(".player-left h4");
  const progressContainer = document.querySelector(".progress-container");
const progressBg = document.querySelector(".progress-bg");
const progressFill = document.querySelector(".progress-fill");
const progressThumb = document.querySelector(".progress-thumb");

function updateProgressUI() {
  if (!currentAudio || !currentAudio.duration) return;

  const percent =
    (currentAudio.currentTime / currentAudio.duration) * 100;

  progressFill.style.width = percent + "%";
  progressThumb.style.left = percent + "%";
}

// Update every frame
setInterval(updateProgressUI, 300);

// Click to seek
progressContainer.addEventListener("click", (e) => {
  if (!currentAudio) return;

  const rect = progressBg.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;

  currentAudio.currentTime = percent * currentAudio.duration;
});


  let currentAudio = null;
  let isPlaying = false;

  // Format time (mm:ss)
  function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }

  // Stop currently playing audio
  function stopCurrentAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  }

  // Play selected card
  function playCard(card) {
    const audio = card.querySelector("audio");
    const title = card.dataset.title;
    const img = card.dataset.img;

    if (currentAudio !== audio) {
      stopCurrentAudio();
      currentAudio = audio;
    }

    currentAudio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";

    playerTitle.textContent = title;
    playerImg.src = img;

    // Update duration when metadata loads
    currentAudio.onloadedmetadata = () => {
      durationEl.textContent = formatTime(currentAudio.duration);
    };
  }

  // Update progress bar
  function updateProgress() {
    if (!currentAudio || !currentAudio.duration) return;

    const percent =
      (currentAudio.currentTime / currentAudio.duration) * 100;
    progressFill.style.width = percent + "%";
    currentTimeEl.textContent = formatTime(currentAudio.currentTime);
  }

  // Card play buttons
  cards.forEach((card) => {
    const btn = card.querySelector(".play-btn");

    btn.addEventListener("click", () => {
      playCard(card);
    });
  });

  // Bottom play / pause
  playPauseBtn.addEventListener("click", () => {
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
      playPauseBtn.textContent = "▶";
    } else {
      currentAudio.play();
      playPauseBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
  });

  // Progress update interval
  setInterval(updateProgress, 500);
});
