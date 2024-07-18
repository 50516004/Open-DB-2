'use client';

import { updateUserName } from "@/src/lib/actions";
import { useState } from "react";

export default function SettingForm(
  {
    userName,
    userMail,
  }: {
    userName: string;
    userMail: string;
  }
) {
  const [name, setName] = useState(userName);

  async function post() {
    updateUserName(name, userMail);
  }

  return (
    <div className="w-60 flex flex-col gap-2">
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <div>
        <button className="btn" onClick={post}>
          変更
        </button>
      </div>
    </div>
  );
}
