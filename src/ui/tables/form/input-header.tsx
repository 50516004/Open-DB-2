import { ColType, TableContent } from "@/src/lib/definitions";
import { ChangeEvent, useRef } from "react";
import { Updater } from "use-immer";
import DropDownCell from "./drop-down-cell";

/** ヘッダー入力欄 */
export default function InputHeader(
  {
    col,
    value,
    updateContent,
  }: {
    col: number;
    value: string;
    updateContent: Updater<TableContent>;
  }
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  /** ヘッダー更新 */
  function changeHeader(e: ChangeEvent<HTMLInputElement>) {
    updateContent(draft => {
      draft.cols[col].name = e.target.value;
    });
  }

  /** 右に列を追加 */
  function addColToRight() {
    updateContent(draft => {
      draft.cols.splice(col + 1, 0, { name: "", type: "text" });
      draft.rows.forEach(row => {
        row.splice(col + 1, 0, "");
      });
    });
  }

  /** 列を削除 */
  function removeCol() {
    updateContent(draft => {
      draft.cols.splice(col, 1);
      draft.rows.forEach(row => {
        row.splice(col, 1);
      });
    });
  }

  /** 列の型を変更 */
  function changeMode(type: ColType) {
    updateContent(draft => {
      draft.cols[col].type = type;
    });
  }

  function openDialog() {
    dialogRef.current?.showModal();
  }

  return (
    <>
      <DropDownCell
        summary={
          <input
            type="text"
            value={value}
            onChange={changeHeader}
            placeholder={"列" + (col + 1)}
            className=''
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
          }, {
            label: "この列で置換",
            onClick: openDialog,
          },
        ]}
      />
      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">置換</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};