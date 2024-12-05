import Link from "next/link";

type headerProps = {
  title: string;
  role: string;
}

export default function Header(headerProps: headerProps){
  return(
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
            <Link href="#">
              設定
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}