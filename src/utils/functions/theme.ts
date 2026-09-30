const THEME_KEY = "martin-roncero-theme"
// TODO "dark" and "light" should be enums (as const)

export function toggleTheme(): void {
  let current: string | null;

  try {
    current = localStorage.getItem(THEME_KEY);
  } catch {
    console.warn("Error accessing localStorage (Read)");
    current = document.documentElement.getAttribute("data-theme"); 
  }

  const isDark = current === "dark";
  const nextName = isDark ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", nextName);

  try {
    localStorage.setItem(THEME_KEY, nextName);
  } catch {
    console.warn("Error accessing localStorage (Write)");
  }
}

export function initTheme(): void {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    const isDark = saved === "dark"
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
  } catch {
    console.warn("Error accesing localStorage")
    document.documentElement.setAttribute("data-theme", "light")
  }
}
