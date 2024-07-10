import { TableContent } from "@/src/lib/definitions";
import { Updater } from "use-immer";
import InputHeader from "./input-header";
import InputRecords from "./input-records";

/** テーブルフォーム */
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
          {cols.map((col, i) => (
            <th key={i}>
              <InputHeader
                col={i}
                value={col.name}
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
            {record.map((cell, j) => (
              <td key={j}>
                <InputRecords
                  row={i}
                  col={j}
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