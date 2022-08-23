export interface ICategory {
  /** 카테고리 id (e.g 1) */
  id: number;
  /** 카테고리명 (e.g 잡화) */
  name: string;
}

export interface ICategories {
  /** 카테고리 목록 (e.g. [{id: 1, name: '잡화'}]) */
  categories: ICategory[];
}
