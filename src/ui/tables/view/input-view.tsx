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
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-outline">
            列の表示
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg">
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
    </div>
  );

};