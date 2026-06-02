const THEME_KEY = "martin-roncero-theme"

export function toggleTheme(): void {
  const current = localStorage.getItem(THEME_KEY)
  const isDark = current === "dark"
  const nextName = isDark ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", nextName)
  localStorage.setItem(THEME_KEY, nextName)
}

export function initTheme(): void {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    const isDark = saved === "dark"
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
  } catch {
    document.documentElement.setAttribute("data-theme", "light")
  }
}
