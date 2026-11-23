export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
export function saveFavorites(ids) {
  localStorage.setItem("favorites", JSON.stringify(ids));
}
export function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) favorites = favorites.filter(item => item !== id);
  else favorites.push(id);
  saveFavorites(favorites);
  return favorites;
}
export function getTheme() {
  return localStorage.getItem("theme") || "saver";
}
export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}
