import Entry from "./components/Entry";
import Headers from "./components/Header"
import ScoreBoard from "./components/ScoreBoard";

export default function DashboardPage() {
  return(
    <div className="h-screen">
      <Headers />
      <Entry />
      <ScoreBoard />
    </div>
  );
}