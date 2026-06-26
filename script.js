const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const copyButton = document.querySelector(".copy-email");
const copyStatus = document.querySelector(".copy-status");
const langToggle = document.querySelector(".lang-toggle");
const langCurrent = document.querySelector(".lang-current");

function setLanguage(lang) {
  document.body.dataset.currentLang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  localStorage.setItem("herrealm-language", lang);

  if (langCurrent) {
    langCurrent.textContent = lang === "en" ? "中文" : "EN";
  }
}

const savedLanguage = localStorage.getItem("herrealm-language");
setLanguage(savedLanguage || "en");

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const current = document.body.dataset.currentLang || "en";
    setLanguage(current === "en" ? "zh" : "en");
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (copyButton && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent =
        document.body.dataset.currentLang === "zh"
          ? `${email} 已复制。`
          : `${email} copied.`;
    } catch (error) {
      copyStatus.textContent =
        document.body.dataset.currentLang === "zh"
          ? `复制失败。邮箱：${email}`
          : `Copy failed. Email: ${email}`;
    }
  });
}
