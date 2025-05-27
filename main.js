document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const nav = document.querySelector("nav");
  
  if (menuBtn && navLinks) {
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      
      if (menuBtnIcon) {
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
      }
      
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    });

    navLinks.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("open");
        if (menuBtnIcon) {
          menuBtnIcon.setAttribute("class", "ri-menu-line");
        }
        document.body.style.overflow = "auto";
      }
    });

    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && 
          !nav.contains(e.target) && 
          navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        if (menuBtnIcon) {
          menuBtnIcon.setAttribute("class", "ri-menu-line");
        }
        document.body.style.overflow = "auto";
      }
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      handleWindowResize();
    }, 250); // Debounce resize events
  });

  function handleWindowResize() {
    const width = window.innerWidth;
    
    // Reset mobile menu state when switching to desktop
    if (width > 768) {
      navLinks.classList.remove("open");
      document.body.style.overflow = "auto";
      if (menuBtn.querySelector("i")) {
        menuBtn.querySelector("i").setAttribute("class", "ri-menu-line");
      }
    }
    
    // Adjust special grid layout based on screen size
    adjustSpecialGrid();
    
    // Adjust banner layout
    adjustBannerLayout();
    
    // Recalculate scroll animations
    if (typeof ScrollReveal !== 'undefined') {
      ScrollReveal().sync();
    }
  }

  function adjustSpecialGrid() {
    const specialGrid = document.querySelector(".special__grid");
    if (!specialGrid) return;
    
    const width = window.innerWidth;
    const cards = specialGrid.querySelectorAll(".special__card");
    
    // Dynamic grid adjustment with animation
    cards.forEach((card, index) => {
      card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      
      if (width <= 540) {
        // Mobile: Stack cards
        card.style.transform = "translateY(0)";
      } else if (width <= 768) {
        // Tablet: 2 columns with stagger effect
        const delay = (index % 2) * 100;
        setTimeout(() => {
          card.style.transform = "translateY(0) scale(1)";
        }, delay);
      } else {
        // Desktop: 3 columns with cascade effect
        const delay = index * 100;
        setTimeout(() => {
          card.style.transform = "translateY(0) scale(1)";
        }, delay);
      }
    });
  }

  function adjustBannerLayout() {
    const bannerCards = document.querySelectorAll(".banner__card");
    const width = window.innerWidth;
    
    bannerCards.forEach((card, index) => {
      if (width <= 540) {
        // Mobile: Add responsive spacing
        card.style.marginBottom = index < bannerCards.length - 1 ? "1rem" : "0";
      } else if (width <= 768) {
        // Tablet: Adjust for 2-column layout
        card.style.marginBottom = "0";
      }
    });
  }

  let lastScrollY = window.scrollY;
  let isScrolling = false;

  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const nav = document.querySelector("nav");
    
    if (window.innerWidth > 768) {
      // Desktop: Hide/show nav on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }
    } else {
      // Mobile: Always show nav
      nav.style.transform = "translateY(0)";
    }
    
    lastScrollY = currentScrollY;
    
    const chefBg = document.querySelector(".chef__bg");
    if (chefBg && window.innerWidth > 768) {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      chefBg.style.transform = `translateY(${rate}px)`;
    }
  }

  let startX = 0;
  let startY = 0;
  let isTouch = false;

  // Add touch support for cards
  const cards = document.querySelectorAll(".special__card, .banner__card");
  cards.forEach(card => {
    // Touch start
    card.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isTouch = true;
      card.style.transform = "scale(0.98)";
    }, { passive: true });

    // Touch end
    card.addEventListener("touchend", () => {
      if (isTouch) {
        card.style.transform = "scale(1)";
        isTouch = false;
      }
    }, { passive: true });

    // Prevent scroll when touching cards (mobile)
    card.addEventListener("touchmove", (e) => {
      if (isTouch) {
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        
        if (deltaX > deltaY) {
          e.preventDefault();
        }
      }
    }, { passive: false });
  });

  function loadResponsiveImages() {
    const images = document.querySelectorAll("img");
    
    // Simple fade-in animation for images that are already loaded
    images.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = "1";
        img.style.transition = "opacity 0.3s ease";
      } else {
        img.onload = () => {
          img.style.opacity = "1";
          img.style.transition = "opacity 0.3s ease";
        };
      }
    });
  }

  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
    reset: false,
    mobile: true,
  };

  // Responsive scroll reveal settings
  function initScrollReveal() {
    if (typeof ScrollReveal === 'undefined') return;

    const isMobile = window.innerWidth <= 768;
    const revealDistance = isMobile ? "30px" : "50px";
    const revealDuration = isMobile ? 800 : 1000;

    const responsiveOptions = {
      ...scrollRevealOption,
      distance: revealDistance,
      duration: revealDuration,
    };

    // Header Section - Responsive animations
    ScrollReveal().reveal(".header__image img", {
      ...responsiveOptions,
      origin: isMobile ? "top" : "right",
      delay: isMobile ? 200 : 0,
    });

    ScrollReveal().reveal(".header__content h1", {
      ...responsiveOptions,
      delay: isMobile ? 300 : 500,
    });

    ScrollReveal().reveal(".header__content .section__description", {
      ...responsiveOptions,
      delay: isMobile ? 500 : 1000,
    });

    ScrollReveal().reveal(".header__content .header__btn", {
      ...responsiveOptions,
      delay: isMobile ? 700 : 1500,
    });

    // Special dishes - Responsive grid animation
    ScrollReveal().reveal(".special__card", {
      ...responsiveOptions,
      interval: isMobile ? 200 : 300,
    });

    // Explore Section
    ScrollReveal().reveal(".explore__image img", {
      ...responsiveOptions,
      origin: isMobile ? "top" : "left",
    });

    ScrollReveal().reveal(".explore__content .section__header", {
      ...responsiveOptions,
      delay: 300,
    });

    ScrollReveal().reveal(".explore__content .section__description", {
      ...responsiveOptions,
      delay: 500,
    });

    ScrollReveal().reveal(".explore__content .explore__btn", {
      ...responsiveOptions,
      delay: 700,
    });

    // Banner Section - Responsive intervals
    ScrollReveal().reveal(".banner__card", {
      ...responsiveOptions,
      interval: isMobile ? 200 : 500,
    });

    // Chef Section
    ScrollReveal().reveal(".chef__image img", {
      ...responsiveOptions,
      origin: isMobile ? "top" : "right",
    });

    ScrollReveal().reveal(".chef__content .section__header", {
      ...responsiveOptions,
      delay: 300,
    });

    ScrollReveal().reveal(".chef__content .section__description", {
      ...responsiveOptions,
      delay: 500,
    });

    ScrollReveal().reveal(".chef__list li", {
      ...responsiveOptions,
      delay: 700,
      interval: isMobile ? 200 : 500,
    });
  }

  // ========== RESPONSIVE SWIPER INITIALIZATION ==========
  function initSwiper() {
    const swiperElement = document.querySelector(".swiper");
    if (!swiperElement || typeof Swiper === 'undefined') return;

    const isMobile = window.innerWidth <= 768;
    
    new Swiper(".swiper", {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: isMobile ? 20 : 30,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: false,
      grabCursor: true,
      effect: "slide",
      speed: 600,
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 40,
        }
      }
    });
  }

  // ========== RESPONSIVE SMOOTH SCROLLING ==========
  function initSmoothScrolling() {
    const navLinksElements = document.querySelectorAll('.nav__links a[href^="#"]');
    
    navLinksElements.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop;
          const navHeight = window.innerWidth > 768 ? 80 : 68;
          
          window.scrollTo({
            top: offsetTop - navHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function optimizePerformance() {
    // Simple image loading without intersection observer issues
    loadResponsiveImages();
    
    // Reduce animations on slow devices
    const isSlowDevice = navigator.hardwareConcurrency <= 2 || 
                        navigator.deviceMemory <= 2;
    
    if (isSlowDevice) {
      document.documentElement.style.setProperty('--animation-duration', '0.5s');
    }
  }

  function enhanceAccessibility() {
    // Focus management for mobile menu
    const focusableElements = navLinks.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      
      // Trap focus in mobile menu
      navLinks.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
        
        // Close menu with Escape key
        if (e.key === 'Escape') {
          navLinks.classList.remove('open');
          menuBtn.focus();
          document.body.style.overflow = 'auto';
        }
      });
    }
  }

  function initResponsiveButtons() {
    const allButtons = document.querySelectorAll('.btn');
    let cartCount = 0;
    
    allButtons.forEach(button => {
      const buttonText = button.textContent.trim();
      
      // Add to Cart Button
      if (buttonText.includes('Add to Cart')) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          cartCount++;
          
          // Visual feedback
          button.style.transform = 'scale(0.95)';
          button.textContent = 'Added!';
          button.style.backgroundColor = '#28a745';
          
          setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
          }, 1000);
          
          // Update cart icon if exists
          const cartIcon = document.querySelector('.nav__btn .btn');
          if (cartIcon) {
            cartIcon.style.position = 'relative';
            
            // Remove existing badge
            const existingBadge = cartIcon.querySelector('.cart-badge');
            if (existingBadge) {
              existingBadge.remove();
            }
            
            // Add cart badge
            if (cartCount > 0) {
              const badge = document.createElement('span');
              badge.className = 'cart-badge';
              badge.textContent = cartCount;
              badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ff3e67;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
              `;
              cartIcon.appendChild(badge);
            }
          }
        });
      }
      
      // Get Started Button
      else if (buttonText.includes('Get Started')) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Create pulse animation
          button.style.transform = 'scale(0.95)';
          button.style.boxShadow = '0 0 20px rgba(252, 127, 9, 0.6)';
          
          // Change text temporarily
          const originalText = button.innerHTML;
          button.innerHTML = '<i class="ri-rocket-line"></i> Starting...';
          button.style.backgroundColor = '#185adb';
          
          setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.innerHTML = '<i class="ri-check-line"></i> Welcome!';
            button.style.backgroundColor = '#28a745';
          }, 800);
          
          setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
            button.style.boxShadow = '';
            
            // Scroll to special section
            const specialSection = document.getElementById('special');
            if (specialSection) {
              const offsetTop = specialSection.offsetTop;
              const navHeight = window.innerWidth > 768 ? 80 : 68;
              
              window.scrollTo({
                top: offsetTop - navHeight,
                behavior: 'smooth'
              });
            }
          }, 2000);
        });
      }
      
      // Explore Story Button
      else if (buttonText.includes('Explore Story')) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Create expanding animation
          button.style.transform = 'scale(0.95)';
          button.style.background = 'linear-gradient(45deg, #fc7f09, #ff3e67)';
          
          // Change text with icon animation
          const originalText = button.innerHTML;
          button.innerHTML = '<i class="ri-book-open-line"></i> Opening Story...';
          
          setTimeout(() => {
            button.style.transform = 'scale(1.05)';
            button.innerHTML = '<i class="ri-heart-fill"></i> Story Revealed!';
            button.style.background = 'linear-gradient(45deg, #28a745, #62b15c)';
          }, 600);
          
          setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.innerHTML = originalText;
            button.style.background = '';
            
            // Scroll to chef section
            const chefSection = document.getElementById('chef');
            if (chefSection) {
              const offsetTop = chefSection.offsetTop;
              const navHeight = window.innerWidth > 768 ? 80 : 68;
              
              window.scrollTo({
                top: offsetTop - navHeight,
                behavior: 'smooth'
              });
            }
          }, 2500);
        });
      }
      
      // Add touch feedback for all buttons
      button.addEventListener('touchstart', () => {
        button.style.transform = 'scale(0.98)';
        button.style.transition = 'transform 0.1s ease';
      }, { passive: true });
      
      button.addEventListener('touchend', () => {
        setTimeout(() => {
          if (!button.style.transform.includes('scale(0.95)')) {
            button.style.transform = 'scale(1)';
          }
        }, 100);
      }, { passive: true });
      
      // Add hover effects for desktop
      button.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
          button.style.transform = 'translateY(-2px)';
          button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
          button.style.transition = 'all 0.3s ease';
        }
      });
      
      button.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
          button.style.transform = 'translateY(0)';
          button.style.boxShadow = '';
        }
      });
    });
  }

  function init() {
    initScrollReveal();
    initSwiper();
    initSmoothScrolling();
    optimizePerformance();
    enhanceAccessibility();
    initResponsiveButtons();
    adjustSpecialGrid();
    adjustBannerLayout();
    
    
    if (nav) {
      nav.style.transition = 'transform 0.3s ease';
    }
  }

  init();
  
 
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      handleWindowResize();
      if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().sync();
      }
    }, 500);
  });

  console.log('Enhanced Responsive FoodMan JavaScript Loaded Successfully!');
});
