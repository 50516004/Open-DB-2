import { TableContent } from "@/src/lib/definitions";
import { Updater } from "use-immer";
import InputData from "./table-cell/table-data";
import InputHeader from "./table-cell/table-header";

/** テーブル内容入力コンポーネント */
export default function InputTable(
  {
    content,
    updateContent,
  }: {
    content: TableContent;
    updateContent: Updater<TableContent>;
  }
) {

  const { cols, rows } = content;

  return (
    <table className='table-auto'>
      <thead>
        <tr>
          <th className="font-normal">
            No.
          </th>
          {cols.map((value, i) => (
            <th key={i}>
              <InputHeader
                colIdx={i}
                value={value.name}
                updateContent={updateContent}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((record, i) => (
          <tr key={i}>
            <td className="px-3">
              {i + 1}
            </td>
            {record.map((value, j) => (
              <td key={j}>
                <InputData
                  rowIdx={i}
                  colIdx={j}
                  content={content}
                  updateContent={updateContent}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};