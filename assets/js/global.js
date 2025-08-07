// lucide icons
lucide.createIcons();


// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-overlay");
const mobileMenuClose = document.getElementById("mobile-menu-close");

let mobileOpen = false;

function openMobileMenu() {
  mobileOpen = true;
  mobileMenu.classList.remove("-left-full");
  mobileMenu.classList.add("left-0");

  mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
  mobileOverlay.classList.add("opacity-100");

  document.documentElement.classList.add("overflow-hidden");
  document.body.classList.add("overflow-hidden");
}

function closeMobileMenu() {
  mobileOpen = false;
  mobileMenu.classList.remove("left-0");
  mobileMenu.classList.add("-left-full");

  mobileOverlay.classList.remove("opacity-100");
  setTimeout(() => {
    if (!mobileOpen) {
      mobileOverlay.classList.add("opacity-0", "pointer-events-none");
    }
  }, 300);

  document.documentElement.classList.remove("overflow-hidden");
  document.body.classList.remove("overflow-hidden");
}

// Toggle on button click
mobileMenuBtn.addEventListener("click", () => {
  mobileOpen ? closeMobileMenu() : openMobileMenu();
});

// Close on overlay click
mobileOverlay.addEventListener("click", closeMobileMenu);

// Close button (X)
if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile menu if open
    mobileMenu.classList.add("hidden");
  });
});

// Header scroll effect
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  function handleHeaderScroll() {
    if (window.scrollY > 100) {
      header.classList.add("bg-[#0a0f1a]/90", "backdrop-blur-lg");
    } else {
      header.classList.remove("bg-[#0a0f1a]/90", "backdrop-blur-lg");
    }
  }
  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();
});

