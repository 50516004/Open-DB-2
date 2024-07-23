import { ColType } from "@/src/lib/definitions";
import clsx from "clsx";

/** テーブルヘッダコンポーネント */
export default function TableData(
  {
    type,
    value,
  }: {
    type: ColType;
    value: string;
  }
) {

  const formatted = (function () {
    switch (type) {
      case "number":
        return parseFloat(value).toLocaleString();
      case "text": return value;
      case "date": return value;
      case "time": return value;
    }
  }());

  return (
    <td
      className={clsx(
        'border border-x-gray-200 border-y-gray-200 px-4 py-1',
        (type == "number") && "text-right"
      )}
    >
      {formatted}
    </td>
  );
}