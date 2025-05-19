type SortingType = 'asc' | 'desc';

interface APIResponse<D> {
  data: D;
  meta?: {
    pagination: MetaResponseInterface
  };
}

interface MetaResponseInterface {
  page?: number;
  pageCount?: number;
  pageSize?: string;
  total?: number;
}

interface ErrorInterface<D> {
  data: string;
  error: D;
}