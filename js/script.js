document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.gallery-track');
  const leftBtn = document.querySelector('.gallery-btn.left');
  const rightBtn = document.querySelector('.gallery-btn.right');
  const images = Array.from(track.children);

  let position = 0;
  const imageWidth = 310; // Adjust according to your actual image width + margin/padding

  // Duplicate images for infinite scrolling effect
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  // Scroll Left
  leftBtn.addEventListener('click', () => {
    position -= imageWidth;
    if (position < 0) {
      position = (track.scrollWidth / 2) - imageWidth;
    }
    track.style.transform = `translateX(-${position}px)`;
  });

  // Scroll Right
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

  // Hide overlay on click
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlayImg.src = '';
  });

  // Show overlay on image click
  document.querySelectorAll('.gallery-track img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      overlayImg.src = img.src;
      overlay.style.display = 'flex';
    });
  });
});

