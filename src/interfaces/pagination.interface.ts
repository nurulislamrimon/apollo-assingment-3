export interface IPaginationOptions {
  sortBy?: string;
  sortOrder?: "asc" | "desc" | 1 | -1;
  limit?: number;
  page?: number;
}
