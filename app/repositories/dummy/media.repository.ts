import type { AssetRepository } from '~/repositories/contracts/media.repository'

const readAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result))
  reader.onerror = () => reject(new Error('Gambar gagal dibaca'))
  reader.readAsDataURL(file)
})

export const mediaRepository: AssetRepository = {
  async upload(file, alt = '') {
    if (!file.type.startsWith('image/')) throw new Error('File harus berupa gambar')
    if (file.size > 2 * 1024 * 1024) throw new Error('Ukuran gambar maksimal 2 MB')
    return {
      id: crypto.randomUUID(),
      url: await readAsDataUrl(file),
      filename: file.name,
      mimeType: file.type,
      size: file.size,
      alt,
    }
  },
  async remove() {},
}
