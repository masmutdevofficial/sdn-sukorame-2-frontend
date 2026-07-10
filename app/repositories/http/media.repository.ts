import type { AssetRepository } from '~/repositories/contracts/media.repository'
import type { MediaAsset } from '~/types/media'
import { apiRequest, R2_PUBLIC_URL } from './api'

export const mediaRepository: AssetRepository = {
  async upload(file, alt = '') {
    const isPdf = file.type === 'application/pdf'
    if (!isPdf && !['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) throw new Error('Format file tidak didukung')
    if (file.size > (isPdf ? 10 : 2) * 1024 * 1024) throw new Error(`Ukuran ${isPdf ? 'PDF maksimal 10 MB' : 'gambar maksimal 2 MB'}`)
    const body = new FormData()
    body.append('file', file)
    body.append('alt', alt)
    const asset = await apiRequest<MediaAsset>('/admin/media', { method: 'POST', body })
    const uploadedUrl = new URL(asset.url)
    if (uploadedUrl.origin !== R2_PUBLIC_URL) throw new Error('Backend mengembalikan URL media di luar CDN resmi')
    return asset
  },
  async remove(id) { await apiRequest(`/admin/media/${encodeURIComponent(id)}`, { method: 'DELETE' }) },
}
