import { Col, TableFilter } from "@/src/lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
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
        colIndex: undefined,
        predicate: (s) => true,
      });
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
      <div>
        <button
          onClick={addfilter}
          className="rounded-md border p-2 hover:bg-gray-100"
        >
          <PlusIcon className="w-5" />
        </button>
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
      draft[index].colIndex = select;
    });
  }

  /** 評価関数を更新 */
  function setPredicate(criteria: string, methodId: number) {
    setFilters(draft => {
      draft[index].predicate = (cell) => {
        switch (methodId) {
          case 0: return cell.includes(criteria);
          case 1: return cell < (criteria);
          case 2: return cell > (criteria);
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
    <div className="flex gap-2">
      {/* 列の選択 */}
      <select
        value={filter.colIndex}
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
      {/* 評価基準の入力 */}
      <input
        type="text"
        value={criteria}
        onChange={e => {
          const input = e.target.value;
          setCriteria(input);
          setPredicate(input, methodId);
        }}
        className="input input-bordered"
      />
      {/* 評価手法の入力 */}
      <select
        value={methodId}
        onChange={e => {
          const input = parseInt(e.target.value);
          setMethodId(input);
          setPredicate(criteria, input);
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
        onClick={removeFilter}
        className="btn btn-secondary btn-outline">
        削除
      </button>
    </div>
  );

}