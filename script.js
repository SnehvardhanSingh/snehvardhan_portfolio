/**
 * Portfolio JavaScript
 * Candidate: Snehvardhan Singh Rathore (AI/ML Engineering Student)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Navigation Elements
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle Mobile Menu
  if (mobileToggle && navMenu) {
    const closeMobileMenu = () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-locked');
    };

    const openMobileMenu = () => {
      navMenu.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-locked');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close menu if window is resized past mobile/tablet breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    }, { passive: true });
  }

  // 3. Navbar scroll effect
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 4. Smooth Scrolling with dynamic fixed header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = navbar ? navbar.offsetHeight : 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (headerOffset - 4);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Active Link Highlight on Scroll using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // 6. Back-to-Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 7. Contact Form Handling & Validation
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    // Email regex validator
    const isValidEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      nameError.classList.remove('visible');
      nameInput.classList.remove('input-error');
      emailError.classList.remove('visible');
      emailInput.classList.remove('input-error');
      messageError.classList.remove('visible');
      messageInput.classList.remove('input-error');
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.classList.add('visible');
        nameInput.classList.add('input-error');
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailError.classList.add('visible');
        emailInput.classList.add('input-error');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.classList.add('visible');
        messageInput.classList.add('input-error');
        isValid = false;
      }

      if (isValid) {
        // Display success confirmation message
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Thank you, Snehvardhan has received your note! I will get back to you shortly.';
        contactForm.reset();

        // Clear feedback banner after 6 seconds
        setTimeout(() => {
          formFeedback.className = 'form-feedback';
          formFeedback.textContent = '';
        }, 6000);
      }
    });

    // Remove error class on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('input-error');
          const errorMsg = document.getElementById(`${input.id}-error`);
          if (errorMsg) errorMsg.classList.remove('visible');
        });
      }
    });
  }

  // 8. Spline 3D Scene Loading Handler
  const splineViewer = document.getElementById('hero-spline');
  const splineLoader = document.getElementById('spline-loader');

  if (splineViewer && splineLoader) {
    const handleSplineLoaded = () => {
      splineLoader.classList.add('loaded');
    };

    splineViewer.addEventListener('load', handleSplineLoaded);

    // Graceful fallback to hide loading indicator
    setTimeout(handleSplineLoaded, 4000);
  }

  // 9. Full-Page Scroll-Driven 3D Neural Frame Animation Engine
  const scrollCanvas = document.getElementById('bg-scroll-canvas');
  if (scrollCanvas) {
    const ctx = scrollCanvas.getContext('2d', { alpha: false });
    const totalFrames = 300;
    const frameCache = new Array(totalFrames);
    let targetFrame = 0;
    let currentFrame = 0;
    let isAnimating = false;

    // Helper: format frame index to 6-digit filename (frame_000001.jpg - frame_000300.jpg)
    const getFrameSrc = (index) => {
      const paddedIndex = String(index + 1).padStart(6, '0');
      return `video_frames_30fps/frame_${paddedIndex}.jpg`;
    };

    // Helper: find closest loaded frame to avoid any blank flicker while loading
    const getNearestLoadedFrame = (idx) => {
      if (frameCache[idx] && frameCache[idx].complete && frameCache[idx].naturalWidth > 0) {
        return frameCache[idx];
      }
      // Check adjacent frames (search outward)
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = idx - offset;
        if (prev >= 0 && frameCache[prev] && frameCache[prev].complete && frameCache[prev].naturalWidth > 0) {
          return frameCache[prev];
        }
        const next = idx + offset;
        if (next < totalFrames && frameCache[next] && frameCache[next].complete && frameCache[next].naturalWidth > 0) {
          return frameCache[next];
        }
      }
      return null;
    };

    // Draw frame onto canvas with cover aspect ratio
    const drawFrame = (frameIndex) => {
      if (!ctx) return;
      const img = getNearestLoadedFrame(frameIndex);
      if (!img) return;

      const cw = scrollCanvas.width;
      const ch = scrollCanvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      if (iw === 0 || ih === 0) return;

      // Cover aspect ratio calculations
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;

      ctx.drawImage(img, cx, cy, nw, nh);
    };

    // Responsive Canvas Resize with device-tailored DPR scaling
    const resizeCanvas = () => {
      const isMobile = window.innerWidth <= 768;
      const maxDpr = isMobile ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      scrollCanvas.width = Math.floor(window.innerWidth * dpr);
      scrollCanvas.height = Math.floor(window.innerHeight * dpr);
      drawFrame(Math.round(currentFrame));
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // Smooth Lerp Animation Loop
    const tick = () => {
      const delta = targetFrame - currentFrame;
      if (Math.abs(delta) > 0.01) {
        currentFrame += delta * 0.14; // Buttery smooth easing
        drawFrame(Math.round(currentFrame));
        requestAnimationFrame(tick);
      } else {
        currentFrame = targetFrame;
        drawFrame(Math.round(currentFrame));
        isAnimating = false;
      }
    };

    // Scroll Position Calculator
    const handleScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;
      targetFrame = Math.min(totalFrames - 1, Math.max(0, Math.round(progress * (totalFrames - 1))));

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });

    // Load a single frame and return a Promise
    const preloadImage = (index) => {
      return new Promise((resolve) => {
        if (frameCache[index]) {
          resolve(frameCache[index]);
          return;
        }
        const img = new Image();
        img.src = getFrameSrc(index);
        img.onload = () => {
          frameCache[index] = img;
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Initial Load & Progressive Preloading Strategy
    // 1. Load First Frame Instantly
    preloadImage(0).then((img) => {
      if (img) {
        drawFrame(0);
      }

      // 2. Preload Milestone Frames (every 6th frame so scrubbing is responsive immediately)
      const milestonePromises = [];
      for (let i = 0; i < totalFrames; i += 6) {
        if (i !== 0) {
          milestonePromises.push(preloadImage(i));
        }
      }

      Promise.all(milestonePromises).then(() => {
        // 3. Batch preload all remaining frames in background chunks
        let currentBatch = 0;
        const batchSize = 12;

        const loadNextBatch = () => {
          if (currentBatch >= totalFrames) return;
          const batchPromises = [];
          for (let i = currentBatch; i < Math.min(currentBatch + batchSize, totalFrames); i++) {
            if (!frameCache[i]) {
              batchPromises.push(preloadImage(i));
            }
          }
          currentBatch += batchSize;
          Promise.all(batchPromises).then(() => {
            if ('requestIdleCallback' in window) {
              requestIdleCallback(loadNextBatch);
            } else {
              setTimeout(loadNextBatch, 16);
            }
          });
        };

        loadNextBatch();
      });
    });

    // Run initial scroll sync
    handleScrollProgress();
  }
});

