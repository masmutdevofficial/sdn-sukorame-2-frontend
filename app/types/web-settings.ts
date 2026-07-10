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
  metaImage: 'https://cdn.sdnsukorame2kotakediri.sch.id/images/no-image.png',
  metaImageAlt: 'Logo SD Negeri Sukorame 2 Kota Kediri',
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
