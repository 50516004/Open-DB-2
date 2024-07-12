'use client'
import { PlayIcon } from "@heroicons/react/24/outline";

export default function MyForm() {

  async function action (form : FormData) {

  };

  return (
    <form action={action}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PlayIcon className="w-5" />
      </button>
    </form>
  );

}

