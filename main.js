document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
  
    if (menuBtn && navLinks) {
      const menuBtnIcon = menuBtn.querySelector("i");
  
      menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        if (menuBtnIcon) {
          menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
        }
      });
  
      navLinks.addEventListener("click", () => {
        navLinks.classList.remove("open");
        if (menuBtnIcon) {
          menuBtnIcon.setAttribute("class", "ri-menu-line");
        }
      });
    }
  
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };
  
    // Header Section
    ScrollReveal().reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
  
    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 500,
    });
  
    ScrollReveal().reveal(".header__content .section__description", {
      ...scrollRevealOption,
      delay: 1000,
    });
  
    ScrollReveal().reveal(".header__content .header__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });
  
    // Explore Section
    ScrollReveal().reveal(".explore__image img", {
      ...scrollRevealOption,
      origin: "left",
    });
  
    ScrollReveal().reveal(".explore__content .section__header", {
      ...scrollRevealOption,
      delay: 500,
    });
  
    ScrollReveal().reveal(".explore__content .section__description", {
      ...scrollRevealOption,
      delay: 1000,
    });
  
    ScrollReveal().reveal(".explore__content .explore__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });
  
    // Banner Section
    ScrollReveal().reveal(".banner__card", {
      ...scrollRevealOption,
      interval: 500,
    });
  
    // Chef Section
    ScrollReveal().reveal(".chef__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
  
    ScrollReveal().reveal(".chef__content .section__header", {
      ...scrollRevealOption,
      delay: 500,
    });
  
    ScrollReveal().reveal(".chef__content .section__description", {
      ...scrollRevealOption,
      delay: 1000,
    });
  
    ScrollReveal().reveal(".chef__list li", {
      ...scrollRevealOption,
      delay: 1500,
      interval: 500,
    });
  
    // Swiper
    const swiperElement = document.querySelector(".swiper");
    if (swiperElement) {
      new Swiper(".swiper", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }
  });
  