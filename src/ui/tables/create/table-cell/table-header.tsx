import { ColType, TableContent } from "@/src/lib/definitions";
import { Updater } from "use-immer";
import DropDownCell from "./drop-down-cell";

/** ヘッダー入力 */
export default function InputHeader(
  {
    colIdx,
    value,
    updateContent,
  }: {
    colIdx: number;
    value: string;
    updateContent: Updater<TableContent>;
  }
) {

  /** ヘッダー更新 */
  function changeHeader(text: string) {
    updateContent(draft => {
      draft.cols[colIdx].name = text;
    });
  }

  /** 右に列を追加 */
  function addColToRight() {
    updateContent(draft => {
      draft.cols.splice(colIdx + 1, 0, { name: "", type: "text" });
      draft.rows.forEach(row => {
        row.splice(colIdx + 1, 0, "");
      });
    });
  }

  /** 列を削除 */
  function removeCol() {
    updateContent(draft => {
      draft.cols.splice(colIdx, 1);
      draft.rows.forEach(row => {
        row.splice(colIdx, 1);
      });
    });
  }

  /** 列の型を変更 */
  function changeMode(type: ColType) {
    updateContent(draft => {
      draft.cols[colIdx].type = type;
    });
  }

  return (
    <>
      <DropDownCell
        summary={
          <input
            type="text"
            value={value}
            onChange={e => changeHeader(e.target.value)}
            placeholder={"列" + (colIdx + 1)}
            className='rounded-md'
          />
        }
        menu={[
          {
            label: "右に列を追加",
            onClick: addColToRight,
          }, {
            label: "この列を削除",
            onClick: removeCol,
          }, {
            label: "列の型を変更",
            onClick: [
              {
                label: "文字列",
                onClick: () => changeMode("text")
              }, {
                label: "数値",
                onClick: () => changeMode("number")
              }, {
                label: "日付",
                onClick: () => changeMode("date")
              }, {
                label: "時刻",
                onClick: () => changeMode("time")
              }
            ],
          },
        ]}
      />
    </>
  );
};