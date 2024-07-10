import { Dispatch, SetStateAction } from "react";

export default function InputTitle(
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
      <label className="">
        Title:
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"タイトル"}
        className="w-1/2"
      />
    </div>
  );
}