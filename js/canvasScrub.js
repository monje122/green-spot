/**
 * GREEN SPOT — High Performance Canvas & Video Scrollytelling Engine
 * Fullscreen visual immersion, frame-by-frame 60fps canvas scrubbing,
 * and synchronized editorial cards sliding in from alternate sides.
 */

class HeroScrollytelling {
  constructor() {
    this.container = document.querySelector('.hero-scrolly-container');
    this.canvas = document.getElementById('hero-scrub-canvas');
    this.ambientCanvas = document.getElementById('hero-ambient-canvas');
    this.videoFallback = document.getElementById('greenspot-video');
    this.telemetryPill = document.getElementById('scrub-pill-text');
    this.telemetryBar = document.getElementById('hero-progress-fill');
    this.cards = document.querySelectorAll('.hero-float-card');

    this.totalFrames = 120;
    this.images = [];
    this.imagesLoaded = 0;
    this.isReady = false;

    this.targetProgress = 0;
    this.currentProgress = 0;
    this.currentFrameIndex = 0;
    this.activeStep = -1;

    this.ctx = this.canvas ? this.canvas.getContext('2d', { alpha: false }) : null;
    this.ambientCtx = this.ambientCanvas ? this.ambientCanvas.getContext('2d', { alpha: false }) : null;

    this.init();
  }

  init() {
    if (!this.container) return;

    this.preloadFrames();
    this.setupResize();
    this.setupScroll();
    this.startRenderLoop();
  }

  preloadFrames() {
    for (let i = 1; i <= this.totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `assets/frames/frame_${numStr}.jpg`;

      img.onload = () => {
        this.imagesLoaded++;
        if (this.imagesLoaded === 1) {
          // Render first frame as soon as available
          this.renderFrame(0);
        }
        if (this.imagesLoaded >= 15) {
          this.isReady = true;
        }
      };

      this.images.push(img);
    }
  }

  setupResize() {
    const handleResize = () => {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      // Native aspect ratio 9:16
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Fit within viewport while maintaining crisp 9:16 proportion
      let renderH = vh * 0.94;
      let renderW = renderH * (9 / 16);

      if (renderW > vw * 0.95) {
        renderW = vw * 0.95;
        renderH = renderW * (16 / 9);
      }

      this.canvas.width = 720;
      this.canvas.height = 1280;

      if (this.ambientCanvas) {
        this.ambientCanvas.width = 180;
        this.ambientCanvas.height = 320;
      }

      this.renderFrame(this.currentFrameIndex);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
  }

  setupScroll() {
    const onScroll = () => {
      const rect = this.container.getBoundingClientRect();
      const totalScrollable = this.container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      this.targetProgress = progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  startRenderLoop() {
    const loop = () => {
      // Smooth lerp interpolation for responsive, immediate fluidity
      const diff = this.targetProgress - this.currentProgress;
      this.currentProgress += diff * 0.28;

      // Determine frame index (0 to totalFrames - 1)
      const frameIdx = Math.min(
        this.totalFrames - 1,
        Math.max(0, Math.round(this.currentProgress * (this.totalFrames - 1)))
      );

      if (frameIdx !== this.currentFrameIndex) {
        this.currentFrameIndex = frameIdx;
        this.renderFrame(frameIdx);
      }

      // Update interactive cards and telemetry
      this.updateSideCards(this.currentProgress);
      this.updateTelemetry(this.currentProgress, frameIdx);

      // Fallback video sync if canvas is not supported
      if (!this.ctx && this.videoFallback && this.videoFallback.duration) {
        this.videoFallback.currentTime = this.currentProgress * this.videoFallback.duration;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  renderFrame(index) {
    if (!this.ctx || !this.images[index]) return;

    const img = this.images[index];
    if (img.complete && img.naturalWidth > 0) {
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

      if (this.ambientCtx && this.ambientCanvas) {
        this.ambientCtx.drawImage(img, 0, 0, this.ambientCanvas.width, this.ambientCanvas.height);
      }
    } else {
      // Fallback to closest loaded frame
      for (let offset = 1; offset < 20; offset++) {
        const prev = this.images[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          this.ctx.drawImage(prev, 0, 0, this.canvas.width, this.canvas.height);
          break;
        }
        const next = this.images[index + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          this.ctx.drawImage(next, 0, 0, this.canvas.width, this.canvas.height);
          break;
        }
      }
    }
  }

  updateSideCards(progress) {
    // 4 Narrative Milestones:
    // Step 1: 0.00 - 0.24 (Left)
    // Step 2: 0.25 - 0.49 (Right)
    // Step 3: 0.50 - 0.74 (Left)
    // Step 4: 0.75 - 1.00 (Right)
    let activeStep = 1;
    if (progress >= 0.75) {
      activeStep = 4;
    } else if (progress >= 0.50) {
      activeStep = 3;
    } else if (progress >= 0.25) {
      activeStep = 2;
    } else {
      activeStep = 1;
    }

    if (activeStep !== this.activeStep) {
      this.activeStep = activeStep;

      this.cards.forEach((card) => {
        const cardStep = parseInt(card.getAttribute('data-step'), 10);
        if (cardStep === activeStep) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });
    }
  }

  updateTelemetry(progress, frameIdx) {
    const pct = Math.round(progress * 100);
    const timeEquiv = ((progress * 10.0)).toFixed(1);

    if (this.telemetryPill) {
      this.telemetryPill.textContent = `${timeEquiv}s / 10.0s • FOTOGRAMA ${frameIdx + 1}/${this.totalFrames} • ${pct}%`;
    }

    if (this.telemetryBar) {
      this.telemetryBar.style.width = `${pct}%`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.greenspotScrolly = new HeroScrollytelling();
});
