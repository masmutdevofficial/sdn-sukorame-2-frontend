export interface MediaAsset {
  id: string
  url: string
  filename: string
  mimeType: string
  size: number
  alt: string
}

export interface MediaRepository {
  upload(file: File, alt?: string): Promise<MediaAsset>
  remove(id: string): Promise<void>
}
