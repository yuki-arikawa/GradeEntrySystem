import Link from "next/link";

export default function Header(){
  return(
    <header className="navbar bg-sub">
      <div className="flex-1">
        <h1 className="text-3xl text-white font-AlfaSlabOne px-3">Teacher Only</h1>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1 text-white">
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
        </ul>
      </nav>
    </header>
  );
}