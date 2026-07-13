const url = process.env.SSR_META_URL || 'http://localhost:3000/'
const expectedImage = process.env.SSR_EXPECT_DEFAULT_OG === 'true'
  ? 'https://cdn.sdnsukorame2kotakediri.sch.id/images/og/sdn-sukorame-2-v1.jpg'
  : 'https://cdn.sdnsukorame2kotakediri.sch.id/.+\\.(?:jpe?g|png)'
const response = await fetch(url, { headers: { 'user-agent': 'facebookexternalhit/1.1' } })
if (!response.ok) throw new Error(`SSR endpoint returned HTTP ${response.status}`)

const html = await response.text()
const expected = [
  ['title', /<title>Beranda \| SDN Sukorame 2<\/title>/i],
  ['description', /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i],
  ['og:title', /<meta[^>]+property=["']og:title["'][^>]+content=["']Beranda["']/i],
  ['og:type', /<meta[^>]+property=["']og:type["'][^>]+content=["']website["']/i],
  ['og:url', /<meta[^>]+property=["']og:url["'][^>]+content=["']https:\/\/sdnsukorame2kotakediri\.sch\.id\/["']/i],
  ['og:image', new RegExp(`<meta[^>]+property=["']og:image["'][^>]+content=["']${expectedImage}["']`, 'i')],
  ['og:image:url', new RegExp(`<meta[^>]+property=["']og:image:url["'][^>]+content=["']${expectedImage}["']`, 'i')],
  ['og:image:secure_url', new RegExp(`<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']${expectedImage}["']`, 'i')],
  ['og:image:type', /<meta[^>]+property=["']og:image:type["'][^>]+content=["']image\/(?:jpeg|png)["']/i],
  ['og:image:width', /<meta[^>]+property=["']og:image:width["'][^>]+content=["']1200["']/i],
  ['og:image:height', /<meta[^>]+property=["']og:image:height["'][^>]+content=["']630["']/i],
  ['og:image:alt', /<meta[^>]+property=["']og:image:alt["'][^>]+content=["'][^"']+["']/i],
  ['twitter:card', /<meta[^>]+name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i],
  ['twitter:title', /<meta[^>]+name=["']twitter:title["'][^>]+content=["']Beranda["']/i],
  ['twitter:description', /<meta[^>]+name=["']twitter:description["'][^>]+content=["'][^"']+["']/i],
  ['twitter:image', new RegExp(`<meta[^>]+name=["']twitter:image["'][^>]+content=["']${expectedImage}["']`, 'i')],
  ['twitter:image:alt', /<meta[^>]+name=["']twitter:image:alt["'][^>]+content=["'][^"']+["']/i],
  ['canonical', /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/sdnsukorame2kotakediri\.sch\.id\/["']/i],
]

for (const [name, pattern] of expected) {
  if (!pattern.test(html)) throw new Error(`Metadata SSR ${name} tidak ditemukan atau tidak sesuai`)
}

for (const name of ['og:title', 'og:url', 'og:image']) {
  const matches = html.match(new RegExp(`property=["']${name.replace(':', '\\:')}["']`, 'gi')) || []
  if (matches.length !== 1) throw new Error(`Metadata ${name} harus hanya memiliki satu nilai efektif; ditemukan ${matches.length}`)
}
for (const name of ['twitter:card']) {
  const matches = html.match(new RegExp(`name=["']${name.replace(':', '\\:')}["']`, 'gi')) || []
  if (matches.length !== 1) throw new Error(`Metadata ${name} harus hanya memiliki satu nilai efektif; ditemukan ${matches.length}`)
}
const canonicalMatches = html.match(/rel=["']canonical["']/gi) || []
if (canonicalMatches.length !== 1) throw new Error(`Canonical harus hanya memiliki satu nilai efektif; ditemukan ${canonicalMatches.length}`)
if (/undefined|null|\[object Object\]/i.test(html.match(/<head[\s\S]*?<\/head>/i)?.[0] || '')) throw new Error('Head SSR masih memuat nilai tidak valid')

console.log(`Metadata SSR valid untuk ${url}`)
