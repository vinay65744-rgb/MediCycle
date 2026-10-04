import { useState } from "react";
import {
  ShieldCheck,
  Hospital,
  Truck,
  ArrowLeft,
  Mail,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "hospital",
    title: "Hospital",
    description: "Manage waste and request pickups",
    icon: Hospital,
  },
  {
    id: "collector",
    title: "Collector",
    description: "Manage pickups and deliveries",
    icon: Truck,
  },
  {
    id: "admin",
    title: "Administrator",
    description: "Monitor the entire platform",
    icon: ShieldCheck,
  },
];

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("hospital");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "hospital") {
      navigate("/hospital");
    } else {
      navigate("/collector");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">
        <div className="grid w-full gap-12 lg:grid-cols-2">
          
          {/* Left */}
          <div className="hidden flex-col justify-center lg:flex">
            <button
              onClick={() => navigate("/")}
              className="mb-12 flex w-fit items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to MediCycle
            </button>

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500">
              <ShieldCheck size={28} />
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight">
              Welcome back to{" "}
              <span className="text-emerald-400">MediCycle.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Manage medical waste, track collections, monitor recycling and
              keep every step accountable from one secure platform.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Real-time waste tracking",
                "Nearby collector discovery",
                "Complete recycling history",
                "Compliance & analytics",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Login */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-2xl md:p-9">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold">Sign in</h2>
                  <p className="mt-2 text-slate-400">
                    Select your account type to continue.
                  </p>
                </div>

                {/* Role selector */}
                <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-950 p-2">
                  {roles.map((item) => {
                    const Icon = item.icon;
                    const active = role === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRole(item.id)}
                        className={`flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs transition ${
                          active
                            ? "bg-emerald-500 text-white"
                            : "text-slate-500 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.title}</span>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@hospital.com"
                        className="w-full rounded-xl border border-white/10 bg-slate-950 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-white/10 bg-slate-950 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-400">
                      <input type="checkbox" className="accent-emerald-500" />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-500 py-3.5 font-semibold transition hover:bg-emerald-400"
                  >
                    Sign in as{" "}
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                </form>

                <p className="mt-7 text-center text-xs text-slate-500">
                  Protected by MediCycle secure authentication
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;