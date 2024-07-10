'use client'

import { useRef, useState } from "react";

/**
 * details, summary, useRefを用いた右クリックで開くドロップダウン
 * @returns 
 */
export default function DropDownDetails() {

  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [onMenu, setOnMenu] = useState(false);

  function toggle() {
    const details = detailsRef.current;
    details?.toggleAttribute("open");
  }

  function close() {
    const details = detailsRef.current;
    if (onMenu) return;
    details?.removeAttribute("open");
  }

  return (
    <details
      ref={detailsRef}
      onClick={(e) => {
        if(!onMenu) {e.preventDefault();}
        close();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        toggle();
      }}
      onBlur={close}
      className="dropdown"
    >
      <summary className="btn m-1">{onMenu?"Close":"Open"}</summary>
      <ul
        onMouseEnter={e => setOnMenu(true)}
        onMouseLeave={e => setOnMenu(false)}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
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
    </details>
  );
}