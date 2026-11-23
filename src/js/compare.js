export function makeComparison(laptops) {
  const rows = [
    ["Price", "price", "low", value => "$" + value.toLocaleString()],
    ["RAM", "ramGB", "high", value => value + " GB"],
    ["Storage", "storageGB", "high", value => value + " GB"],
    ["Battery life", "batteryHours", "high", value => value + " hours"],
    ["Weight", "weightKg", "low", value => value + " kg"],
    ["Screen size", "screenInches", "high", value => value + " inches"]
  ];
  const header = `<tr><th class="p-3 text-left">Specification</th>${laptops.map(item => `<th class="min-w-40 p-3 text-left">${item.name}</th>`).join("")}</tr>`;
  const body = rows.map(([label,key,direction,format]) => {
    const values = laptops.map(item => item[key]);
    const best = direction === "low" ? Math.min(...values) : Math.max(...values);
    return `<tr><th class="p-3 text-left">${label}</th>${laptops.map(item => `<td class="p-3 ${item[key] === best ? "rounded-lg bg-green-500/20 font-bold text-green-600" : ""}">${format(item[key])}</td>`).join("")}</tr>`;
  }).join("");
  return `<table class="w-full text-sm"><thead>${header}</thead><tbody>${body}</tbody></table>`;
}
