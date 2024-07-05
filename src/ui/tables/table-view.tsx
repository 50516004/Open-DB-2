'use client'
import { TableContent } from "@/src/lib/definitions";

export default function TableView(
  { content }: { content: TableContent }
) {

  const { headers, records } = content;

  return (
    <table className='border-collapse border'>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className='border border-gray-300 px-4 py-2'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((record, i) => (
          <tr key={i}>
            {record.map((col, j) => (
              <td key={j} className='border border-gray-300 px-4 py-2'>
                {typeof col === "number" ? <i>{col}</i> : col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

};