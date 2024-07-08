import { TableContent } from "@/src/lib/definitions";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function Table(
  { 
    state, 
    setState 
  }: { 
    state: TableContent, 
    setState: Dispatch<SetStateAction<TableContent>>
  }
) {
  const { headers, records } = state;

  function handleInputHeader(
    e: ChangeEvent<HTMLInputElement>, i: number
  ) {
    const newHeaders = [...state.headers];
    newHeaders[i] = e.target.value;

    const newState = { ...state, headers: newHeaders };
    setState(newState);
  }

  function handleInputRecords(
    e: ChangeEvent<HTMLInputElement>, i: number, j: number
  ) {
    const newRecords = state.records.map((row) => [...row]);
    newRecords[i][j] = e.target.value;

    const newState = { ...state, records: newRecords };
    setState(newState);
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