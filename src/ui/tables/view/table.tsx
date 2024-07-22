'use client'

import { TableContent, TableFilter, TableSort } from "@/src/lib/definitions";
import InputFilters from "@/src/ui/tables/view/input-filter";
import { useImmer } from "use-immer";
import InputViewButton from "./input-view-button";
import Header from "./view-header";

export default function DataTable(
  {
    content,
  }: {
    content: TableContent;
  }
) {

  const [filters, setFilters] = useImmer<TableFilter[]>([]);
  const [sort, setSorts] = useImmer<TableSort>({
    colIndex: undefined,
    comparator: (s1, s2) => 0,
  });
  const [view, setView] = useImmer(content.cols.map(c => true));

  // リセットボタン
  function reset() {
    setFilters(draft => draft = []);
    setSorts(draft => draft.colIndex = undefined);
    setView(draft => draft = content.cols.map(() => true));
  }

  // フィルター適用
  const filtered = {
    ...content,
    rows: content.rows.filter(row => {
      for (const filter of filters) {
        if (filter.colIndex == undefined) continue;
        const value = row[filter.colIndex];
        if (!filter.predicate(value)) {
          return false;
        }
      }
      return true;
    }),
  };

  // ビュー適用
  const forView = {
    cols: filtered.cols.filter((col, i) => view[i]),
    rows: filtered.rows.map(row => row.filter((cel, col) => view[col])),
  };

  // ソート適用
  const { colIndex, comparator } = sort;
  if (colIndex != undefined) {
    forView.rows.sort((row1, row2) => {
      return comparator(row1[colIndex], row2[colIndex]);
    });
  }

  const {cols, rows} = forView;

  return (
    <div className="text-gray-700 flex flex-col gap-2">
      <div className="flex justify-between">
        <div>
          <InputFilters cols={content.cols} filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex gap-2">
            <InputViewButton cols={content.cols} view={view} setView={setView} />
            <button
              onClick={reset}
              className="btn"
            >リセット</button>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 p-2 pt-0 rounded-lg">
        <div className="overflow-x-scroll">
          <table className='min-w-full w-max text-gray-900 table rounded-lg '>
            <thead className="rounded-lg text-sm font-normal">
              <tr>
                {cols.map((col, i) => (
                  <Header
                    key={i}
                    col={i}
                    value={col.name}
                    sort={sort}
                    setSorts={setSorts}
                    className="cursor-pointer hover:bg-base-300 duration-150" />
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-100 duration-0"
                >
                  {row.map((col, j) => (
                    <td
                      key={j}
                      className='border border-x-gray-200 border-y-gray-200 px-4 py-1'
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

};