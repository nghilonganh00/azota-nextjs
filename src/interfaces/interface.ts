export type Tab = {
  name: string;
  value: any;
};

export interface APIErrorReponse {
  error: string;
  message: string;
  detail?: string;
}

export type QueryParams = {
  page?: number;
  limit?: number;
  searchField?: string;
  searchKeyword?: string;
  sortField?: string;
  sortOrder?: string;
};
