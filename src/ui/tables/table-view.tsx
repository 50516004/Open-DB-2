'use client'

import { TableContent } from "@/src/lib/definitions";

export default function TableView(
  { content }: { content: TableContent }
) {

  const { cols, rows } = content;

  return (
    <div className="mt-4 w-max">
      <table className='overflow-x-scroll'>
        <thead>
          <tr>
            {cols.map((col, i) => (
              <th
                key={i}
                className='border border-gray-300'
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <td
                  key={j}
                  className='border border-gray-300 px-4 py-1'
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};