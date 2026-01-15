import toggleBodyLock from "./../helpers/toggleBodyLock";
import {
  html,
  firstScreen,
  header,
  burgerButton,
} from "./../helpers/elementsNodeList";

function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0);
}

export function getGclid() {
  const gclid = new URLSearchParams(window.location.search).get("gclid") || "";
  if (!gclid) return;

  const updateLinks = () => {
    document.querySelectorAll("a").forEach((link) => {
      try {
        const url = new URL(link.href, window.location.origin);
        url.searchParams.set("gclid", gclid);
        link.href = url.toString();
      } catch (e) {}
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateLinks);
  } else {
    updateLinks();
  }

  const observer = new MutationObserver(updateLinks);
  observer.observe(document.body, { childList: true, subtree: true });
}

function isWebp() {
  const testWebp = (callback) => {
    const webP = new Image();

    webP.onload = webP.onerror = () => callback(webP.height === 2);
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  };
  testWebp((support) => {
    const className = support ? "webp" : "no-webp";
    html.classList.add(className);

    FLS(support ? "webp поддерживается" : "webp не поддерживается");
  });
}

const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};
function addTouchClass() {
  if (isMobile.any()) {
    html.classList.add("touch");
  }
}

function addLoadedClass() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      html.classList.add("loaded");
    }, 0);
  });
}

const getHash = () => {
  if (location.hash) {
    return location.hash.replace("#", "");
  }
};

function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split("#")[0];
  history.pushState("", "", hash);
}

function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle("sticky", !entry.isIntersecting);
  });

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen);
  }
}

const togglePopupWindows = () => {
  document.addEventListener("click", ({ target }) => {
    if (target.closest("[data-type]")) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      );

      if (document.querySelector("._is-open")) {
        document.querySelectorAll("._is-open").forEach((modal) => {
          modal.classList.remove("_is-open");
        });
      }

      popup.classList.add("_is-open");
      toggleBodyLock(true);
    }

    if (
      target.classList.contains("_overlay-bg") ||
      target.closest(".button-close")
    ) {
      const popup = target.closest("._overlay-bg");

      popup.classList.remove("_is-open");
      toggleBodyLock(false);
    }
  });
};

const menuInit = () => {
  if (burgerButton) {
    document.addEventListener("click", ({ target }) => {
      if (target.closest(".icon-menu")) {
        html.classList.toggle("menu-open");
        toggleBodyLock(html.classList.contains("menu-open"));
      }
    });
  }
};
const menuOpen = () => {
  toggleBodyLock(true);
  html.classList.add("menu-open");
};
const menuClose = () => {
  toggleBodyLock(false);
  html.classList.remove("menu-open");
};

export {
  FLS,
  isWebp,
  isMobile,
  addTouchClass,
  headerFixed,
  togglePopupWindows,
  addLoadedClass,
  getHash,
  setHash,
  menuInit,
  menuOpen,
  menuClose,
};
