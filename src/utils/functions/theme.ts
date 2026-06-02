const THEME_KEY = "martin-roncero-theme"

type ThemeColors = {
  "--color-primary": string
  "--color-secondary": string
  "--color-secondary-contrast": string
  "--color-background": string
  "--color-background-contrast": string
}

const lightTheme: ThemeColors = {
  "--color-primary": "rgb(21, 23, 22)",
  "--color-secondary": "rgb(255, 154, 117)",
  "--color-secondary-contrast": "rgb(255, 127, 80)",
  "--color-background": "#e8e8e8",
  "--color-background-contrast": "white",
}

const darkTheme: ThemeColors = {
  "--color-primary": "#e8e8e8",
  "--color-secondary": "rgb(20, 121, 20)",
  "--color-secondary-contrast": "rgb(16, 104, 56)",
  "--color-background": "rgb(21, 23, 22)",
  "--color-background-contrast": "rgb(40, 42, 41)",
}

function applyTheme(colors: ThemeColors): void {
  const root = document.documentElement
  Object.entries(colors).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}

export function toggleTheme(): void {
  const current = localStorage.getItem(THEME_KEY)
  const isDark = current === "dark"
  const nextTheme = isDark ? lightTheme : darkTheme
  const nextName = isDark ? "light" : "dark"

  applyTheme(nextTheme)
  localStorage.setItem(THEME_KEY, nextName)
}

export function initTheme(): void {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    const isDark = saved === "dark"
    applyTheme(isDark ? darkTheme : lightTheme)
  } catch {
    applyTheme(lightTheme)
  }
}
