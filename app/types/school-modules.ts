import type { ContentStatus } from '~/types/content'

export interface EditableSection { id: string; eyebrow: string; title: string; body: string; image: string; imageAlt: string }
export interface Teacher { id: string; name: string; role: string; bio: string; image: string; status: ContentStatus }
export interface AcademicDocument { id: string; title: string; description: string; file: string; filename: string; status: ContentStatus }
export interface ModuleCategory { id: string; name: string; description: string; status: ContentStatus }
export interface Activity { id: string; categoryId: string; title: string; description: string; date: string; images: string[]; status: ContentStatus }
export interface GalleryItem { id: string; title: string; description: string; image: string; status: ContentStatus }
export interface ContactSettings { title: string; description: string; address: string; email: string; phone: string; mapEmbedUrl: string; image: string }
export interface PpdbRequirement { id: string; text: string }
export interface PpdbStep { id: string; title: string; description: string }
export interface PpdbFaq { id: string; question: string; answer: string }
export interface PpdbSettings { title: string; description: string; startDate: string; endDate: string; countdownEnabled: boolean; image: string; requirements: PpdbRequirement[]; steps: PpdbStep[]; faqs: PpdbFaq[] }
export interface SchoolModulesData {
  profileSections: EditableSection[]
  teachers: Teacher[]
  academicDocuments: AcademicDocument[]
  studentCategories: ModuleCategory[]
  studentActivities: Activity[]
  informationCategories: ModuleCategory[]
  informationItems: Activity[]
  gallery: GalleryItem[]
  contact: ContactSettings
  ppdb: PpdbSettings
}

export interface SchoolModulesRepository {
  get(): Promise<SchoolModulesData>
  save(data: SchoolModulesData): Promise<SchoolModulesData>
  reset(): Promise<SchoolModulesData>
}
