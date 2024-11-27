import RequireAuth from "../components/RequireAuth";
import Entry from "./components/Entry";
import Headers from "./components/Header"
import ScoreBoard from "./components/ScoreBoard";

export default function DashboardPage() {
  return(
    <RequireAuth>
      <div className="h-screen">
        <Headers />
        <Entry />
        <ScoreBoard />
      </div>
    </RequireAuth>
  );
}