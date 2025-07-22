document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.gallery-track');
  const leftBtn = document.querySelector('.gallery-btn.left');
  const rightBtn = document.querySelector('.gallery-btn.right');
  const images = Array.from(track.children);

  let position = 0;
  const imageWidth = 310;

  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  leftBtn.addEventListener('click', () => {
    position -= imageWidth;
    if (position < 0) {
      position = (track.scrollWidth / 2) - imageWidth;
    }
    track.style.transform = `translateX(-${position}px)`;
  });

  rightBtn.addEventListener('click', () => {
    position += imageWidth;
    if (position >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(-${position}px)`;
  });

  // Zoom Overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.9)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.cursor = 'zoom-out';
  overlay.style.display = 'none';

  const overlayImg = document.createElement('img');
  overlayImg.style.maxWidth = '90%';
  overlayImg.style.maxHeight = '90%';
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlayImg.src = '';
  });

  document.querySelectorAll('.gallery-track img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      overlayImg.src = img.src;
      overlay.style.display = 'flex';
    });
  });

  // Pause other videos when one is played
  const videos = document.querySelectorAll('.videos-track video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(v => {
        if (v !== video) {
          v.pause();
        }
      });
    });
  });

  // Video scrolling
  const videoTrack = document.querySelector('.videos-track');
  const videoLeftBtn = document.querySelector('.video-btn.left');
  const videoRightBtn = document.querySelector('.video-btn.right');
  const videoWidth = 320; // Adjusted for margin

  let videoPosition = 0;

  videoLeftBtn.addEventListener('click', () => {
    videoPosition -= videoWidth;
    if (videoPosition < 0) {
      videoPosition = 0;
    }
    videoTrack.style.transform = `translateX(-${videoPosition}px)`;
  });

  videoRightBtn.addEventListener('click', () => {
    const maxScroll = videoTrack.scrollWidth - videoTrack.clientWidth;
    videoPosition += videoWidth;
    if (videoPosition > maxScroll) {
      videoPosition = maxScroll;
    }
    videoTrack.style.transform = `translateX(-${videoPosition}px)`;
  });
});
