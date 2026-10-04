import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import CollectorDashboard from "./pages/collector/CollectorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingRedirect />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/collector" element={<CollectorDashboard />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingRedirect() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Medi<span className="text-emerald-400">Cycle</span>
        </h1>

        <p className="mt-3 text-slate-400">
          Smart Medical Waste Management
        </p>

        <a
          href="/login"
          className="mt-7 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold hover:bg-emerald-400"
        >
          Login to Platform
        </a>
      </div>
    </div>
  );
}

export default App;