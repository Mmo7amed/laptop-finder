import { getFavorites, toggleFavorite, getTheme, saveTheme } from "./storage.js";

export const money = value => "$" + Number(value).toLocaleString();
export const findFavoriteLaptops = (laptops) => laptops.filter(laptop => getFavorites().includes(laptop.id));

export function setupTheme() {
  const applyTheme = () => {
    document.body.classList.remove("performance", "saver");
    document.body.classList.add(getTheme());
    const button = document.querySelector("#themeButton");
    if (button) button.textContent = getTheme() === "saver" ? "☀ Battery Saver" : "⚡ Performance";
  };
  applyTheme();
  document.querySelector("#themeButton")?.addEventListener("click", () => {
    saveTheme(getTheme() === "saver" ? "performance" : "saver");
    applyTheme();
  });
}

export function setupNavigation() {
  const button = document.querySelector("#menuButton");
  const menu = document.querySelector("#navMenu");
  button?.addEventListener("click", () => menu.classList.toggle("hidden"));
}

export function showError(message) {
  const area = document.querySelector("#pageContent");
  if (area) area.innerHTML = `<p class="panel rounded-xl border p-5">${message}</p>`;
}

export function renderSkeleton() {
  const area = document.querySelector("#laptopGrid");
  if (!area) return;
  area.innerHTML = Array.from({length:6}, () =>
    `<div class="laptop-card animate-pulse p-4"><div class="h-40 rounded-xl bg-slate-400/20"></div><div class="mt-4 h-5 w-3/4 rounded bg-slate-400/20"></div><div class="mt-3 h-4 w-1/2 rounded bg-slate-400/20"></div><div class="mt-6 h-9 rounded bg-slate-400/20"></div></div>`
  ).join("");
}

export function renderLaptopCards(laptops, containerId = "laptopGrid") {
  const area = document.getElementById(containerId);
  if (!area) return;
  if (!laptops.length) {
    area.innerHTML = `<p class="col-span-full rounded-xl border p-6 text-center muted">No laptops match your search.</p>`;
    return;
  }
  const favorites = getFavorites();
  area.innerHTML = laptops.map(laptop => `
    <article class="laptop-card">
      <img src="${laptop.image}" alt="${laptop.name}" class="h-44 w-full object-cover" onerror="this.src='https://placehold.co/600x400?text=Laptop'">
      <div class="p-5">
        <p class="text-sm muted">${laptop.brand} · ${laptop.category}</p>
        <h3 class="mt-1 text-lg font-bold">${laptop.name}</h3>
        <p class="mt-2 text-xl font-bold">${money(laptop.price)}</p>
        <div class="muted mt-3 grid grid-cols-2 gap-2 text-sm">
          <span>CPU: ${laptop.cpu}</span><span>RAM: ${laptop.ramGB} GB</span>
          <span>Storage: ${laptop.storageGB} GB</span><span>Battery: ${laptop.batteryHours} h</span>
        </div>
        <div class="mt-5 flex flex-wrap gap-2">
          <a class="btn-action" href="details.html?id=${laptop.id}">Details</a>
          <button class="btn-action favorite-button" data-id="${laptop.id}">${favorites.includes(laptop.id) ? "♥ Saved" : "♡ Favorite"}</button>
        </div>
      </div>
    </article>`).join("");
  area.querySelectorAll(".favorite-button").forEach(button => {
    button.addEventListener("click", () => {
      const updated = toggleFavorite(Number(button.dataset.id));
      button.textContent = updated.includes(Number(button.dataset.id)) ? "♥ Saved" : "♡ Favorite";
      document.querySelectorAll(`[data-favorite-count]`).forEach(el => el.textContent = updated.length);
      document.dispatchEvent(new Event("favoritesChanged"));
    });
  });
}

export function setupCommonPage() {
  setupTheme();
  setupNavigation();
  const count = getFavorites().length;
  document.querySelectorAll("[data-favorite-count]").forEach(el => el.textContent = count);
}
