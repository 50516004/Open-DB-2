'use client'
import { TableContent } from "@/src/lib/definitions";

export default function TableView(
  { content }: { content: TableContent }
) {

  const { cols , rows } = content;

  return (
    <table className='border-collapse border'>
      <thead>
        <tr>
          {cols.map((header, i) => (
            <th key={i} className='border border-gray-300 px-4 py-2'>
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((record, i) => (
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