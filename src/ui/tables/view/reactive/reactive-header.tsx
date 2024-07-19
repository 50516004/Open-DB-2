import { Comparator, TableSort } from "@/src/lib/definitions";
import { ArrowDownIcon, ArrowsUpDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Updater } from "use-immer";

/**
 * 比較関数作成
 * @param id 
 * @returns 
 */
function comparator(id: number): Comparator<string> {
  if (id == 0) {
    return (s1, s2) => {
      if (s1 > s2) return -1;
      if (s1 < s2) return 1;
      return 0;
    }
  }

  if (id == 1) {
    return (s1, s2) => {
      if (s1 < s2) return -1;
      if (s1 > s2) return 1;
      return 0;
    }
  }

  return (s1, s2) => 0;
}

export default function ReactiveHeader(
  {
    col,
    value,
    sort,
    setSorts,
    className,
  }: {
    col: number;
    value: string;
    sort: TableSort;
    setSorts: Updater<TableSort>;
    className: string | undefined;
  }
) {
  const [state, setState] = useState(0);
  const isNotSorted = (sort.colIndex != col)

  const Arrows = [ArrowDownIcon, ArrowUpIcon];
  const Icon = isNotSorted ? ArrowsUpDownIcon : Arrows[state];

  /** ソートを追加 */
  function addSort() {
    setSorts(draft => {
      draft.colIndex = col;
      draft.comparator = comparator(isNotSorted ? 0 : state);
    });
    setState(state == 0 ? 1 : 0);
  }

  return (
    <th
      onClick={addSort}
      className={className}>
      <div className="flex gap-2 items-center">
        <span>{value}</span>
        <Icon className="w-5" />
      </div>
    </th>
  );
}