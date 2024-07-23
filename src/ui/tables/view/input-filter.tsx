import { Col, TableFilter } from "@/src/lib/definitions";
import { useState } from "react";
import { Updater } from "use-immer";

/**
 * フィルター入力コンポーネント
 * @param param0 
 * @returns 
 */
export default function InputFilters(
  {
    cols,
    filters,
    setFilters,
  }: {
    cols: Col[];
    filters: TableFilter[];
    setFilters: Updater<TableFilter[]>;
  }
) {

  /** フィルターを追加 */
  function addfilter() {
    setFilters(draft => {
      draft.push({
        colIdx: 0,
        predicate: (s) => true,
      });
    });
  }

  /** フィルターをすべて削除 */
  function removeAllfilter() {
    setFilters(draft => {
      draft.splice(0);
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {
        filters.map((filter, idx) => (
          <InputFilter
            key={idx}
            index={idx}
            filter={filter}
            setFilters={setFilters}
            cols={cols}
          />
        ))
      }
      <div className="flex gap-2">
        <button
          onClick={addfilter}
          className="btn">
          フィルターを追加
        </button>
        {
          filters.length > 0 &&
          <button
            onClick={removeAllfilter}
            className="btn">
            すべて削除
          </button>
        }
      </div>
    </div>
  );

};

const methods = ["を含む", "以下", "以上"];

/**
 * フィルター単品コンポーネント
 * @param param0 
 * @returns 
 */
function InputFilter(
  {
    index,
    filter,
    setFilters,
    cols,
  }: {
    index: number;
    filter: TableFilter;
    setFilters: Updater<TableFilter[]>;
    cols: Col[];
  }
) {

  const [criteria, setCriteria] = useState("");
  const [methodId, setMethodId] = useState(0);

  /** 評価列を選択 */
  function selectCol(select: number) {
    setFilters(draft => {
      draft[index].colIdx = select;
    });
  }

  /** 評価関数を更新 */
  function setPredicate(criteria: string, methodId: number) {
    setFilters(draft => {
      draft[index].predicate = (cell) => {
        switch (methodId) {
          case 0: return cell.includes(criteria);
          case 1: return parseFloat(cell) < parseFloat(criteria);
          case 2: return parseFloat(cell) > parseFloat(criteria);
          default: return true;
        }
      };
    });
  }

  /** フィルターを削除 */
  function removeFilter() {
    setFilters(draft => {
      draft.splice(index, 1);
    });
  }

  return (
    <div className="flex gap-1 items-center">
      {/* 評価列の選択 */}
      <select
        value={filter.colIdx}
        onChange={e => {
          const input = parseInt(e.target.value);
          console.log(input);
          selectCol(input);
        }}
        className="select select-bordered select-sm text-xs focus:outline-offset-0 focus:outline-sky-300"
      >
        {
          cols.map((col, i) => (
            <option key={i} value={i}>{col.name}</option>
          ))
        }
      </select>
      {/* 評価基準の入力 */}
      <input
        type="text"
        value={criteria}
        onChange={e => {
          const input = e.target.value;
          setCriteria(input);
          setPredicate(input, methodId);
        }}
        className="input input-bordered input-sm focus:outline-offset-0 focus:outline-sky-300"
      />
      {/* 評価手法の入力 */}
      <select
        value={methodId}
        onChange={e => {
          const input = parseInt(e.target.value);
          setMethodId(input);
          setPredicate(criteria, input);
        }}
        className="select select-bordered select-sm text-xs focus:outline-offset-0 focus:outline-sky-300"
      >
        {
          methods.map((method, i) => (
            <option key={i} value={i}>{method}</option>
          ))
        }
      </select>
      {/* 削除ボタン */}
      <button
        onClick={removeFilter}
        className="btn btn-secondary btn-outline btn-sm">
        削除
      </button>
    </div>
  );

}