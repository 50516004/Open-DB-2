// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

// Open-DB

/** テーブル情報 */
export type TableInfo = {
  table_id: string;
  creator_id: string;
  title: string;
  updated_at: string;
  view: number;
  content_url: string;
};

/** テーブル情報(表示用) */
export type TableInfoView = Omit<TableInfo, 'creator_id'> & {
  name: string;
};

/** 列タイプ */
export type ColType = 'text'|'number'|'date'|'time';

/** 列 */
export type Col = {
  name: string;
  type: ColType;
}

/** テーブルコンテンツ */
export type TableContent = {
  cols: Col[];
  rows: string[][];
};

/** 評価関数 */
export type Predicate<T> = (t:T) => boolean;

/** 比較関数 */
export type Comparator<T> = (o1:T, o2:T) => number;

/** 評価方法 */
export type FilterOperation = "equal" | "include";

/** テーブルフィルター */
export type TableFilter = {
  colIndex: number | undefined;
  predicate: Predicate<string>;
}

/** テーブルソート */
export type TableSort = {
  colIndex: number | undefined;
  comparator: Comparator<string>;
}