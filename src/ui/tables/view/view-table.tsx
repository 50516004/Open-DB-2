import { TableContent } from "@/src/lib/definitions";

export default function ViewTable(
  { content }: { content: TableContent }
) {

  const { cols, rows } = content;

  return (
    <table className='rounded-md'>
      <thead>
        <tr className="bg-blue-400 text-white overflow-hidden">
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
          <tr
            key={i}
            className="hover:bg-blue-100 duration-0"
          >
            {row.map((col, j) => (
              <td
                key={j}
                className='border border-x-gray-200 border-y-gray-500 px-4 py-1'
              >
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

};