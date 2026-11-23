import { getLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import { setupCommonPage, money, showError } from "./ui.js";
setupCommonPage();
try {
  const laptops = await getLaptops();
  document.querySelector("#laptopCount").textContent = laptops.length;
  document.querySelector("#lowestPrice").textContent = money(laptops.reduce((lowest, item) => Math.min(lowest, item.price), Infinity));
  document.querySelector("#savedCount").textContent = getFavorites().length;
} catch (error) { showError(error.message); }
