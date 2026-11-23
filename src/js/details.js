import { getLaptops } from "./api.js";
import { setupCommonPage, money, showError } from "./ui.js";
import { getFavorites, toggleFavorite } from "./storage.js";
setupCommonPage();
try {
  const laptops = await getLaptops();
  const id = Number(new URLSearchParams(location.search).get("id"));
  const laptop = laptops.find(item => item.id === id);
  const area = document.querySelector("#detailsContent");
  if (!laptop) area.innerHTML = `<p class="panel rounded-xl border p-6">Laptop not found. Please return to the catalogue.</p>`;
  else {
    const fields = [["Name",laptop.name],["Brand",laptop.brand],["Price",money(laptop.price)],["Category",laptop.category],["CPU",laptop.cpu],["RAM",laptop.ramGB+" GB"],["Storage",laptop.storageGB+" GB"],["Battery",laptop.batteryHours+" hours"],["Weight",laptop.weightKg+" kg"],["Screen",laptop.screenInches+" inches"]];
    area.innerHTML = `<div class="grid gap-8 md:grid-cols-2"><img src="${laptop.image}" alt="${laptop.name}" class="w-full rounded-2xl object-cover"><div><p class="muted">${laptop.brand} · ${laptop.category}</p><h1 class="mt-2 text-3xl font-bold">${laptop.name}</h1><p class="mt-3 text-2xl font-bold">${money(laptop.price)}</p><p class="muted mt-4">${laptop.description}</p><div class="mt-5 flex flex-wrap gap-3"><button id="favoriteButton" class="btn-action"></button><button id="compareButton" class="btn-action">Add to comparison</button></div></div></div><h2 class="mt-10 text-2xl font-bold">Full specifications</h2><div class="panel mt-4 overflow-x-auto rounded-2xl border"><table class="w-full text-left"><tbody>${fields.map(([key,value])=>`<tr class="border-b border-slate-400/20"><th class="p-3">${key}</th><td class="p-3">${value}</td></tr>`).join("")}</tbody></table></div>`;
    const favButton = document.querySelector("#favoriteButton");
    const refresh = () => favButton.textContent = getFavorites().includes(id) ? "♥ Remove favorite" : "♡ Add to favorites";
    refresh();
    favButton.addEventListener("click", () => { toggleFavorite(id); refresh(); });
    document.querySelector("#compareButton").addEventListener("click", () => {
      const saved = getFavorites();
      if (!saved.includes(id)) toggleFavorite(id);
      location.href = "compare.html";
    });
  }
} catch (error) { showError(error.message); }
