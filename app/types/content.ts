export type ContentStatus='draft'|'published'|'archived'
export interface ContentItem { id:string; title:string; slug:string; excerpt:string; body:string; category:string; date:string; status:ContentStatus; icon?:string; image?:string }
export interface ListQuery { page?:number; perPage?:number; search?:string; status?:ContentStatus; category?:string; module?:'information'|'student'|'program'; sortBy?:string; sortOrder?:'asc'|'desc' }
export interface PaginationMeta { page:number; perPage:number; total:number; totalPages:number }
export interface PaginatedData<T>{items:T[];meta:PaginationMeta}
export interface CrudRepository<T,C=Partial<T>,U=Partial<T>> { list(q?:ListQuery):Promise<PaginatedData<T>>;getById(id:string):Promise<T|null>;create(data:C):Promise<T>;update(id:string,data:U):Promise<T>;remove(id:string):Promise<void> }
