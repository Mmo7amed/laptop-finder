export async function getLaptops() {
  try {
    const response = await fetch("./data/laptops.json");
    if (!response.ok) throw new Error("Could not load laptop data.");
    return await response.json();
  } catch (error) {
    throw new Error("Laptop data could not be loaded. Make sure you are using Live Server.");
  }
}
