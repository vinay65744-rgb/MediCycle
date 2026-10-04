import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  MapPin,
  Package,
  Recycle,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const wasteCategories = [
  {
    id: "biohazard",
    name: "Biohazard",
    description: "Infectious and contaminated waste",
    icon: ShieldCheck,
  },
  {
    id: "sharps",
    name: "Sharps",
    description: "Needles, blades and sharp objects",
    icon: Package,
  },
  {
    id: "plastic",
    name: "Plastic",
    description: "Contaminated plastic medical waste",
    icon: Recycle,
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical",
    description: "Expired or unused medicines",
    icon: Package,
  },
  {
    id: "general",
    name: "General",
    description: "Non-hazardous medical waste",
    icon: Package,
  },
];

const collectors = [
  {
    id: "greenroute",
    name: "GreenRoute Logistics",
    distance: "1.8 km",
    rating: "4.9",
    vehicle: "BMW-4821",
    eta: "15-20 min",
  },
  {
    id: "ecowaste",
    name: "EcoWaste Services",
    distance: "3.2 km",
    rating: "4.8",
    vehicle: "BMW-3517",
    eta: "20-25 min",
  },
  {
    id: "cleanmed",
    name: "CleanMed Transport",
    distance: "4.7 km",
    rating: "4.7",
    vehicle: "BMW-9044",
    eta: "25-30 min",
  },
];

function PickupModal({
  open,
  onClose,
  preselectedCollector = null,
  onSuccess,
}) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollector, setSelectedCollector] =
    useState(preselectedCollector);

  const [form, setForm] = useState({
    weight: "",
    bags: "",
    date: "",
    time: "",
    notes: "",
  });

  const [submittedId, setSubmittedId] = useState("");
  const [copied, setCopied] = useState(false);

  const qrRef = useRef(null);

  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedCategory("");
      setSelectedCollector(preselectedCollector);
      setSubmittedId("");
      setCopied(false);

      setForm({
        weight: "",
        bags: "",
        date: "",
        time: "",
        notes: "",
      });
    }
  }, [open, preselectedCollector]);

  if (!open) {
    return null;
  }

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const canContinueStep1 =
    selectedCategory &&
    Number(form.weight) > 0 &&
    Number(form.bags) > 0 &&
    form.date &&
    form.time;

  const handleSubmit = () => {
    const wasteId = `MC-${Date.now().toString().slice(-7)}`;

    setSubmittedId(wasteId);

    onSuccess?.({
      id: wasteId,
      category: selectedCategory,
      categoryName:
        wasteCategories.find((item) => item.id === selectedCategory)?.name ||
        selectedCategory,
      weight: form.weight,
      bags: form.bags,
      date: form.date,
      time: form.time,
      notes: form.notes,
      collector: selectedCollector,
    });
  };

  const handleClose = () => {
    setStep(1);
    setSubmittedId("");
    setCopied(false);
    onClose();
  };

  const copyTrackingId = async () => {
    if (!submittedId) return;

    try {
      await navigator.clipboard.writeText(submittedId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.log("Could not copy tracking ID");
    }
  };

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) {
      return;
    }

    const pngUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");

    downloadLink.href = pngUrl;
    downloadLink.download = `${submittedId}-QR.png`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const qrValue = submittedId
    ? `https://medicycle.app/track/${submittedId}`
    : "";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pickup-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-emerald-400" />

              <h2
                id="pickup-modal-title"
                className="text-xl font-bold text-white"
              >
                Request Waste Pickup
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-400">
              Create and track a medical waste pickup
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress */}
        {!submittedId && (
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      step >= item
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-white/10 text-slate-500"
                    }`}
                  >
                    {step > item ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      item
                    )}
                  </div>

                  <div className="hidden min-[500px]:block">
                    <p
                      className={`text-xs font-semibold ${
                        step >= item ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {item === 1 && "Waste Details"}
                      {item === 2 && "Collector"}
                      {item === 3 && "Confirmation"}
                    </p>
                  </div>

                  {item !== 3 && (
                    <div
                      className={`h-px flex-1 ${
                        step > item ? "bg-emerald-500" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {/* STEP 1 */}
          {step === 1 && !submittedId && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  What type of waste are you sending?
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Select the primary waste category for this pickup.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {wasteCategories.map((category) => {
                  const Icon = category.icon;
                  const selected = selectedCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-emerald-400 bg-emerald-400/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div
                        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-emerald-400 text-slate-950"
                            : "bg-white/10 text-slate-300"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <p className="font-semibold text-white">
                        {category.name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {category.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Waste Weight (kg)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={form.weight}
                    onChange={(e) =>
                      updateForm("weight", e.target.value)
                    }
                    placeholder="e.g. 12.5"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Number of Bags
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={form.bags}
                    onChange={(e) =>
                      updateForm("bags", e.target.value)
                    }
                    placeholder="e.g. 5"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Pickup Date
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      updateForm("date", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Pickup Time
                  </label>

                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      updateForm("time", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Additional Notes
                </label>

                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(e) =>
                    updateForm("notes", e.target.value)
                  }
                  placeholder="Add instructions for the collector..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-emerald-400"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && !submittedId && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Select a collector
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Choose an available collector near your hospital.
                </p>
              </div>

              <div className="space-y-3">
                {collectors.map((collector) => {
                  const selected =
                    selectedCollector?.id === collector.id;

                  return (
                    <button
                      key={collector.id}
                      type="button"
                      onClick={() =>
                        setSelectedCollector(collector)
                      }
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-emerald-400 bg-emerald-400/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                            <Truck className="h-6 w-6" />
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {collector.name}
                            </p>

                            <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {collector.distance}
                              </span>

                              <span>★ {collector.rating}</span>

                              <span>{collector.vehicle}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Clock3 className="h-4 w-4" />
                          ETA {collector.eta}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-400/5 p-4">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Nearby collector matching
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      The production version will use live collector
                      availability and GPS data to match your request.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && !submittedId && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Review pickup request
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Verify the information before creating the request.
                </p>
              </div>

              <div className="space-y-3">
                <SummaryRow
                  label="Waste Category"
                  value={
                    wasteCategories.find(
                      (item) => item.id === selectedCategory
                    )?.name
                  }
                />

                <SummaryRow
                  label="Weight"
                  value={`${form.weight} kg`}
                />

                <SummaryRow
                  label="Bags"
                  value={`${form.bags} bags`}
                />

                <SummaryRow
                  label="Pickup"
                  value={`${form.date} at ${form.time}`}
                />

                <SummaryRow
                  label="Collector"
                  value={
                    selectedCollector?.name || "Not selected"
                  }
                />

                <SummaryRow
                  label="Vehicle"
                  value={selectedCollector?.vehicle || "—"}
                />

                {form.notes && (
                  <SummaryRow
                    label="Notes"
                    value={form.notes}
                  />
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Ready to create pickup
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      A unique Waste Tracking ID and QR code will be
                      generated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {submittedId && (
            <div className="py-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10">
                <CheckCircle2 className="h-9 w-9 text-emerald-400" />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                Pickup Request Created
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Your medical waste pickup has been registered
                successfully.
              </p>

              {/* Tracking ID */}
              <div className="mx-auto mt-5 max-w-md rounded-2xl border border-white/10 bg-slate-950 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Waste Tracking ID
                </p>

                <div className="mt-2 flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold tracking-widest text-emerald-400">
                    {submittedId}
                  </p>

                  <button
                    type="button"
                    onClick={copyTrackingId}
                    title="Copy tracking ID"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {copied && (
                  <p className="mt-2 text-xs text-emerald-400">
                    Tracking ID copied
                  </p>
                )}
              </div>

              {/* QR Code */}
              <div
                ref={qrRef}
                className="mx-auto mt-5 w-fit rounded-2xl border border-white/10 bg-white p-5"
              >
                <QRCodeCanvas
                  value={qrValue}
                  size={190}
                  bgColor="#ffffff"
                  fgColor="#020617"
                  level="H"
                  includeMargin
                />

                <p className="mt-3 text-xs font-semibold text-slate-700">
                  Scan to track waste
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  {submittedId}
                </p>
              </div>

              {/* Download */}
              <button
                type="button"
                onClick={downloadQR}
                className="mx-auto mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Download QR Code
              </button>

              {/* Details */}
              <div className="mx-auto mt-5 max-w-md space-y-2 text-left">
                <SummaryRow
                  label="Waste Category"
                  value={
                    wasteCategories.find(
                      (item) => item.id === selectedCategory
                    )?.name
                  }
                />

                <SummaryRow
                  label="Weight"
                  value={`${form.weight} kg`}
                />

                <SummaryRow
                  label="Bags"
                  value={`${form.bags} bags`}
                />

                <SummaryRow
                  label="Collector"
                  value={selectedCollector?.name}
                />

                <SummaryRow
                  label="Pickup"
                  value={`${form.date} at ${form.time}`}
                />
              </div>

              {/* Status */}
              <div className="mx-auto mt-5 max-w-md rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-left">
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Awaiting Pickup
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      The selected collector will receive the pickup
                      request. You can use the QR code to track this
                      waste batch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submittedId && (
          <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
            <button
              type="button"
              onClick={() => {
                if (step === 1) {
                  handleClose();
                } else {
                  setStep((current) => current - 1);
                }
              }}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />

              {step === 1 ? "Cancel" : "Back"}
            </button>

            {step < 3 ? (
              <button
                type="button"
                disabled={
                  (step === 1 && !canContinueStep1) ||
                  (step === 2 && !selectedCollector)
                }
                onClick={() =>
                  setStep((current) => current + 1)
                }
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue

                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                <CheckCircle2 className="h-4 w-4" />
                Create Pickup Request
              </button>
            )}
          </div>
        )}

        {submittedId && (
          <div className="border-t border-white/10 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-slate-400">{label}</span>

      <span className="text-sm font-semibold text-white sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default PickupModal;