'use client'

import { TableContent, TableFilter, TableSort } from "@/src/lib/definitions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useImmer } from "use-immer";
import { lusitana } from "../../fonts";
import InputFilters from "./input-filter";
import InputSorts from "./input-sort";
import InputView from "./input-view";
import ViewTable from "./view-table";

export default function DataTable(
  {
    content,
    title,
  }: {
    title: string;
    content: TableContent;
  }
) {

  const { cols } = content;
  const [filters, setFilters] = useImmer<TableFilter[]>([]);
  const [sorts, setSorts] = useImmer<TableSort[]>([]);
  const [view, setView] = useImmer(cols.map(c => true));
  const [open, setOpen] = useState(0);

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

  const options = [
    "フィルター",
    "ソート",
    "表示列"
  ]

  const controls = [
    <InputFilters cols={cols} filters={filters} setFilters={setFilters} />,
    <InputSorts cols={cols} sorts={sorts} setSorts={setSorts} />,
    <InputView cols={cols} view={view} setView={setView} />,
  ]

  return (
    <div className="text-gray-700 flex flex-col gap-2">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>
              {title}
            </h1>
            <label htmlFor="my-drawer-4" className="drawer-button rounded-md border p-2 hover:bg-gray-100 cursor-pointer">
              <Bars3Icon className="w-6" onClick={() => setOpen(-1)}/>
            </label>
          </div>
          <div className="">
            <ViewTable content={forView} />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="bg-white min-h-full min-w-96">
            {
              open == -1 &&
              <ul className="menu text-base-content">
                {
                  options.map((o, i) => (
                    <li key={i}>
                      <button
                        onClick={() => setOpen(i)}
                        className="flex items-center">
                        <span>{o}</span>
                        <ChevronRightIcon className="w-8" />
                      </button>
                    </li>
                  ))
                }
              </ul>
            }
            {
              open >= 0 &&
              <div className="flex flex-col gap-2 p-2">
                <div className="hover:bg-gray-200 duration-200 p-1 rounded-lg cursor-pointer">
                  <button
                    onClick={() => setOpen(-1)}
                    className="flex items-center gap-2 w-full">
                    <ChevronLeftIcon className="w-8 inline" />
                    <span className="text-lg">{options[open]}</span>
                  </button>
                </div>
                <div className="p-2">
                  {controls[open]}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );

};