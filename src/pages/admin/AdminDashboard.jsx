import {
  Activity,
  Bell,
  Building2,
  ChevronRight,
  LogOut,
  Menu,
  Recycle,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle="Platform overview and operations"
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total Hospitals"
          value="148"
          change="+12 this month"
          icon={<Building2 />}
        />

        <Stat
          title="Active Collectors"
          value="326"
          change="+18 this week"
          icon={<Truck />}
        />

        <Stat
          title="Waste Collected"
          value="84.6T"
          change="+8.4% this month"
          icon={<Recycle />}
        />

        <Stat
          title="Recycling Rate"
          value="82.4%"
          change="+4.2% this month"
          icon={<Activity />}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Waste Collection</h3>
              <p className="text-sm text-slate-500">
                Monthly collection overview
              </p>
            </div>

            <select className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>

          <div className="mt-8 flex h-64 items-end gap-3">
            {[42, 55, 48, 67, 58, 76, 70, 82, 73, 91, 85, 96].map(
              (height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    style={{ height: `${height}%` }}
                    className="w-full rounded-t-lg bg-emerald-500/70 transition hover:bg-emerald-400"
                  />
                  <span className="text-[10px] text-slate-600">
                    {index + 1}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">Waste Categories</h3>
          <p className="mt-1 text-sm text-slate-500">Current distribution</p>

          <div className="mt-8 space-y-5">
            <Progress name="Biohazard" percentage="42%" width="42%" />
            <Progress name="Plastic" percentage="27%" width="27%" />
            <Progress name="Sharps" percentage="18%" width="18%" />
            <Progress name="Pharmaceutical" percentage="13%" width="13%" />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900">
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <p className="text-sm text-slate-500">
              Latest platform events
            </p>
          </div>

          <button className="text-sm text-emerald-400">
            View all
          </button>
        </div>

        {[
          ["CityCare Hospital", "Created pickup request", "2 min ago"],
          ["GreenRoute Logistics", "Completed collection", "18 min ago"],
          ["Apollo Medical Center", "Waste batch processed", "42 min ago"],
          ["EcoWaste Facility", "Recycling completed", "1 hr ago"],
        ].map(([name, action, time]) => (
          <div
            key={name}
            className="flex items-center justify-between border-b border-white/5 px-6 py-4 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <Activity size={18} />
              </div>

              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-slate-500">{action}</p>
              </div>
            </div>

            <span className="text-xs text-slate-600">{time}</span>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

function DashboardShell({
  children,
  title,
  subtitle,
  menuOpen,
  setMenuOpen,
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-slate-900 transition-transform lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500">
                <Recycle size={19} />
              </div>
              <span className="font-bold">MediCycle</span>
            </div>

            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </button>
          </div>

          <div className="p-4">
            <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Management
            </p>

            <SidebarItem icon={<Activity />} label="Overview" active />
            <SidebarItem icon={<Building2 />} label="Hospitals" />
            <SidebarItem icon={<Truck />} label="Collectors" />
            <SidebarItem icon={<Recycle />} label="Waste Tracking" />
            <SidebarItem icon={<ShieldCheck />} label="Compliance" />
            <SidebarItem icon={<Users />} label="Users" />

            <p className="px-3 pb-3 pt-7 text-xs font-semibold uppercase tracking-wider text-slate-600">
              System
            </p>

            <SidebarItem icon={<Settings />} label="Settings" />
          </div>

          <div className="mt-auto border-t border-white/10 p-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <Menu />
              </button>

              <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-sm text-slate-500">{subtitle}</p>
              </div>
            </div>

            <button className="relative rounded-xl border border-white/10 p-2.5">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
            </button>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "bg-emerald-500 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({ title, value, change, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>

        <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-emerald-400">{change}</p>
    </div>
  );
}

function Progress({ name, percentage, width }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-300">{name}</span>
        <span className="text-slate-500">{percentage}</span>
      </div>

      <div className="h-2 rounded-full bg-slate-800">
        <div
          style={{ width }}
          className="h-full rounded-full bg-emerald-400"
        />
      </div>
    </div>
  );
}

export default AdminDashboard;