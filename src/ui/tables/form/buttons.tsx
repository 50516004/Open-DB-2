import Link from "next/link";
import { MouseEventHandler } from "react";

export default function Buttons(
  {
    onPost,
  }: {
    onPost: MouseEventHandler<HTMLButtonElement>;
  }
) {
  return (
    <div className="flex gap-4">
      <Link
        href="/home"
        className="btn"
      >
        Cancel
      </Link>
      <button
        onClick={onPost}
        className="btn btn-primary"
      >
        Create Table
      </button>
    </div>
  );
}