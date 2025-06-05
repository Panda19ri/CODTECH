let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '400',
    width: '100%',
    videoId: 'UB1O30fR-EE', // replace with any YouTube video ID
    events: {
      onReady: initializeProgressTracking,
      onStateChange: handleStateChange
    }
  });
}

let interval;
function initializeProgressTracking() {
  const range = document.getElementById("progressRange");
  const label = document.getElementById("progressValue");

  interval = setInterval(() => {
    if (player && player.getDuration) {
      const duration = player.getDuration();
      const currentTime = player.getCurrentTime();
      const percent = ((currentTime / duration) * 100).toFixed(0);

      range.value = percent;
      label.textContent = `${percent}%`;
    }
  }, 1000);
}

function handleStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    clearInterval(interval);
    document.getElementById("progressValue").textContent = "100% ✅ Completed!";
  }
}
