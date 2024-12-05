import RequireAuth from "../components/RequireAuth";
import Header from "../components/Header/Header";
import DashboardContent from "./components/DashboardContent";

export const runtime = 'edge';

export default function DashboardPage() {
  return(
    <RequireAuth>
      <div className="h-screen">
        <Header title="Grade Entry System" role='student' />
        <DashboardContent />
      </div>
    </RequireAuth>
  );
}