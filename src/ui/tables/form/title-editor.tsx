import { Dispatch, SetStateAction } from "react";

export default function Table(
  {
    title,
    setTitle
  }: {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
  }
) {
  return (
    <div className="flex gap-2 items-center">
      <label className="max-w-xs">
        Title:
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"タイトル"}
        className="input input-bordered input-sm w-full max-w-xs"
      />
    </div>
  );
}