"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConsentPage() {
  const router = useRouter();
  const [consent, setConsent] = useState(false);

  const handleContinue = () => {
    if (!consent) return;

    router.push("/patient/details");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="mx-auto flex min-h-[90vh] max-w-3xl items-center">

        <div className="w-full">

          {/* Logo */}
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
              🩺
            </div>

            <h1 className="mt-6 text-4xl font-bold text-slate-900">
              Before we begin
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Please read and provide your consent.
            </p>

          </div>

          {/* Card */}
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">

            <div className="rounded-2xl bg-blue-50 p-6">

              <h2 className="text-xl font-semibold text-slate-900">
                How MediKiosk works
              </h2>

              <div className="mt-5 space-y-5 text-slate-700">

                <div className="flex gap-3">
                  <span className="text-xl">🎤</span>
                  <p>
                    MediKiosk will ask questions about your health.
                    You can answer by speaking or tapping.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-xl">📄</span>
                  <p>
                    You may provide previous medical documents
                    such as prescriptions and laboratory reports.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-xl">👨‍⚕️</span>
                  <p>
                    Your information will help prepare your
                    clinical history for your healthcare professional.
                  </p>
                </div>

              </div>

            </div>

            {/* Audio */}
            <button
              type="button"
              className="mt-6 w-full rounded-2xl border-2
                         border-slate-200 px-6 py-4
                         text-lg font-medium text-slate-700
                         hover:bg-slate-50"
            >
              🔊 Listen to this information
            </button>

            {/* Consent */}
            <label className="mt-8 flex cursor-pointer gap-4
                              rounded-2xl border-2 border-slate-200
                              p-5 hover:border-blue-400">

              <input
                type="checkbox"
                checked={consent}
                onChange={(event) =>
                  setConsent(event.target.checked)
                }
                className="mt-1 h-6 w-6 accent-blue-600"
              />

              <span className="text-lg leading-relaxed text-slate-700">
                I understand the information above and consent to
                providing my health information through MediKiosk
                for preparation of my clinical history.
              </span>

            </label>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 rounded-2xl border-2
                           border-slate-200 px-6 py-4
                           text-lg font-semibold text-slate-700
                           hover:bg-slate-50"
              >
                Back
              </button>

              <button
                type="button"
                disabled={!consent}
                onClick={handleContinue}
                className="flex-1 rounded-2xl px-6 py-4
                           text-lg font-semibold text-white
                           disabled:cursor-not-allowed
                           disabled:bg-slate-300
                           enabled:bg-blue-600
                           enabled:hover:bg-blue-700"
              >
                Continue
              </button>

            </div>

          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            🔒 Your information is handled securely.
          </p>

        </div>

      </div>

    </main>
  );
}