document.addEventListener("DOMContentLoaded", () => {
  updateDynamicYear();
  enableMobileNavigation();
  initCountdownTimer();
  initCarouselControls();
  initTabs();
  enhanceScrollAnimations();
});

function updateDynamicYear() {
  const yearTarget = document.querySelector("[data-year]");
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear().toString();
  }
}

function enableMobileNavigation() {
  const toggle = document.querySelector(".site-header__toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!toggle || !mobileMenu) return;

  const menuLinks = mobileMenu.querySelectorAll("a");

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.hidden = isExpanded;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
      toggle.focus();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

function initCountdownTimer() {
  const countdown = document.querySelector("[data-countdown]");
  if (!countdown) return;

  const parts = {
    hours: countdown.querySelector('[data-countdown-part="hours"]'),
    minutes: countdown.querySelector('[data-countdown-part="minutes"]'),
    seconds: countdown.querySelector('[data-countdown-part="seconds"]'),
  };

  if (!parts.hours || !parts.minutes || !parts.seconds) return;

  const target = calculateNextCampaignDrop();

  const render = () => {
    const now = Date.now();
    const remaining = target.getTime() - now;

    if (remaining <= 0) {
      parts.hours.textContent = "00";
      parts.minutes.textContent = "00";
      parts.seconds.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    parts.hours.textContent = hours.toString().padStart(2, "0");
    parts.minutes.textContent = minutes.toString().padStart(2, "0");
    parts.seconds.textContent = seconds.toString().padStart(2, "0");
  };

  render();
  setInterval(render, 1000);
}

function calculateNextCampaignDrop() {
  const now = new Date();
  const target = new Date(now);
  const dropSlots = [0, 12, 18, 22];
  const nextSlot = dropSlots.find((slot) => slot > now.getHours());
  if (typeof nextSlot === "number") {
    target.setHours(nextSlot, 0, 0, 0);
  } else {
    target.setDate(target.getDate() + 1);
    target.setHours(dropSlots[0], 0, 0, 0);
  }
  return target;
}

function initCarouselControls() {
  const carousels = document.querySelectorAll("[data-carousel]");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    if (!track) return;

    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");

    const scrollByCard = (direction) => {
      const firstChild = track.querySelector(":scope > *");
      const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : track.clientWidth;
      track.scrollBy({ left: direction * (cardWidth + 24), behavior: "smooth" });
    };

    if (prev) {
      prev.addEventListener("click", () => scrollByCard(-1));
    }

    if (next) {
      next.addEventListener("click", () => scrollByCard(1));
    }

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener("pointerdown", (event) => {
      isDown = true;
      startX = event.clientX;
      scrollLeft = track.scrollLeft;
      track.setPointerCapture(event.pointerId);
      track.classList.add("is-dragging");
    });

    track.addEventListener("pointermove", (event) => {
      if (!isDown) return;
      const delta = event.clientX - startX;
      track.scrollLeft = scrollLeft - delta;
    });

    const cancelDrag = (event) => {
      if (!isDown) return;
      isDown = false;
      track.releasePointerCapture(event.pointerId);
      track.classList.remove("is-dragging");
    };

    track.addEventListener("pointerup", cancelDrag);
    track.addEventListener("pointercancel", cancelDrag);
    track.addEventListener("mouseleave", () => {
      isDown = false;
      track.classList.remove("is-dragging");
    });

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        scrollByCard(-1);
      }
      if (event.key === "ArrowRight") {
        scrollByCard(1);
      }
    });
  });
}

function initTabs() {
  const tabLists = document.querySelectorAll(".tabs[role='tablist']");
  tabLists.forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll("[role='tab']"));
    tabs.forEach((tab) => {
      tab.setAttribute("tabindex", tab.getAttribute("aria-selected") === "true" ? "0" : "-1");
      tab.addEventListener("click", () => activateTab(tab, tabs));
      tab.addEventListener("keydown", (event) => handleTabKeydown(event, tab, tabs));
    });
  });
}

function activateTab(selectedTab, tabs) {
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    const isActive = tab === selectedTab;
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  const targetId = selectedTab.getAttribute("data-tab");

  panels.forEach((panel) => {
    const shouldShow = panel.getAttribute("data-panel") === targetId;
    panel.toggleAttribute("hidden", !shouldShow);
  });

  selectedTab.focus();
}

function handleTabKeydown(event, tab, tabs) {
  const currentIndex = tabs.indexOf(tab);
  if (currentIndex === -1) return;

  let nextIndex = currentIndex;
  if (event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % tabs.length;
  } else if (event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = tabs.length - 1;
  } else {
    return;
  }

  event.preventDefault();
  activateTab(tabs[nextIndex], tabs);
}

function enhanceScrollAnimations() {
  const animatedElements = document.querySelectorAll(".feature-card, .product-card, .collection-card, .story-card, .testimonial, .hero__card, .cta__inner, .newsletter__inner");
  if (!animatedElements.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  animatedElements.forEach((element) => {
    element.classList.add("will-animate");
    observer.observe(element);
  });
}
