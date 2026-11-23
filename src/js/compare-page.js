import { getLaptops } from "./api.js";
import { setupCommonPage, showError } from "./ui.js";
import { getFavorites } from "./storage.js";
import { makeComparison } from "./compare.js";
setupCommonPage();
try {
  const laptops = await getLaptops();
  const area = document.querySelector("#comparisonArea");
  const favorites = laptops.filter(item => getFavorites().includes(item.id));
  if (favorites.length < 2) {
    area.innerHTML = `<p class="panel rounded-xl border p-5">Save at least two laptops to compare them.</p>`;
  } else {
    let chosenIds = favorites.slice(0, 4).map(item => item.id);
    function updateComparison() {
      const chosen = favorites.filter(item => chosenIds.includes(item.id));
      area.innerHTML = `
        <div class="panel mb-5 rounded-2xl border p-5">
          <h2 class="font-bold">Choose 2 to 4 laptops</h2>
          <p class="muted mt-1 text-sm">Select the favorites you want to compare.</p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            ${favorites.map(item => `<label class="flex items-center gap-2"><input class="compare-choice" type="checkbox" value="${item.id}" ${chosenIds.includes(item.id) ? "checked" : ""}> <span>${item.name}</span></label>`).join("")}
          </div>
          <p id="compareMessage" class="mt-3 text-sm text-red-500"></p>
        </div>
        ${chosen.length >= 2 ? `<div class="panel overflow-x-auto rounded-2xl border p-2">${makeComparison(chosen)}</div>` : `<p class="panel rounded-xl border p-5">Choose at least two laptops to see the comparison.</p>`}
      `;
      area.querySelectorAll(".compare-choice").forEach(box => {
        box.addEventListener("change", () => {
          const id = Number(box.value);
          if (box.checked && chosenIds.length >= 4) {
            box.checked = false;
            document.querySelector("#compareMessage").textContent = "You can select a maximum of four laptops.";
            return;
          }
          if (box.checked) chosenIds.push(id);
          else chosenIds = chosenIds.filter(savedId => savedId !== id);
          updateComparison();
        });
      });
    }
    updateComparison();
  }
} catch (error) { showError(error.message); }
