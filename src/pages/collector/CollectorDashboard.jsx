import { useState } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  Clock3,
  Hospital,
  MapPin,
  Navigation,
  Package,
  Phone,
  Route,
  ShieldCheck,
  Truck,
  X,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

const initialRequests = [
  {
    id: "MC-4821937",
    hospital: "Apollo Hospital",
    category: "Biohazard",
    weight: "18.5 kg",
    bags: 7,
    distance: "1.8 km",
    pickupTime: "Today, 5:00 PM",
    eta: "15-20 min",
    address: "Koramangala, Bengaluru",
    priority: "Normal",
    status: "New",
  },
  {
    id: "MC-3718294",
    hospital: "CityCare Medical Center",
    category: "Sharps",
    weight: "6.2 kg",
    bags: 3,
    distance: "3.2 km",
    pickupTime: "Today, 5:30 PM",
    eta: "20-25 min",
    address: "Indiranagar, Bengaluru",
    priority: "High",
    status: "New",
  },
  {
    id: "MC-9281736",
    hospital: "GreenLife Hospital",
    category: "Plastic",
    weight: "24.8 kg",
    bags: 11,
    distance: "4.7 km",
    pickupTime: "Today, 6:00 PM",
    eta: "25-30 min",
    address: "Jayanagar, Bengaluru",
    priority: "Normal",
    status: "New",
  },
];

const statusSteps = [
  "Requested",
  "Accepted",
  "On the Way",
  "Collected",
  "In Transit",
];

function StatusBadge({ status }) {
  const styles = {
    New: "bg-blue-50 text-blue-700 border-blue-200",
    High: "bg-red-50 text-red-700 border-red-200",
    Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "On the Way": "bg-amber-50 text-amber-700 border-amber-200",
    Collected: "bg-violet-50 text-violet-700 border-violet-200",
    "In Transit": "bg-cyan-50 text-cyan-700 border-cyan-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, description, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function PickupRequestCard({ request, onAccept, onReject }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div className="flex gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Hospital size={22} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">{request.hospital}</h3>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <span>{request.id}</span>
                <span>•</span>
                <span>{request.distance}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {request.priority === "High" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                <AlertTriangle size={12} />
                High Priority
              </span>
            )}

            <StatusBadge status={request.status} />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Waste Type</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.category}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Weight</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.weight}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Bags</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.bags} bags
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Pickup</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.pickupTime}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
          <MapPin className="mt-0.5 text-emerald-600" size={17} />

          <div>
            <p className="text-xs font-medium text-slate-500">Pickup Location</p>
            <p className="text-sm font-semibold text-slate-800">
              {request.address}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Estimated arrival: {request.eta}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
          <button
            onClick={() => onAccept(request)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Check size={17} />
            Accept Pickup
          </button>

          <button
            onClick={() => onReject(request.id)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <X size={17} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

function PickupTimeline({ currentStatus }) {
  const currentIndex = statusSteps.indexOf(currentStatus);

  return (
    <div className="mt-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Pickup Status</h3>

        <StatusBadge status={currentStatus} />
      </div>

      <div className="space-y-4">
        {statusSteps.map((step, index) => {
          const completed = index <= currentIndex;
          const active = index === currentIndex;

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                  completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {completed ? (
                  <Check size={16} />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    completed ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {step}
                </p>

                {active && (
                  <p className="mt-0.5 text-xs text-emerald-600">
                    Current stage
                  </p>
                )}
              </div>

              {index < statusSteps.length - 1 && (
                <div
                  className={`hidden h-px w-6 sm:block ${
                    index < currentIndex ? "bg-emerald-400" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CollectorDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [activePickup, setActivePickup] = useState(null);
  const [notification, setNotification] = useState(null);
  const [online, setOnline] = useState(true);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const acceptRequest = (request) => {
    const acceptedPickup = {
      ...request,
      status: "Accepted",
    };

    setRequests((current) =>
      current.filter((item) => item.id !== request.id)
    );

    setActivePickup(acceptedPickup);

    showNotification(
      `Pickup ${request.id} accepted successfully.`
    );
  };

  const rejectRequest = (id) => {
    setRequests((current) =>
      current.filter((request) => request.id !== id)
    );

    showNotification("Pickup request rejected.", "info");
  };

  const updatePickupStatus = () => {
    if (!activePickup) return;

    const currentIndex = statusSteps.indexOf(activePickup.status);

    if (currentIndex >= statusSteps.length - 1) {
      showNotification("Pickup is already completed.");
      return;
    }

    const nextStatus = statusSteps[currentIndex + 1];

    setActivePickup((current) => ({
      ...current,
      status: nextStatus,
    }));

    showNotification(`Pickup status updated to "${nextStatus}".`);
  };

  const completePickup = () => {
    if (!activePickup) return;

    setActivePickup(null);

    showNotification(
      "Waste collected successfully. Batch is now in transit."
    );
  };

  const resetDemo = () => {
    setRequests(initialRequests);
    setActivePickup(null);
    showNotification("Demo data has been reset.", "info");
  };

  const todayPickups = activePickup ? 4 : 3;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notification */}
      {notification && (
        <div className="fixed right-4 top-4 z-50 max-w-sm">
          <div
            className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl ${
              notification.type === "info"
                ? "border-blue-200"
                : "border-emerald-200"
            }`}
          >
            <div
              className={`rounded-full p-2 ${
                notification.type === "info"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {notification.type === "info" ? (
                <RefreshCw size={17} />
              ) : (
                <CheckCircle2 size={17} />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                {notification.type === "info" ? "Update" : "Success"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-600 p-2.5 text-white">
              <RecycleIcon />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Medi<span className="text-emerald-600">Cycle</span>
              </h1>

              <p className="text-xs text-slate-500">
                Collector Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Online status */}
            <button
              onClick={() => setOnline((current) => !current)}
              className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 sm:flex"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  online ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
              {online ? "Online" : "Offline"}
            </button>

            <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50">
              <Bell size={19} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-9 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                GR
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  GreenRoute Logistics
                </p>
                <p className="text-xs text-slate-500">
                  Collector ID: COL-2048
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Truck size={13} />
              Collector Dashboard
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Good afternoon, GreenRoute 👋
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your medical waste pickups and deliveries.
            </p>
          </div>

          <button
            onClick={resetDemo}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Reset Demo
          </button>
        </div>

        {/* Demo notice */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <ShieldCheck className="mt-0.5 shrink-0 text-blue-600" size={19} />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Frontend Demo Mode
            </p>
            <p className="mt-1 text-xs leading-5 text-blue-700">
              Pickup requests shown here are demo records. Later, these will
              come directly from the MediCycle backend and database.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Navigation}
            label="Availability"
            value={online ? "Online" : "Offline"}
            description="Ready to receive pickups"
            iconClass={
              online
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }
          />

          <StatCard
            icon={Package}
            label="New Requests"
            value={requests.length}
            description="Waiting for response"
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={Truck}
            label="Today's Pickups"
            value={todayPickups}
            description="Scheduled for today"
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value="27"
            description="This month"
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Active Pickup */}
        {activePickup && (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Active Assignment
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Current Pickup
                </h2>
              </div>

              <StatusBadge status={activePickup.status} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
              <div className="border-b border-emerald-100 bg-emerald-50/50 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                      <Hospital size={23} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {activePickup.hospital}
                      </h3>

                      <p className="text-xs text-slate-500">
                        Tracking ID: {activePickup.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={17} className="text-emerald-600" />
                    {activePickup.distance} away
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[1.4fr_1fr]">
                {/* Details */}
                <div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Waste</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {activePickup.category}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Weight</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {activePickup.weight}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Bags</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {activePickup.bags}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">ETA</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {activePickup.eta}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-4 rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-red-50 p-2 text-red-600">
                        <MapPin size={18} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs text-slate-500">
                          Hospital Pickup Location
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {activePickup.address}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          showNotification(
                            "Map navigation will be connected later."
                          )
                        }
                        className="hidden items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 sm:flex"
                      >
                        <Navigation size={13} />
                        Navigate
                      </button>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={updatePickupStatus}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      <Route size={17} />
                      {activePickup.status === "Accepted"
                        ? "Start Route"
                        : activePickup.status === "On the Way"
                        ? "Mark Waste Collected"
                        : activePickup.status === "Collected"
                        ? "Start Transit"
                        : "Update Status"}
                    </button>

                    {activePickup.status === "Collected" && (
                      <button
                        onClick={completePickup}
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        <CheckCircle2 size={17} />
                        Complete Pickup
                      </button>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <PickupTimeline currentStatus={activePickup.status} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Requests */}
        <section className="mt-8">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Incoming Work
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Pickup Requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review nearby hospital requests and accept the ones you can
                handle.
              </p>
            </div>

            <div className="text-sm font-semibold text-slate-500">
              {requests.length} request{requests.length !== 1 ? "s" : ""}
            </div>
          </div>

          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <PickupRequestCard
                  key={request.id}
                  request={request}
                  onAccept={acceptRequest}
                  onReject={rejectRequest}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={26} />
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                No pending requests
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                You have responded to all available pickup requests. New
                requests will appear here when the backend is connected.
              </p>
            </div>
          )}
        </section>

        {/* Route Summary */}
        <section className="mt-8">
          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Route size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Today's Route
                  </span>
                </div>

                <h2 className="mt-2 text-xl font-bold">
                  Bengaluru Medical Waste Collection
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Your route currently covers Koramangala, Indiranagar and
                  Jayanagar. GPS navigation will be integrated in the next
                  stage.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/5 px-4 py-3 text-center">
                  <p className="text-xl font-bold">3</p>
                  <p className="mt-1 text-xs text-slate-400">Stops</p>
                </div>

                <div className="rounded-xl bg-white/5 px-4 py-3 text-center">
                  <p className="text-xl font-bold">9.7</p>
                  <p className="mt-1 text-xs text-slate-400">KM</p>
                </div>

                <div className="rounded-xl bg-white/5 px-4 py-3 text-center">
                  <p className="text-xl font-bold">58</p>
                  <p className="mt-1 text-xs text-slate-400">Min</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-xs text-slate-400">
            MediCycle • Smart Medical Waste Management
          </p>
        </footer>
      </main>
    </div>
  );
}

function RecycleIcon() {
  return (
    <div className="relative">
      <Recycle size={21} />
    </div>
  );
}