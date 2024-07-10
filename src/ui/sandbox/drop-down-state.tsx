'use client'

import { useState } from "react";

export default function DropDownState() {

  const [isOpen, setIsOpen] = useState(false);
  const [onMenu, setOnMenu] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function close() {
    if (onMenu) return;
    setIsOpen(false);
  }

  return (
    <div
      tabIndex={0}
      onClick={close}
      onBlur={close}
      onContextMenu={e => {
        e.preventDefault();
        toggle();
      }}
      className="relative inline-block"
    >
      <button className="btn">Click</button>
      {isOpen &&
        <ul
          className="menu absolute top-full left-0 bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          onMouseEnter={() => setOnMenu(true)}
          onMouseLeave={() => setOnMenu(false)}
        >
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul>
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul>
                      <li><a>Submenu 1</a></li>
                      <li><a>Submenu 2</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      }
    </div>
  );
}