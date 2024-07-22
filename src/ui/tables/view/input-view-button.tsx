import { Col } from "@/src/lib/definitions";
import { Updater } from "use-immer";

export default function InputViewButton(
  {
    cols,
    view,
    setView,
  }: {
    cols: Col[];
    view: boolean[];
    setView: Updater<boolean[]>;
  }
) {

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn">表示列</div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] shadow-lg w-max max-w-96 p-2">
        {
          cols.map((col, idx) => (
            <li key={idx}>
              <label className="label cursor-pointer">
                <span className="label-text">{col.name}</span>
                <input
                  type="checkbox"
                  checked={view[idx]}
                  onChange={e => {
                    setView(draft => {
                      draft[idx] = e.target.checked;
                    });
                  }}
                  className="" />
              </label>
            </li>
          ))
        }
      </ul>
    </div>
  );

};