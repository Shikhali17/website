const abstractToggles = document.querySelectorAll(".js-abstract-toggle");
const publicationTags = document.querySelectorAll(".tag-list__tag");
const siteBanner = document.querySelector(".site-banner");

if (siteBanner) {
  const compactScrollThreshold = 32;

  const syncBannerState = () => {
    document.body.classList.toggle("is-banner-compact", window.scrollY > compactScrollThreshold);
  };

  syncBannerState();
  window.addEventListener("scroll", syncBannerState, { passive: true });
}

const normalizeTagName = (value) => value.trim().toLowerCase();

const setRelatedTagHighlight = (tagName, shouldHighlight) => {
  publicationTags.forEach((tag) => {
    const isMatch = normalizeTagName(tag.textContent || "") === tagName;
    tag.classList.toggle("tag-list__tag--related", shouldHighlight && isMatch);
  });
};

publicationTags.forEach((tag) => {
  const tagName = normalizeTagName(tag.textContent || "");

  if (!tagName) {
    return;
  }

  tag.addEventListener("mouseenter", () => {
    setRelatedTagHighlight(tagName, true);
  });

  tag.addEventListener("mouseleave", () => {
    setRelatedTagHighlight(tagName, false);
  });
});

abstractToggles.forEach((toggle) => {
  const panelId = toggle.getAttribute("aria-controls");
  const abstractPanel = panelId ? document.getElementById(panelId) : null;

  if (!abstractPanel) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isHidden = abstractPanel.hasAttribute("hidden");
    abstractPanel.toggleAttribute("hidden");
    toggle.setAttribute("aria-expanded", String(isHidden));
  });
});

const modal = document.querySelector(".image-modal");
const modalImage = document.querySelector(".image-modal__image");
const modalClose = document.querySelector(".js-modal-close");
const figureButtons = document.querySelectorAll(".js-figure-button");

if (modal && modalImage && modalClose && figureButtons.length > 0) {
  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    modalImage.src = "";
    modalImage.alt = "";
  };

  figureButtons.forEach((figureButton) => {
    const figureImage = figureButton.querySelector("img");

    if (!figureImage) {
      return;
    }

    figureButton.addEventListener("click", () => {
      modalImage.src = figureImage.src;
      modalImage.alt = figureImage.alt;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}
