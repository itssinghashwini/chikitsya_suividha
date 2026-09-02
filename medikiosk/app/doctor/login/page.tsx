"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Temporary frontend login.
    // We will replace this with real authentication later.
    setTimeout(() => {
      router.push("/doctor");
    }, 800);
  }

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🩺
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                MediKiosk
              </h1>

              <p className="text-xs text-slate-500">
                Ayurveda Clinical Platform
              </p>
            </div>

          </div>

        </div>

      </header>

      {/* LOGIN AREA */}
      <div className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-10">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="hidden bg-blue-600 p-10 text-white lg:block">

            <div className="flex h-full flex-col justify-between">

              <div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                  🌿
                </div>

                <h2 className="mt-8 text-4xl font-bold leading-tight">
                  Ayurveda
                  <br />
                  Physician Portal
                </h2>

                <p className="mt-5 max-w-md leading-7 text-blue-100">
                  Review AI-assisted patient histories, Ayurvedic
                  assessments and previous medical records before
                  consultation.
                </p>

              </div>

              <div className="space-y-4">

                <Feature
                  icon="✨"
                  text="AI-assisted clinical history"
                />

                <Feature
                  icon="🌿"
                  text="Ayurveda-focused assessment"
                />

                <Feature
                  icon="🔒"
                  text="Secure physician workflow"
                />

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 sm:p-10">

            <div className="mx-auto max-w-md">

              {/* MOBILE LOGO */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl">
                  🩺
                </div>

                <div>

                  <p className="font-bold text-slate-900">
                    MediKiosk
                  </p>

                  <p className="text-xs text-slate-400">
                    Ayurveda OPD
                  </p>

                </div>

              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Doctor Portal
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to access your patient queue.
              </p>

              {/* FORM */}
              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >

                {/* EMAIL */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="doctor@example.com"
                    className="
                      w-full rounded-2xl border-2
                      border-slate-200 bg-slate-50
                      px-4 py-3.5
                      outline-none transition
                      focus:border-blue-500
                      focus:bg-white
                    "
                  />

                </div>

                {/* PASSWORD */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative">

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      className="
                        w-full rounded-2xl border-2
                        border-slate-200 bg-slate-50
                        px-4 py-3.5 pr-20
                        outline-none transition
                        focus:border-blue-500
                        focus:bg-white
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      className="
                        absolute right-3 top-1/2
                        -translate-y-1/2
                        rounded-xl px-3 py-2
                        text-xs font-semibold
                        text-slate-500
                        hover:bg-slate-100
                      "
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>

                {/* ERROR */}
                {error && (

                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

                    <p className="text-sm font-medium text-red-700">
                      ⚠️ {error}
                    </p>

                  </div>

                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full rounded-2xl
                    bg-blue-600 px-6 py-4
                    text-lg font-semibold text-white
                    transition hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:bg-slate-400
                  "
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in to Doctor Portal →"}
                </button>

              </form>

              {/* DEMO NOTICE */}
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <p className="text-xs font-semibold text-blue-800">
                  Demo Mode
                </p>

                <p className="mt-1 text-xs leading-relaxed text-blue-600">
                  This prototype accepts any non-empty email and
                  password. Real authentication will be connected
                  when we build the backend.
                </p>

              </div>

              {/* PATIENT LINK */}
              <div className="mt-8 border-t border-slate-100 pt-6 text-center">

                <p className="text-sm text-slate-500">
                  Are you a patient?
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="mt-2 font-semibold text-blue-600 hover:text-blue-700"
                >
                  Go to Patient Kiosk →
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}


/* FEATURE */

function Feature({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
        {icon}
      </div>

      <span className="text-sm font-medium text-blue-50">
        {text}
      </span>

    </div>
  );
}