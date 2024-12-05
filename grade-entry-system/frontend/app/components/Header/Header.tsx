'use client'

import Link from "next/link";
import { useState } from "react";

import SettingModal from "./SettingModal";

type headerProps = {
  title: string;
  role: string;
}

export default function Header(headerProps: headerProps){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return(
    <>
      <header className="navbar bg-sub">
        <div className="flex-1">
          <h1 className="text-3xl text-white font-AlfaSlabOne px-3">{headerProps.title}</h1>
        </div>
        <nav className="flex-none">
          <ul className="menu menu-horizontal px-1 text-white">
            {headerProps.role === 'teacher' && (
              <>
                <li>
                  <Link href="/teacher/summary">
                    日別
                  </Link>
                </li>
                <li>
                  <Link href="/teacher/scores">
                    全件表示
                  </Link>
                </li>
              </>
            )}
            <li>
              <button onClick={openModal}>
                設定
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <SettingModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}