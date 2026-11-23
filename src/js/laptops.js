import { getLaptops } from "./api.js";
import { setupCommonPage, renderLaptopCards, renderSkeleton, showError } from "./ui.js";
setupCommonPage();
renderSkeleton();
try {
  const laptops = await getLaptops();
  const search = document.querySelector("#search");
  const category = document.querySelector("#category");
  const maxPrice = document.querySelector("#maxPrice");
  const minRam = document.querySelector("#minRam");
  const sort = document.querySelector("#sort");
  const count = document.querySelector("#resultCount");

  function updateLaptops() {
    let results = laptops.filter(item =>
      (item.name.toLowerCase().includes(search.value.toLowerCase()) || item.brand.toLowerCase().includes(search.value.toLowerCase())) &&
      (!category.value || item.category === category.value) &&
      (!maxPrice.value || item.price <= Number(maxPrice.value)) &&
      (!minRam.value || item.ramGB >= Number(minRam.value))
    );
    const [key, direction] = sort.value.split("-");
    results = [...results].sort((a,b) => direction === "asc" ? a[key]-b[key] : b[key]-a[key]);
    count.textContent = results.length;
    renderLaptopCards(results);
  }
  [search,category,maxPrice,minRam,sort].forEach(control => control.addEventListener("input", updateLaptops));
  updateLaptops();
} catch (error) { showError(error.message); }
