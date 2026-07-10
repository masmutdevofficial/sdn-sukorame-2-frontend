export interface PageLink {
  label: string
  url: string
}

export interface HomeStat {
  value: string
  label: string
}

export interface SchoolValue {
  letter: string
  label: string
  icon: string
  tone: string
}

export interface HomePageContent {
  slug: 'beranda'
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    title: string
    highlightedTitle: string
    description: string
    image: string
    imageAlt: string
    primaryAction: PageLink
    secondaryAction: PageLink
    cardTitle: string
    cardDescription: string
    leftBadgeTitle: string
    leftBadgeDescription: string
    rightBadgeTitle: string
    rightBadgeDescription: string
    stats: HomeStat[]
  }
  welcome: {
    eyebrow: string
    title: string
    paragraphs: string[]
    quote: string
    headmasterName: string
    headmasterRole: string
    image: string
    imageAlt: string
    action: PageLink
  }
  values: {
    eyebrow: string
    title: string
    description: string
    items: SchoolValue[]
  }
  programs: {
    eyebrow: string
    title: string
    description: string
    action: PageLink
    itemLimit: number
  }
  news: {
    eyebrow: string
    title: string
    action: PageLink
    itemLimit: number
  }
  callToAction: {
    eyebrow: string
    title: string
    description: string
    primaryAction: PageLink
    secondaryAction: PageLink
  }
  updatedAt: string
}

export interface PageContentRepository<T> {
  get(slug: string): Promise<T>
  update(slug: string, data: T): Promise<T>
  reset(slug: string): Promise<T>
}
