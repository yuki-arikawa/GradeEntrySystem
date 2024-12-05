import Header from "@/app/components/Header/Header";
import Summary from "./components/Summary";

export default function page() {
  return (
    <div className="h-screen">
      <Header title="Teacher Only" role="teacher" />
      <Summary />
    </div>
  )
}
