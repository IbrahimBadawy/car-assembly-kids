const BASE = import.meta.env.BASE_URL

export function assetPath(path) {
  // path like "assets/images/LOGO.jpg" → BASE + path
  return `${BASE}${path}`
}
