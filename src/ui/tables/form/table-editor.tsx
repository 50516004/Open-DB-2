import { TableContent } from "@/src/lib/definitions";
import { ChangeEvent } from "react";
import { Updater } from "use-immer";

export default function Table(
  { 
    content, 
    updateContent
  }: { 
    content: TableContent, 
    updateContent: Updater<TableContent>
  }
) {
  const { headers, records } = content;

  function handleInputHeader(
    e: ChangeEvent<HTMLInputElement>, 
    i: number
  ) {
    updateContent(draft => {
      draft.headers[i] = e.target.value;
    });
  }

  function handleInputRecords(
    e: ChangeEvent<HTMLInputElement>, 
    i: number, 
    j: number
  ) {
    updateContent(draft => {
      draft.records[i][j] = e.target.value;
    });
  }

  return (
    <table className='border-collapse border'>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>
              <input
                type="text"
                value={header}
                onChange={(e) => handleInputHeader(e, i)}
                placeholder={"列" + (i + 1)}
                className='w-full'
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((rec, i) => (
          <tr key={i}>
            {rec.map((cel, j) => (
              <td key={j}>
                <input
                  type="text"
                  value={cel}
                  onChange={(e) => handleInputRecords(e, i, j)}
                  className='w-full'
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};