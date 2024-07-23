'use client'

import { TableContent, TableFilter, TableSort } from "@/src/lib/definitions";
import InputFilters from "@/src/ui/tables/view/input-filter";
import { useImmer } from "use-immer";
import InputView from "./input-view-button";
import TableData from "./table-data";
import TableHeader from "./table-header";

export default function DataTable(
  {
    content,
  }: {
    content: TableContent;
  }
) {

  const initSort: TableSort = {
    colIdx: undefined,
    comparator: (row1, row2) => 0,
    reverse: false,
  };
  const initView = content.cols.map(c => true);

  const [filters, setFilters] = useImmer<TableFilter[]>([]);
  const [sort, setSort] = useImmer(initSort);
  const [view, setView] = useImmer(initView);

  // 表示状態リセット
  function reset() {
    setFilters(draft => draft = []);
    setSort(draft => {
      draft.colIdx = undefined;
      draft.reverse = false;
    });
    setView(draft => draft = initView);
  }

  // フィルター適用
  const filtered = {
    ...content,
    rows: content.rows.filter(row => (
      filters.every(filter => (
        filter.predicate(row[filter.colIdx])
      ))
    )),
  };

  // ビュー適用
  const forView = {
    cols: filtered.cols.filter((col, i) => view[i]),
    rows: filtered.rows.map(row => row.filter((cel, col) => view[col])),
  };

  // ソート適用
  if (sort.colIdx != undefined) {
    forView.rows.sort(sort.comparator);
    if (sort.reverse) {
      forView.rows.reverse();
    }
  };

  const { cols, rows } = forView;

  return (
    <div className="text-gray-700 flex flex-col gap-2">
      <div className="flex justify-between">
        <div>
          <InputFilters cols={content.cols} filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex gap-2">
            <button onClick={reset} className="btn">リセット</button>
            <InputView cols={content.cols} view={view} setView={setView} />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 p-2 pt-0 rounded-lg">
        <div className="overflow-x-scroll">
          <table className='min-w-full w-max text-gray-900 table rounded-lg '>
            <thead className="rounded-lg text-sm font-normal">
              <tr>
                {cols.map((col, i) => (
                  <TableHeader
                    key={i}
                    colIdx={i}
                    col={col}
                    sort={sort}
                    setSort={setSort}
                  />
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
                    <TableData
                      key={j}
                      type={cols[j].type}
                      value={col}
                    />
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