'use client'

import { TableContent, TableFilter, TableSort } from "@/src/lib/definitions";
import { useImmer } from "use-immer";
import InputFilters from "./input-filter";
import InputSorts from "./input-sort";
import InputView from "./input-view";
import ViewTable from "./view-table";

export default function DataTable(
  { content }: { content: TableContent }
) {

  const { cols } = content;
  const [filters, setFilters] = useImmer<TableFilter[]>([]);
  const [sorts, setSorts] = useImmer<TableSort[]>([]);
  const [view, setView] = useImmer(cols.map(c => true));

  // フィルター適用
  const filtered = {
    ...content,
    rows: content.rows.filter(row => {
      for (const filter of filters) {
        if (!filter.colIndex) continue;
        const value = row[filter.colIndex];
        if (!filter.predicate(value)) {
          return false;
        }
      }
      return true;
    }),
  };

  // ソート適用
  sorts.toReversed().forEach(sort => {
    const { colIndex, comparator } = sort;
    if (colIndex) {
      filtered.rows.sort((row1, row2) => {
        return comparator(row1[colIndex], row2[colIndex]);
      });
    }
  });

  // ビュー適用
  const forView = {
    cols: filtered.cols.filter((col, i) => view[i]),
    rows: filtered.rows.map(row => row.filter((cel, col) => view[col])),
  };

  return (
    <div className="mt-4 w-max text-gray-700 flex flex-col gap-2">
      <InputFilters cols={cols} filters={filters} setFilters={setFilters} />
      <InputSorts cols={cols} sorts={sorts} setSorts={setSorts} />
      <InputView cols={cols} view={view} setView={setView} />
      <ViewTable content={forView} />
    </div>
  );

};