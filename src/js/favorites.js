import { getLaptops } from "./api.js";
import { setupCommonPage, renderLaptopCards, money, showError } from "./ui.js";
import { getFavorites, saveFavorites } from "./storage.js";
setupCommonPage();
try {
  const laptops = await getLaptops();
  function updatePage() {
    const saved = laptops.filter(item => getFavorites().includes(item.id));
    renderLaptopCards(saved);
    document.querySelector("#favoriteTotal").textContent = money(saved.reduce((sum,item)=>sum+item.price,0));
    document.querySelector("#favoriteAverage").textContent = saved.length ? money(saved.reduce((sum,item)=>sum+item.price,0)/saved.length) : "$0";
    document.querySelector("#favoriteNumber").textContent = saved.length;
  }
  document.querySelector("#clearButton").addEventListener("click", () => { saveFavorites([]); updatePage(); });
  document.addEventListener("favoritesChanged", updatePage);
  updatePage();
} catch (error) { showError(error.message); }
