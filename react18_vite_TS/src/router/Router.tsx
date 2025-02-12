import Home from "@/Home";
import AppLayout from "@/layout/AppLayout";
import { Routes, Route } from "react-router";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="Subscribers" element={<Subscribers />} /> */}
      </Route>
    </Routes>
  );
}
