import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">

        {/* Logo */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-4xl shadow-lg">
          🩺
        </div>

        {/* Title */}
        <h1 className="mt-6 text-5xl font-bold text-slate-900">
          MediKiosk
        </h1>

        <p className="mt-3 text-xl text-slate-600">
          Your Digital Clinical History Assistant
        </p>

        <p className="mt-3 text-slate-500">
          Complete your medical history before meeting your doctor.
        </p>

        {/* Main Card */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome
          </h2>

          <p className="mt-4 text-slate-600">
            MediKiosk will guide you through a simple medical
            history conversation.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            You can speak or use the touchscreen.
          </p>

          {/* Start */}
          <Link
            href="/patient/language"
            className="mt-8 flex w-full items-center justify-center
                       rounded-2xl bg-blue-600 px-8 py-5
                       text-xl font-semibold text-white
                       transition hover:bg-blue-700
                       focus:outline-none focus:ring-4
                       focus:ring-blue-200"
          >
            Start
          </Link>

        </div>

        {/* Footer */}
        <p className="mt-6 text-sm text-slate-400">
          AI-assisted • Secure • Physician reviewed
        </p>

      </div>
    </main>
  );
}