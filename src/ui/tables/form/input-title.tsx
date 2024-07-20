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
    <div>
      <label className="label-text">
        タイトル:
      </label>
      {" "}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"タイトル"}
        className="w-96 rounded-md"
      />
    </div>
  );
}