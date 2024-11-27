import RequireAuth from "../components/RequireAuth";
import Headers from "./components/Header"
import DashboardContent from "./components/DashboardContent";

export default function DashboardPage() {
  return(
    <RequireAuth>
      <div className="h-screen">
        <Headers />
        <DashboardContent />
      </div>
    </RequireAuth>
  );
}