export type ToastType = 'success' | 'error' | 'warning' | 'info'
export interface ToastItem { id: string; type: ToastType; title: string; message: string }
export interface AdminAccount { name: string; email: string; level: string; avatar: string; password?: string }
