import { Col, Comparator, TableSort } from "@/src/lib/definitions";
import { useState } from "react";
import { Updater } from "use-immer";

/**
 * ソート入力コンポーネント
 * @param param0 
 * @returns 
 */
export default function InputSorts(
  {
    cols,
    sorts,
    setSorts,
  }: {
    cols: Col[];
    sorts: TableSort[];
    setSorts: Updater<TableSort[]>;
  }
) {

  /** フィルターを追加 */
  function addSort() {
    setSorts(draft => {
      draft.push({
        colIndex: undefined,
        comparator: comparator(0),
      });
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {
        sorts.map((sort, idx) => (
          <InputSort
            key={idx}
            cols={cols}
            index={idx}
            sort={sort}
            setSorts={setSorts}
          />
        ))
      }
      <div>
        <button
          onClick={addSort}
          className="btn btn-outline"
        >
          ソート追加
        </button>
      </div>
    </div>
  );

};

/** 比較方法 */
const methods = ["降順", "昇順"];
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

/**
 * ソート単品コンポーネント
 * @param param0 
 * @returns 
 */
function InputSort(
  {
    cols,
    index,
    sort,
    setSorts,
  }: {
    cols: Col[];
    index: number;
    sort: TableSort;
    setSorts: Updater<TableSort[]>;
  }
) {

  const [methodId, setMethodId] = useState(0);

  /** 比較列を選択 */
  function selectCol(select: number) {
    setSorts(draft => {
      draft[index].colIndex = select;
    });
  }

  /** 比較関数を更新 */
  function setComparator(methodId: number) {
    setSorts(draft => {
      draft[index].comparator = comparator(methodId);
    });
  }

  /** ソートを削除 */
  function removeSort() {
    setSorts(draft => {
      draft.splice(index, 1);
    });
  }

  return (
    <div className="flex gap-2">
      {/* 列の選択 */}
      <select
        value={sort.colIndex}
        onChange={e => {
          const input = parseInt(e.target.value);
          selectCol(input);
        }}
        className="select select-bordered"
      >
        <option disabled selected>列を選択</option>
        {
          cols.map((col, i) => (
            <option key={i} value={i}>{col.name}</option>
          ))
        }
      </select>
      {/* 評価手法の入力 */}
      <select
        value={methodId}
        onChange={e => {
          const input = parseInt(e.target.value);
          setMethodId(input);
          setComparator(input);
        }}
        className="select select-bordered"
      >
        {
          methods.map((method, i) => (
            <option key={i} value={i}>{method}</option>
          ))
        }
      </select>
      {/* 削除ボタン */}
      <button
        onClick={removeSort}
        className="btn btn-secondary btn-outline">
        削除
      </button>
    </div>
  );

};