import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Plus,
  Recycle,
  Truck,
  X,
} from "lucide-react";

import CollectorMap from "../../components/CollectorMap";
import PickupModal from "../../components/PickupModal";

const collectors = [
  {
    id: "greenroute",
    name: "GreenRoute Logistics",
    distance: "1.8 km",
    rating: "4.9",
    vehicle: "BMW-4821",
    eta: "15-20 min",
    status: "Available",
  },
  {
    id: "ecowaste",
    name: "EcoWaste Services",
    distance: "3.2 km",
    rating: "4.8",
    vehicle: "BMW-3517",
    eta: "20-25 min",
    status: "Available",
  },
  {
    id: "cleanmed",
    name: "CleanMed Transport",
    distance: "4.7 km",
    rating: "4.7",
    vehicle: "BMW-9044",
    eta: "25-30 min",
    status: "Available",
  },
];

const wasteRecords = [
  {
    id: "MC-4821937",
    category: "Biohazard",
    weight: "18.5 kg",
    bags: 7,
    date: "18 Sep 2026",
    collector: "GreenRoute Logistics",
    status: "In Transit",
  },
  {
    id: "MC-3718294",
    category: "Sharps",
    weight: "6.2 kg",
    bags: 3,
    date: "17 Sep 2026",
    collector: "EcoWaste Services",
    status: "Processing",
  },
  {
    id: "MC-9281736",
    category: "Plastic",
    weight: "24.8 kg",
    bags: 11,
    date: "16 Sep 2026",
    collector: "CleanMed Transport",
    status: "Recycled",
  },
  {
    id: "MC-6172938",
    category: "Pharmaceutical",
    weight: "8.4 kg",
    bags: 4,
    date: "15 Sep 2026",
    collector: "GreenRoute Logistics",
    status: "Completed",
  },
];

function HospitalDashboard() {
  const [pickupOpen, setPickupOpen] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState(null);
  const [latestPickup, setLatestPickup] = useState(null);

  const openPickupModal = (collector = null) => {
    setSelectedCollector(collector);
    setPickupOpen(true);
  };

  const handlePickupSuccess = (pickup) => {
    setLatestPickup(pickup);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
                <Recycle className="h-5 w-5 text-slate-950" />
              </div>

              <h1 className="text-xl font-bold">
                Medi<span className="text-emerald-400">Cycle</span>
              </h1>
            </div>

            <p className="mt-1 hidden text-xs text-slate-500 sm:block">
              Hospital Waste Management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
            </button>

            <div className="hidden h-8 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10 font-bold text-emerald-400">
                AH
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">
                  Apollo Hospital
                </p>

                <p className="text-xs text-slate-500">Hospital Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Hospital Dashboard
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Good evening, Apollo Hospital
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage medical waste pickups, monitor active collections, and
              track recycling progress from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openPickupModal()}
            className="flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
          >
            <Plus className="h-5 w-5" />
            Request Pickup
          </button>
        </div>

        {/* Latest pickup success */}
        {latestPickup && (
          <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Pickup Request Created
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Tracking ID:
                    <span className="ml-2 font-bold text-emerald-400">
                      {latestPickup.id}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {latestPickup.categoryName} • {latestPickup.weight} kg •{" "}
                    {latestPickup.bags} bags
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
                <p className="text-xs text-slate-500">Status</p>

                <p className="mt-1 text-sm font-semibold text-amber-400">
                  Awaiting Pickup
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Package}
            label="Waste This Month"
            value="1,284 kg"
            change="+12.8%"
            positive
          />

          <StatCard
            icon={Truck}
            label="Active Pickups"
            value="3"
            change="2 arriving today"
            positive
          />

          <StatCard
            icon={Recycle}
            label="Recycled"
            value="82.4%"
            change="+4.2% this month"
            positive
          />

          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value="48"
            change="This month"
            positive
          />
        </section>

        {/* Active pickup */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Active Pickup</h3>
              <p className="mt-1 text-sm text-slate-500">
                Track your currently active waste collection.
              </p>
            </div>

            <button
              type="button"
              className="hidden text-sm font-medium text-emerald-400 hover:text-emerald-300 sm:block"
            >
              View all
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Tracking ID */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                  <Truck className="h-6 w-6 text-emerald-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Waste Tracking ID
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    MC-4821937
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Biohazard • 18.5 kg • 7 bags
                  </p>
                </div>
              </div>

              {/* Collector */}
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Collector
                </p>

                <p className="mt-1 font-semibold text-white">
                  GreenRoute Logistics
                </p>

                <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
                  <MapPin className="h-4 w-4" />
                  1.8 km away
                </p>
              </div>

              {/* ETA */}
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Estimated Arrival
                </p>

                <p className="mt-1 flex items-center gap-2 font-semibold text-white">
                  <Clock3 className="h-4 w-4 text-emerald-400" />
                  15-20 min
                </p>
              </div>

              <button
                type="button"
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Track Pickup
              </button>
            </div>

            {/* Timeline */}
            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="grid gap-6 sm:grid-cols-4">
                <TimelineStep
                  number="1"
                  title="Requested"
                  description="Request created"
                  completed
                />

                <TimelineStep
                  number="2"
                  title="Accepted"
                  description="Collector accepted"
                  completed
                />

                <TimelineStep
                  number="3"
                  title="In Transit"
                  description="Collector on the way"
                  active
                />

                <TimelineStep
                  number="4"
                  title="Collected"
                  description="Waste collected"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Map + collectors */}
        <section className="mt-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold">Nearby Available Collectors</h3>

            <p className="mt-1 text-sm text-slate-500">
              Find available medical waste collectors near your hospital.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="font-semibold text-white">
                    Collector Locations
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Showing available collectors within 5 km
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Live
                </div>
              </div>

              <div className="h-[430px]">
                <CollectorMap />
              </div>
            </div>

            {/* Collector cards */}
            <div className="space-y-3">
              {collectors.map((collector) => (
                <CollectorCard
                  key={collector.id}
                  collector={collector}
                  onRequest={() => openPickupModal(collector)}
                />
              ))}

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm font-semibold text-slate-400 transition hover:border-emerald-400/40 hover:text-emerald-400"
              >
                <MapPin className="h-4 w-4" />
                View More Collectors
              </button>
            </div>
          </div>
        </section>

        {/* Recycling summary */}
        <section className="mt-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold">Recycling Summary</h3>

            <p className="mt-1 text-sm text-slate-500">
              Monthly waste processing and recycling overview.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <SummaryCard
              title="Total Waste"
              value="1,284 kg"
              subtitle="Collected this month"
              progress={100}
              icon={Package}
            />

            <SummaryCard
              title="Recycled"
              value="1,058 kg"
              subtitle="82.4% recycling rate"
              progress={82.4}
              icon={Recycle}
            />

            <SummaryCard
              title="Pending Processing"
              value="226 kg"
              subtitle="Awaiting processing"
              progress={17.6}
              icon={Clock3}
            />
          </div>
        </section>

        {/* Recent records */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Recent Waste Records</h3>

              <p className="mt-1 text-sm text-slate-500">
                Your latest waste collection and recycling records.
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              View History
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="border-b border-white/10 bg-white/[0.02]">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Waste ID
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Weight
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Bags
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Collector
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {wasteRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-emerald-400">
                          {record.id}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-300">
                        {record.category}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-300">
                        {record.weight}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-300">
                        {record.bags}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-300">
                        {record.collector}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-400">
                        {record.date}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={record.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 to-cyan-500/5 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-emerald-400" />

                <h3 className="font-semibold text-white">
                  Responsible Waste Management
                </h3>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Track every waste batch from collection to processing and
                recycling with MediCycle.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openPickupModal()}
              className="flex w-fit shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <Plus className="h-5 w-5" />
              New Pickup
            </button>
          </div>
        </section>
      </main>

      {/* Pickup Modal */}
      <PickupModal
        open={pickupOpen}
        onClose={() => setPickupOpen(false)}
        preselectedCollector={selectedCollector}
        onSuccess={handlePickupSuccess}
      />
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive = false,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-white/15">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
          <Icon className="h-5 w-5 text-emerald-400" />
        </div>

        <span
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
            positive
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

/* =========================
   COLLECTOR CARD
========================= */

function CollectorCard({ collector, onRequest }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 transition hover:border-emerald-400/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
            <Truck className="h-5 w-5 text-emerald-400" />
          </div>

          <div>
            <p className="font-semibold text-white">{collector.name}</p>

            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {collector.distance}
              </span>

              <span>★ {collector.rating}</span>
            </div>
          </div>
        </div>

        <span className="rounded-lg bg-emerald-400/10 px-2 py-1 text-[11px] font-semibold text-emerald-400">
          {collector.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-white/[0.03] p-2.5">
          <p className="text-slate-500">Vehicle</p>
          <p className="mt-1 font-medium text-slate-300">
            {collector.vehicle}
          </p>
        </div>

        <div className="rounded-lg bg-white/[0.03] p-2.5">
          <p className="text-slate-500">ETA</p>
          <p className="mt-1 font-medium text-slate-300">{collector.eta}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRequest}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        <Truck className="h-4 w-4" />
        Request Pickup
      </button>
    </div>
  );
}

/* =========================
   TIMELINE STEP
========================= */

function TimelineStep({
  number,
  title,
  description,
  completed = false,
  active = false,
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          completed
            ? "bg-emerald-500 text-slate-950"
            : active
              ? "bg-amber-400 text-slate-950"
              : "bg-white/10 text-slate-500"
        }`}
      >
        {completed ? <CheckCircle2 className="h-5 w-5" /> : number}
      </div>

      <div>
        <p
          className={`text-sm font-semibold ${
            active
              ? "text-amber-400"
              : completed
                ? "text-white"
                : "text-slate-500"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  title,
  value,
  subtitle,
  progress,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="mt-1 text-2xl font-bold text-white">{value}</p>

          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
          <Icon className="h-5 w-5 text-emerald-400" />
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }) {
  const styles = {
    "In Transit": "bg-blue-400/10 text-blue-400",
    Processing: "bg-amber-400/10 text-amber-400",
    Recycled: "bg-emerald-400/10 text-emerald-400",
    Completed: "bg-slate-400/10 text-slate-300",
  };

  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-white/10 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}

export default HospitalDashboard;