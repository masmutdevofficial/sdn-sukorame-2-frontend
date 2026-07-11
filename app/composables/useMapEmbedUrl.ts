export const normalizeMapEmbedUrl = (value?: string | null) => {
  const raw = String(value || '').trim()
  const iframeSrc = raw.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1]

  return (iframeSrc || raw).replaceAll('&amp;', '&').trim()
}
