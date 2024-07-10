'use client'

import { MouseEventHandler, ReactNode, useRef, useState } from "react";

export interface Item {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement> | Item[];
}

export default function DropDownCell(
  {
    summary,
    menu,
  }: {
    summary: ReactNode;
    menu: Item[];
  }
) {

  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [onMenu, setOnMenu] = useState(false);

  function toggle() {
    const details = detailsRef.current;
    details?.toggleAttribute("open");
  }

  function close() {
    const details = detailsRef.current;
    details?.removeAttribute("open");
  }

  function toJSX(items: Item[]) {
    return items.map((item, i) => {
      const { label, onClick } = item;
      if (typeof onClick === "function") {
        return (
          <li key={i}>
            <button
              onClick={onClick}
              onMouseUp={close}
            >
              {label}
            </button>
          </li>
        );
      } else {
        return (
          <li key={i}>
            <details>
              <summary>{label}</summary>
              <ul>{toJSX(onClick)}</ul>
            </details>
          </li>
        );
      }
    });
  }

  return (
    <details
      ref={detailsRef}
      onClick={(e) => {
        if (!onMenu) {
          close();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        toggle();
      }}
      onBlur={(e) => {
        if (!onMenu) close();
      }}
      className="dropdown w-full"
    >
      <summary className="list-none">
        {summary}
      </summary>
      <ul
        onMouseEnter={() => setOnMenu(true)}
        onMouseLeave={() => setOnMenu(false)}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg font-normal"
      >
        {toJSX(menu)}
      </ul>
    </details>
  );
}