import { Col } from "@/src/lib/definitions";
import { Updater } from "use-immer";

export default function InputView(
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
    <div className="flex flex-col gap-2">
      <div className="w-max">
        <ul className="menu bg-base-100 rounded-box min-w-52">
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

    </div>
  );

};