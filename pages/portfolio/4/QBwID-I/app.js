
let currentCategory = "LIVE2D";
let currentScrollTop = 0;
let maxScrollTop = 0;
let isDraggingThumb = false;
let dragStartY = 0;
let dragStartScrollTop = 0;


const viewport = document.getElementById("app-viewport");
const worksGrid = document.getElementById("works-grid");
const emptyState = document.getElementById("empty-state");
const canvasViewport = document.getElementById("canvas-viewport");
const scrollThumb = document.getElementById("scroll-thumb");
const scrollTrack = document.getElementById("scroll-track");
const arrowUp = document.getElementById("scroll-arrow-up");
const arrowDown = document.getElementById("scroll-arrow-down");
const categoryBtns = document.querySelectorAll(".category-btn");

const lightbox = document.getElementById("lightbox");
const lightboxInner = document.getElementById("lightbox-inner");
const lightboxClose = document.getElementById("lightbox-close");

const btnHome = document.getElementById("btn-home");
const secretFrame = document.getElementById("secret-frame");

let audioCtx = null;

let secretVideoTriggered = false;
let secretVideoPlaying = false;
let secretCloseBtn = null;
let bgmAudio = null; // 预留背景音乐：后续赋值为 <audio> 元素后，视频播放时音量降0、关闭后渐强恢复

function playClick() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(350, t + 0.07);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  } catch (err) {}
}

function playRustle() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const duration = 0.18;
    const bufferSize = Math.floor(audioCtx.sampleRate * duration);
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.8;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    src.start(t);
    src.stop(t + duration);
  } catch (err) {}
}


document.addEventListener("DOMContentLoaded", () => {

  if (window.lucide) {
    window.lucide.createIcons();
  }


  setupDebugMode();


  switchCategory("LIVE2D");


  setupCategoryListeners();
  setupScrollbarListeners();
  setupLightboxListeners();
  setupHomeAndSecret();
});

function setupHomeAndSecret() {
  btnHome.addEventListener("click", () => {
    playClick();
    const url = (typeof HOME_URL !== "undefined" && HOME_URL) ? HOME_URL : "index.html";
    window.location.href = url;
  });

  let secretCount = 0;
  let secretTimer = null;

  function jitterFrame() {
    secretFrame.classList.remove("jitter");
    void secretFrame.offsetWidth;
    secretFrame.classList.add("jitter");
  }

  let nearEdge = false;
  secretFrame.addEventListener("mousemove", (e) => {
    const rect = secretFrame.getBoundingClientRect();
    const dist = Math.min(
      e.clientX - rect.left,
      rect.right - e.clientX,
      e.clientY - rect.top,
      rect.bottom - e.clientY
    );
    const isNear = dist <= 25;
    if (isNear && !nearEdge) {
      jitterFrame();
    }
    nearEdge = isNear;
  });

  secretFrame.addEventListener("click", () => {
    playClick();
    jitterFrame();
    if (secretVideoTriggered) return;
    secretCount += 1;
    clearTimeout(secretTimer);
    secretTimer = setTimeout(() => { secretCount = 0; }, 2000);
    if (secretCount >= 8) {
      secretCount = 0;
      secretVideoTriggered = true;
      openSecretVideo();
    }
  });
}

function openSecretVideo() {
  const src = (typeof SECRET_VIDEO !== "undefined") ? SECRET_VIDEO : "";
  if (!src) {
    alert("彩蛋视频还没配置：请在 works.js 顶部把 SECRET_VIDEO 改成视频路径");
    return;
  }
  lightboxInner.innerHTML = "";
  lightbox.classList.add("secret-mode");
  lightboxClose.classList.add("hidden");
  secretVideoPlaying = true;

  const video = document.createElement("video");
  video.src = src;
  video.controls = false;
  video.autoplay = true;
  video.loop = true;
  video.setAttribute("playsinline", "");
  video.onerror = () => {
    closeSecretVideo();
  };
  lightboxInner.appendChild(video);

  duckBgm();
  showSecretClose();

  lightbox.classList.remove("opacity-0", "pointer-events-none");
  lightbox.classList.add("opacity-100");

  video.play().catch(() => {});
}

function duckBgm() {
  if (!bgmAudio) return;
  bgmAudio.volume = 0;
}

function restoreBgm() {
  if (!bgmAudio) return;
  let vol = 0;
  const step = 0.05;
  const timer = setInterval(() => {
    vol = Math.min(1, vol + step);
    bgmAudio.volume = vol;
    if (vol >= 1) clearInterval(timer);
  }, 50);
}

function showSecretClose() {
  secretCloseBtn = document.createElement("button");
  secretCloseBtn.className = "secret-close";
  secretCloseBtn.setAttribute("aria-label", "关闭视频");
  secretCloseBtn.addEventListener("click", () => {
    playClick();
    closeSecretVideo();
  });
  document.body.appendChild(secretCloseBtn);
  setTimeout(() => {
    if (secretCloseBtn) {
      secretCloseBtn.classList.add("show");
    }
  }, 5000);
}

function closeSecretVideo() {
  if (secretCloseBtn) {
    secretCloseBtn.remove();
    secretCloseBtn = null;
  }
  restoreBgm();
  secretVideoPlaying = false;
  lightbox.classList.remove("secret-mode");
  lightboxClose.classList.remove("hidden");
  closeLightbox();
}


function setupDebugMode() {
  const debugLayer = document.getElementById("debug-layer");
  const debugCoords = document.getElementById("debug-coords");

  if (typeof DEBUG !== "undefined" && DEBUG) {
    debugLayer.classList.remove("hidden");
    

    document.querySelectorAll(".category-btn, .canvas-viewport, .custom-scrollbar").forEach(el => {
      el.classList.add("debug-border");
    });

    viewport.addEventListener("mousemove", (e) => {
      const rect = viewport.getBoundingClientRect();
      const xPct = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
      const yPct = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
      debugCoords.textContent = `${xPct}%, ${yPct}%`;
    });
  }
}


function setupCategoryListeners() {
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      playClick();
      const category = btn.getAttribute("data-category");
      switchCategory(category);
    });
  });
}

function switchCategory(category) {
  currentCategory = category;


  categoryBtns.forEach(btn => {
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });


  currentScrollTop = 0;


  renderWorks();
}


function renderWorks() {
  worksGrid.innerHTML = "";
  const items = (typeof WORKS !== "undefined" && WORKS[currentCategory]) ? WORKS[currentCategory] : [];

  if (items.length === 0) {
    emptyState.classList.remove("hidden");
    worksGrid.style.transform = `translateY(0px)`;
    updateScrollbar();
    return;
  }

  emptyState.classList.add("hidden");

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "work-card group relative flex flex-col items-center justify-center p-1";

    const isVideo = item.full.endsWith(".mp4");

    card.innerHTML = `
      <div class="w-full h-full relative overflow-hidden">
        <img src="${item.thumb}" alt="" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      </div>
    `;

    card.addEventListener("click", () => {
      playClick();
      openLightbox(item);
    });

    card.addEventListener("mouseenter", () => {
      playRustle();
    });

    worksGrid.appendChild(card);
  });


  requestAnimationFrame(() => {
    updateScrollbar();
  });
}


function updateScrollbar() {
  const viewportHeight = canvasViewport.clientHeight;
  const contentHeight = worksGrid.scrollHeight;

  maxScrollTop = Math.max(0, contentHeight - viewportHeight);


  if (currentScrollTop > maxScrollTop) currentScrollTop = maxScrollTop;
  if (currentScrollTop < 0) currentScrollTop = 0;


  worksGrid.style.transform = `translateY(-${currentScrollTop}px)`;

  const trackHeight = scrollTrack.clientHeight;

  if (maxScrollTop === 0 || contentHeight <= viewportHeight) {

    scrollThumb.style.height = `100%`;
    scrollThumb.style.transform = `translateY(0px)`;
    scrollThumb.classList.add("disabled");
  } else {
    scrollThumb.classList.remove("disabled");

    const thumbRatio = Math.max(0.15, viewportHeight / contentHeight);
    const thumbHeight = trackHeight * thumbRatio;
    scrollThumb.style.height = `${thumbHeight}px`;


    const availableTrack = trackHeight - thumbHeight;
    const scrollRatio = currentScrollTop / maxScrollTop;
    const thumbTop = availableTrack * scrollRatio;
    scrollThumb.style.transform = `translateY(${thumbTop}px)`;
  }
}


function setupScrollbarListeners() {

  canvasViewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (maxScrollTop <= 0) return;
    const delta = e.deltaY > 0 ? 60 : -60;
    currentScrollTop += delta;
    updateScrollbar();
  }, { passive: false });


  arrowUp.addEventListener("click", () => {
    playClick();
    if (maxScrollTop <= 0) return;
    currentScrollTop -= 80;
    updateScrollbar();
  });

  arrowDown.addEventListener("click", () => {
    playClick();
    if (maxScrollTop <= 0) return;
    currentScrollTop += 80;
    updateScrollbar();
  });


  scrollTrack.addEventListener("click", (e) => {
    if (e.target === scrollThumb || scrollThumb.contains(e.target)) return;
    const trackRect = scrollTrack.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const trackHeight = trackRect.height;
    const thumbHeight = scrollThumb.clientHeight;

    const targetRatio = (clickY - thumbHeight / 2) / (trackHeight - thumbHeight);
    currentScrollTop = targetRatio * maxScrollTop;
    updateScrollbar();
  });


  scrollThumb.addEventListener("pointerdown", (e) => {
    if (maxScrollTop <= 0) return;
    isDraggingThumb = true;
    dragStartY = e.clientY;
    dragStartScrollTop = currentScrollTop;
    scrollThumb.setPointerCapture(e.pointerId);
  });

  scrollThumb.addEventListener("pointermove", (e) => {
    if (!isDraggingThumb) return;
    const deltaY = e.clientY - dragStartY;
    const trackHeight = scrollTrack.clientHeight;
    const thumbHeight = scrollThumb.clientHeight;
    const availableTrack = trackHeight - thumbHeight;

    if (availableTrack > 0) {
      const scrollDelta = (deltaY / availableTrack) * maxScrollTop;
      currentScrollTop = dragStartScrollTop + scrollDelta;
      updateScrollbar();
    }
  });

  const stopDrag = (e) => {
    if (isDraggingThumb) {
      isDraggingThumb = false;
      try { scrollThumb.releasePointerCapture(e.pointerId); } catch(err){}
    }
  };

  scrollThumb.addEventListener("pointerup", stopDrag);
  scrollThumb.addEventListener("pointercancel", stopDrag);


  let touchStartY = 0;
  canvasViewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  canvasViewport.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1 && maxScrollTop > 0) {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      currentScrollTop += deltaY;
      updateScrollbar();
    }
  }, { passive: true });


  window.addEventListener("resize", () => {
    updateScrollbar();
  });
}


function setupLightboxListeners() {
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (secretVideoPlaying) return;
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (secretVideoPlaying) return;
    if (e.key === "Escape" && !lightbox.classList.contains("pointer-events-none")) {
      closeLightbox();
    }
  });
}

function openLightbox(item) {
  lightboxInner.innerHTML = "";
  document.querySelectorAll(".pixel-note").forEach(el => el.remove());

  const isVideo = item.full.endsWith(".mp4");

  if (isVideo) {
    const video = document.createElement("video");
    video.src = item.full;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    lightboxInner.appendChild(video);

    if (item.note) {
      openLive2dNote(item.note);
    }
  } else {
    const img = document.createElement("img");
    img.src = item.full;
    img.alt = "";
    lightboxInner.appendChild(img);

    if (item.note) {
      openLive2dNote(item.note);
    }
  }

  lightbox.classList.remove("opacity-0", "pointer-events-none");
  lightbox.classList.add("opacity-100");
}

function openLive2dNote(text) {
  document.querySelectorAll(".pixel-note").forEach(el => el.remove());

  const noteBox = document.createElement("div");
  noteBox.className = "pixel-note";

  const noteText = document.createElement("div");
  noteText.className = "pixel-note-text";
  noteText.textContent = text;
  noteBox.appendChild(noteText);

  document.body.appendChild(noteBox);
}

function closeLightbox() {
  document.querySelectorAll(".pixel-note").forEach(el => el.remove());
  lightbox.classList.remove("opacity-100");
  lightbox.classList.add("opacity-0", "pointer-events-none");
  setTimeout(() => {
    lightboxInner.innerHTML = "";
  }, 200);
}

