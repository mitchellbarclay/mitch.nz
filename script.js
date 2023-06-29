const headerInner = document.querySelector('.header-inner');
const header = document.querySelector('#header');
const noisy = document.querySelector('.noisy');

const video = document.getElementById('myVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const overlay = document.getElementById('playPauseOverlay');
const seekBar = document.getElementById('seekBar');
const videoSection = document.getElementById('videoSection');
const videoHeading = document.getElementById('vidz');
const navbarBG = document.getElementById('navbarBG');
const navbar = document.getElementById('navbarNav');
const imageContainer = document.querySelector('.image-container');
const panImage = document.querySelector('.pan-image');
const footer = document.querySelector('#footer');
const footerInner = document.querySelector('.footer-inner');

const fakeBrowser = document.getElementById('fakeBrowser');
const expandButton = document.getElementById('expandButton');
const webContainer = document.querySelector('.web-container');
const initialPosition = fakeBrowser.style.position;
const initialMaxHeight = webContainer.style.maxHeight;

let timeoutId;
let isDraggingSeekBar = false;

         
let isExpanded = false; // New variable to track expansion state

/*_____ web switcher _____*/

expandButton.addEventListener('click', function() {
  if (!isExpanded) { // Only expand if not already expanded
    fakeBrowser.style.position = 'fixed';
    fakeBrowser.style.top = '-48px';
    fakeBrowser.style.left = '0';
    fakeBrowser.style.width = '100%';
    fakeBrowser.style.height = '100vh';
    fakeBrowser.style.zIndex = '9999';
    fakeBrowser.style.padding = '0';

    // Update the max-height of the .web-container class
    webContainer.style.maxHeight = '100vh';

    isExpanded = true; // Set expansion state
  } else { // Collapse if already expanded
    fakeBrowser.style.position = initialPosition;
    fakeBrowser.style.top = '';
    fakeBrowser.style.left = '';
    fakeBrowser.style.width = '';
    fakeBrowser.style.height = '';
    fakeBrowser.style.zIndex = '';

    // Restore the initial max-height of the .web-container class
    webContainer.style.maxHeight = initialMaxHeight;

    isExpanded = false; // Reset expansion state
  }
});

var selectableElements = document.querySelectorAll('.list-group-item');
selectableElements.forEach(function(element) {
  element.addEventListener('click', function() {
    var targetId = this.getAttribute('data-target');
    var targetElement = document.querySelector(targetId);

    // Only switch if not already expanded or clicking the same button
    if (!isExpanded || targetElement.style.display === 'none') {
      var contentElements = document.querySelectorAll('[id^="web"]');
      contentElements.forEach(function(element) {
        element.style.display = 'none';
      });

      targetElement.style.display = 'block';

      selectableElements.forEach(function(element) {
        element.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});


/*_____ Footer _____*/


window.addEventListener('scroll', updateFooterPosition);

function togglePlayPause(event) {
  if (event.target !== seekBar) {
    if (video.paused) {
      video.play();
      playPauseBtn.classList.add('playing');
      playPauseBtn.querySelector('i').textContent = 'pause';
      overlay.classList.add('overlay-play');
      overlay.classList.remove('overlay-pause');
      seekBar.style.display = 'block';

      // check if user is on mobile device
      if (!/Mobi/.test(navigator.userAgent)) {
        videoSection.classList.add('dark-mode');
        videoHeading.classList.add('dark-mode');
        navbarBG.classList.add('dark-mode');
        navbar.classList.add('dark-mode');
      }
    } else {
      video.pause();
      playPauseBtn.classList.remove('playing');
      playPauseBtn.querySelector('i').textContent = 'play_arrow';
      overlay.classList.remove('overlay-play');
      overlay.classList.add('overlay-pause');
      seekBar.style.display = 'block';

      // check if user is on mobile device
      if (!/Mobi/.test(navigator.userAgent)) {
        videoSection.classList.remove('dark-mode');
        videoHeading.classList.remove('dark-mode');
        navbarBG.classList.remove('dark-mode');
        navbar.classList.remove('dark-mode');
      }
    }
  }
}

function updateSeekBar() {
  if (!isDraggingSeekBar) {
    var value = (100 / video.duration) * video.currentTime;
    seekBar.value = value;
  }
}

function seek() {
  var time = (video.duration / 100) * seekBar.value;
  video.currentTime = time;
}

function handleMouseMove() {
  // show the cursor
  playPauseOverlay.classList.remove('no-cursor');
  overlay.classList.remove('overlay-timeout');

  // clear the previous timeout (if any)
  clearTimeout(timeoutId);
  // start a new timeout to hide the cursor after 2 seconds of inactivity
  timeoutId = setTimeout(() => {
    overlay.classList.add('overlay-timeout');
    playPauseOverlay.classList.add('no-cursor');
  }, 1000);
}

// create a new IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
  // loop through the entries array
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // if the video is in view, add the spacebar event listener
      document.addEventListener('keydown', handleKeyDown);
      playPauseOverlay.addEventListener('mousemove', handleMouseMove);
    } else {
      // if the video is not in view, remove the spacebar event listener
      document.removeEventListener('keydown', handleKeyDown);
      playPauseOverlay.removeEventListener('mousemove', handleMouseMove);
      // make sure to clear the timeout if the video is not in view
      clearTimeout(timeoutId);
      playPauseOverlay.classList.remove('no-cursor');

    }
  });
});

// observe the video element
observer.observe(video);

// function to handle the spacebar event
function handleKeyDown(event) {
  if (event.keyCode === 32) {
    event.preventDefault();
    togglePlayPause(event);
  }
}

playPauseOverlay.addEventListener('click', togglePlayPause);
video.addEventListener('timeupdate', () => {
  if (!video.paused) {
    seekBar.style.display = 'block';
  }
  updateSeekBar();
});
seekBar.addEventListener('change', seek);
seekBar.addEventListener('mousedown', () => {
  isDraggingSeekBar = true;
});
seekBar.addEventListener('mouseup', () => {
  isDraggingSeekBar = false;
});
playPauseOverlay.addEventListener('mousemove', handleMouseMove);

// event listener for the 'ended' event
video.addEventListener('ended', () => {
  video.currentTime = 0;
  video.load();
  playPauseBtn.classList.remove('playing');
  playPauseBtn.querySelector('i').textContent = 'play_arrow';
  overlay.classList.remove('overlay-play');
  overlay.classList.add('overlay-pause');
  seekBar.style.display = 'none';

  // check if user is on mobile device
  if (!/Mobi/.test(navigator.userAgent)) {
    videoSection.classList.remove('dark-mode');
    navbarBG.classList.remove('dark-mode');
  navbar.classList.remove('dark-mode');
  }
});

function setSeekBarLength() {
  if (video.duration) {
    seekBar.max = video.duration;
  } else {
    video.addEventListener('durationchange', setSeekBarLength);
  }
}

function changeVideo(src, poster) {
  const video = document.getElementById('myVideo');
  video.setAttribute('src', src);
  video.setAttribute('poster', poster);
  video.currentTime = 0;
  seekBar.value = 0;
  seekBar.style.display = 'none';

  // remove the active class from all buttons
  const buttons = document.querySelectorAll('.video-button');
  buttons.forEach((button) => {
    button.classList.remove('active');
  });

  // add the active class to the button for the new video
  const activeButton = document.querySelector(`button[onclick="changeVideo('${src}', '${poster}')"]`);
  activeButton.classList.add('active');
}

// hide the seekbar initially
seekBar.style.display = 'none';






// title scroll effect

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const scrollFactor1 = getScrollFactor(y, 0.5, 2); // Change the minFactor and maxFactor values to control the speed of the header-inner element at different scroll positions
  const scrollFactor2 = getScrollFactor(y, 0.8, 3); // Change the minFactor and maxFactor values to control the speed of the header element at different scroll positions
  const y1 = y * scrollFactor1;
  const y2 = y * scrollFactor2;
  headerInner.style.transform = `translateY(${y1}px)`;
  header.style.backgroundPositionY = `${y2}px`;
  noisy.style.backdropFilter = `blur(${y2/100}px)`;

});

function getScrollFactor(scrollY, minFactor, maxFactor) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollY / maxScroll;
  const factor = minFactor + (maxFactor - minFactor) * Math.pow(scrollPercent, 10); // Change the exponent value to control the shape of the curve
  return factor;
}






// image pan

let isPanning = false;
let startX, startY;
let currentX = 0, currentY = 0;
let hidePanIndicationTimeout, removeDraggingTimeout;

function hidePanIndication() {
  imageContainer.classList.add('hide-pan-indication');
}

function showPanIndication() {
  imageContainer.classList.remove('hide-pan-indication');
}

function startPan(event) {
  isPanning = true;
  startX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
  startY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;

  const transform = window.getComputedStyle(panImage).getPropertyValue('transform');
  if (transform !== 'none') {
    const matrix = transform.split(',').map(parseFloat);
    currentX = matrix[4];
    currentY = matrix[5];
  }

  imageContainer.classList.add('dragging');
  clearTimeout(hidePanIndicationTimeout);
  hidePanIndicationTimeout = null;

  event.preventDefault();
}

function pan(event) {
  if (isPanning) {
    const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
    const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    const newPosX = currentX + deltaX;
    const newPosY = currentY + deltaY;

    const maxX = 0;
    const maxY = 0;
    const minX = imageContainer.offsetWidth - panImage.offsetWidth;
    const minY = imageContainer.offsetHeight - panImage.offsetHeight;

    const boundedX = Math.max(minX, Math.min(maxX, newPosX));
    const boundedY = Math.max(minY, Math.min(maxY, newPosY));

    panImage.style.transform = `translate(${boundedX}px, ${boundedY}px)`;

    event.preventDefault();
  }
}

function endPan() {
  isPanning = false;
  imageContainer.classList.add('remove-dragging');
  clearTimeout(removeDraggingTimeout);
  removeDraggingTimeout = setTimeout(() => {
    imageContainer.classList.remove('dragging', 'remove-dragging');
  }, 2000);
  hidePanIndicationTimeout = setTimeout(hidePanIndication, 2000);
}

imageContainer.addEventListener('mousedown', startPan);
imageContainer.addEventListener('mousemove', pan);
imageContainer.addEventListener('mouseup', endPan);
imageContainer.addEventListener('mouseleave', endPan);

imageContainer.addEventListener('touchstart', startPan);
imageContainer.addEventListener('touchmove', pan);
imageContainer.addEventListener('touchend', endPan);
imageContainer.addEventListener('touchcancel', endPan);

// carousel removing inactive arrows


document.addEventListener('DOMContentLoaded', function() {
  var carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function(carousel) {
    var prevBtn = carousel.querySelector('.carousel-control-prev');
    var nextBtn = carousel.querySelector('.carousel-control-next');
    var carouselItems = carousel.querySelectorAll('.carousel-item');

    updateArrowButtons();

    carousel.addEventListener('slid.bs.carousel', function() {
      updateArrowButtons();
    });

    function updateArrowButtons() {
      var slideIndex = Array.from(carouselItems).findIndex(function(item) {
        return item.classList.contains('active');
      });
      if (slideIndex === 0) {
        prevBtn.classList.add('d-none');
      } else {
        prevBtn.classList.remove('d-none');
      }
      if (slideIndex === carouselItems.length - 1) {
        nextBtn.classList.add('d-none');
      } else {
        nextBtn.classList.remove('d-none');
      }
    }
  });
});


// lightbox


document.addEventListener('DOMContentLoaded', function() {
  // Add click event listener to all lightbox images
  var lightboxImgs = document.querySelectorAll('.lightbox-img');
  lightboxImgs.forEach(function(lightboxImg) {
    lightboxImg.addEventListener('click', function() {
      // Get the source and blurb of the clicked image
      var src = lightboxImg.getAttribute('src');
      var blurb = lightboxImg.getAttribute('data-blurb');
      var blurbTitle = lightboxImg.getAttribute('data-blurb-title');

      // Create a new lightbox element with the clicked image and blurb
      var lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      var imgWrapper = document.createElement('div');
      imgWrapper.className = 'img-wrapper';
      var img = document.createElement('img');
      img.setAttribute('src', src);
      var closeBtn = document.createElement('span');
      closeBtn.className = 'close-btn';
      closeBtn.innerHTML = '&times;';
      imgWrapper.appendChild(img);
      imgWrapper.appendChild(closeBtn);
      lightbox.appendChild(imgWrapper);
      // var blurbContainer = document.createElement('div');
      // blurbContainer.className = 'blurb-container';
      // if (blurbTitle) {
      //   var blurbTitleDiv = document.createElement('div');
      //   blurbTitleDiv.className = 'blurb-title';
      //   blurbTitleDiv.textContent = blurbTitle;
      //   blurbContainer.appendChild(blurbTitleDiv);
      // }
      // var blurbDiv = document.createElement('div');
      // blurbDiv.className = 'blurb';
      // blurbDiv.textContent = blurb;
      // blurbContainer.appendChild(blurbDiv);
      // lightbox.appendChild(blurbContainer);

      // Add click event listener to the close button to close the lightbox
      closeBtn.addEventListener('click', function() {
        lightbox.remove();
      });

      // Add keydown event listener to the document to close the lightbox on escape key press
      document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
          lightbox.remove();
        }
      });

      // Add the lightbox element to the body
      document.body.appendChild(lightbox);

      // Add the "show" class to display the lightbox with the opacity transition
      setTimeout(function() {
        lightbox.classList.add('show');
      }, 0);

      // Position the close button at the top right of the image
      imgWrapper.style.position = 'relative';
      imgWrapper.style.display = 'inline-block';
    });
  });
});


function updateFooterPosition() {
  const scrollPosition = window.scrollY;
  const footerPosition = footer.offsetTop;
  const footerHeight = footer.offsetHeight;
  const maxTranslation = footerHeight / 3;

  let translation = (scrollPosition - footerPosition) / 3;

  if (translation > maxTranslation) {
    translation = maxTranslation;
  } else if (translation < -maxTranslation) {
    translation = -maxTranslation;
  }

  footerInner.style.transform = `translateY(${translation}px)`;
}

