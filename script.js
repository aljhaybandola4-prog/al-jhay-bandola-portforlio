const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const currentSection = document.getElementById("currentSection");
const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const sectionId = entry.target.id;
    const label = sectionId.replace("-", " ").toUpperCase();
    if (currentSection) {
      currentSection.textContent = label;
    }
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("active", isActive);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const showCard = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !showCard);
    });
  });
});

