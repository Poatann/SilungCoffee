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

 
  rightBtn.addEventListener('click', () => {
    position += imageWidth;
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${position}px)`;

    if (position >= (imageWidth * images.length)) {
      setTimeout(() => {
        track.style.transition = 'none';
        position = 0;
        track.style.transform = `translateX(-${position}px)`;
      }, 300);
    }
  });

  
  leftBtn.addEventListener('click', () => {
    position -= imageWidth;
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${position}px)`;

    if (position < 0) {
      setTimeout(() => {
        track.style.transition = 'none';
        position = imageWidth * (images.length - 1);
        track.style.transform = `translateX(-${position}px)`;
      }, 300);
    }
  });

  
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

  
  const videoTrack = document.querySelector('.videos-track');
  const videoLeftBtn = document.querySelector('.video-btn.left');
  const videoRightBtn = document.querySelector('.video-btn.right');
  const videoWidth = 320;
  const videoItems = Array.from(videoTrack.children);

  let videoPosition = 0;

 
  videoItems.forEach(vid => {
    const clone = vid.cloneNode(true);
    
    if (clone.tagName === 'VIDEO') {
      clone.pause();
      clone.currentTime = 0;
    }
    videoTrack.appendChild(clone);
  });

  //loop rght
  videoRightBtn.addEventListener('click', () => {
    videoPosition += videoWidth;
    videoTrack.style.transition = 'transform 0.3s ease';
    videoTrack.style.transform = `translateX(-${videoPosition}px)`;

    if (videoPosition >= (videoWidth * videoItems.length)) {
      setTimeout(() => {
        videoTrack.style.transition = 'none';
        videoPosition = 0;
        videoTrack.style.transform = `translateX(-${videoPosition}px)`;
      }, 300);
    }
  });

  //loop lft
  videoLeftBtn.addEventListener('click', () => {
    videoPosition -= videoWidth;
    videoTrack.style.transition = 'transform 0.3s ease';
    videoTrack.style.transform = `translateX(-${videoPosition}px)`;

    if (videoPosition < 0) {
      setTimeout(() => {
        videoTrack.style.transition = 'none';
        videoPosition = videoWidth * (videoItems.length - 1);
        videoTrack.style.transform = `translateX(-${videoPosition}px)`;
      }, 300);
    }
  });

  // Pause other videos when one is played
  const allVideos = document.querySelectorAll('.videos-track video');
  allVideos.forEach(video => {
    video.addEventListener('play', () => {
      allVideos.forEach(v => {
        if (v !== video) {
          v.pause();
        }
      });
    });
  });
});
