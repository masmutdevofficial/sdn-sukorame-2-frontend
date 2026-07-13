export interface ExtraMetaTag {
  id: string
  name: string
  property: string
  content: string
}

export interface SocialLink {
  label: string
  url: string
  icon: string
  enabled: boolean
}

export interface WebSettings {
  siteTitle: string
  titleTemplate: string
  description: string
  keywords: string[]
  author: string
  robots: string
  canonicalBaseUrl: string
  themeColor: string
  locale: string
  logo: string
  favicon: string
  metaImage: string
  metaImageAlt: string
  metaImageWidth: number
  metaImageHeight: number
  metaImageType: 'image/jpeg' | 'image/png'
  twitterCard: string
  twitterSite: string
  twitterCreator: string
  extraMetaTags: ExtraMetaTag[]
  socialMedia: {
    facebook: SocialLink
    instagram: SocialLink
    tiktok: SocialLink
    youtube: SocialLink
  }
}

export const DEFAULT_OG_IMAGE_URL = 'https://cdn.sdnsukorame2kotakediri.sch.id/images/og/sdn-sukorame-2-v1.jpg'

const social = (label: string, icon: string): SocialLink => ({ label, url: '', icon, enabled: false })

export const defaultWebSettings = (): WebSettings => ({
  siteTitle: 'SD Negeri Sukorame 2 Kota Kediri',
  titleTemplate: '%s | SDN Sukorame 2',
  description: 'Website resmi SD Negeri Sukorame 2 Kota Kediri.',
  keywords: ['SD Negeri Sukorame 2', 'SDN Sukorame 2', 'Sekolah Dasar Kota Kediri'],
  author: 'SD Negeri Sukorame 2 Kota Kediri',
  robots: 'index, follow',
  canonicalBaseUrl: 'https://sdnsukorame2kotakediri.sch.id',
  themeColor: '#123a63',
  locale: 'id_ID',
  logo: 'https://cdn.sdnsukorame2kotakediri.sch.id/logo.png',
  favicon: 'https://cdn.sdnsukorame2kotakediri.sch.id/favicon.ico',
  metaImage: DEFAULT_OG_IMAGE_URL,
  metaImageAlt: 'Logo SD Negeri Sukorame 2 Kota Kediri',
  metaImageWidth: 1200,
  metaImageHeight: 630,
  metaImageType: 'image/jpeg',
  twitterCard: 'summary_large_image',
  twitterSite: '',
  twitterCreator: '',
  extraMetaTags: [],
  socialMedia: {
    facebook: social('Facebook', '/images/facebook.svg'),
    instagram: social('Instagram', '/images/instagram.svg'),
    tiktok: social('TikTok', '/images/tik-tok.svg'),
    youtube: social('YouTube', '/images/youtube.svg'),
  },
})

const inferOgImageType = (url: string): WebSettings['metaImageType'] | null => {
  try {
    const extension = new URL(url).pathname.split('.').pop()?.toLowerCase()
    if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg'
    if (extension === 'png') return 'image/png'
  } catch { /* Invalid old values are replaced with the safe default below. */ }
  return null
}

const positiveInteger = (value: unknown, fallback: number) => Number.isInteger(Number(value)) && Number(value) > 0 ? Number(value) : fallback

/** Keeps pages SSR-safe while a deployment still reads legacy JSON settings from MySQL. */
export const normalizeWebSettings = (value: Partial<WebSettings> = {}): WebSettings => {
  const fallback = defaultWebSettings()
  const sourceImage = String(value.metaImage || '').trim()
  const sourceImageType = inferOgImageType(sourceImage)
  const metaImage = !sourceImage || /\/images\/no-image\.png(?:$|[?#])/i.test(sourceImage) || !sourceImageType
    ? fallback.metaImage
    : sourceImage
  const metaImageType = metaImage === fallback.metaImage
    ? fallback.metaImageType
    : value.metaImageType === 'image/jpeg' || value.metaImageType === 'image/png'
      ? value.metaImageType
      : sourceImageType || fallback.metaImageType
  return {
    ...fallback,
    ...value,
    canonicalBaseUrl: String(value.canonicalBaseUrl || fallback.canonicalBaseUrl).replace(/\/+$/, ''),
    metaImage,
    metaImageAlt: String(value.metaImageAlt || fallback.metaImageAlt).trim() || fallback.metaImageAlt,
    metaImageWidth: positiveInteger(value.metaImageWidth, fallback.metaImageWidth),
    metaImageHeight: positiveInteger(value.metaImageHeight, fallback.metaImageHeight),
    metaImageType,
    extraMetaTags: Array.isArray(value.extraMetaTags) ? value.extraMetaTags : fallback.extraMetaTags,
    socialMedia: { ...fallback.socialMedia, ...value.socialMedia },
  }
}
