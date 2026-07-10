import type { AssetRepository } from '~/repositories/contracts/media.repository'
import type { MediaAsset } from '~/types/media'
import { apiEnabled, apiRequest, R2_PUBLIC_URL } from '~/repositories/http/api'

const readAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result))
  reader.onerror = () => reject(new Error('Gambar gagal dibaca'))
  reader.readAsDataURL(file)
})

export const mediaRepository: AssetRepository = {
  async upload(file, alt = '') {
    const isPdf = file.type === 'application/pdf'
    if (!isPdf && !['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) throw new Error('Format file tidak didukung')
    if (file.size > (isPdf ? 10 : 2) * 1024 * 1024) throw new Error(`Ukuran ${isPdf ? 'PDF maksimal 10 MB' : 'gambar maksimal 2 MB'}`)
    if (apiEnabled()) {
      const body = new FormData(); body.append('file', file); body.append('alt', alt)
      const asset = await apiRequest<MediaAsset>('/admin/media', { method: 'POST', body })
      const uploadedUrl = new URL(asset.url)
      return { ...asset, url: `${R2_PUBLIC_URL}${uploadedUrl.pathname}` }
    }
    return {
      id: crypto.randomUUID(),
      url: await readAsDataUrl(file),
      filename: file.name,
      mimeType: file.type,
      size: file.size,
      alt,
    }
  },
  async remove(id) { if (apiEnabled()) await apiRequest(`/admin/media/${encodeURIComponent(id)}`, { method: 'DELETE' }) },
}
