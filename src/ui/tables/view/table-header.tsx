import { Col, Comparator, Row, TableSort } from "@/src/lib/definitions";
import { ArrowDownIcon, ArrowsUpDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { Updater } from "use-immer";

type SortDir = "UP" | "DOWN";
const defaultDir: SortDir = "DOWN";

/** テーブルヘッダコンポーネント */
export default function TableHeader(
  {
    colIdx,
    col,
    sort,
    setSort,
  }: {
    colIdx: number;
    col: Col;
    sort: TableSort;
    setSort: Updater<TableSort>;
  }
) {
  const isNotSorted = (sort.colIdx != colIdx);

  /** ソートアイコン */
  const Icon = (function () {
    if (isNotSorted) {
      return ArrowsUpDownIcon;
    } else if (sort.reverse) {
      return ArrowDownIcon;
    } else {
      return ArrowUpIcon;
    }
  }());

  /** 比較関数作成 */
  function comparator(): Comparator<Row> {
    if (col.type == "number") {
      return (row1, row2) => {
        return parseFloat(row2[colIdx]) - parseFloat(row1[colIdx]);
      }
    }

    return (row1, row2) => {
      if (row1[colIdx] > row2[colIdx]) return -1;
      if (row1[colIdx] < row2[colIdx]) return 1;
      return 0;
    }
  };

  /** ソートを追加 */
  function addSort() {
    setSort(draft => {
      draft.colIdx = colIdx;
      draft.comparator = comparator();
      draft.reverse = !(isNotSorted || draft.reverse);
    });
  }

  return (
    <th
      onClick={addSort}
      className="cursor-pointer hover:bg-base-300 duration-150">
      <div className="flex gap-2 items-center">
        <span>{col.name}</span>
        <Icon className="w-5" />
      </div>
    </th>
  );
}