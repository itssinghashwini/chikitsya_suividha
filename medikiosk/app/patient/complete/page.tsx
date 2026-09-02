"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const dashavidha = [
  ["Prakriti", "Vata-Pitta", "Patient-reported"],
  ["Vikriti", "To be assessed", "Physician assessment"],
  ["Sara", "Madhyama", "Patient-reported"],
  ["Samhanana", "Madhyama", "Patient-reported"],
  ["Pramana", "Proportionate", "Patient-reported"],
  ["Satmya", "Regular diet tolerated", "Patient-reported"],
  ["Sattva", "Madhyama", "Patient-reported"],
  ["Ahara Shakti", "Moderate", "Patient-reported"],
  ["Vyayama Shakti", "Moderate", "Patient-reported"],
  ["Vaya", "Adult", "Patient-reported"],
];

export default function CompletePage() {
  const router = useRouter();

  const [confirmed, setConfirmed] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🩺
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                MediKiosk
              </h1>

              <p className="text-xs text-slate-500">
                Ayurveda Clinical History
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="hidden rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 sm:inline-flex">
              History Ready
            </span>

            <button
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              ← Back
            </button>

          </div>

        </div>

      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* TITLE */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Physician Review
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Ayurvedic Clinical History Summary
          </h2>

          <p className="mt-2 text-slate-500">
            AI-assisted draft generated from the patient's responses
            and uploaded records.
          </p>

        </div>

        {/* PATIENT CARD */}
        <section className="rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                RP
              </div>

              <div>

                <h3 className="text-xl font-bold text-slate-900">
                  Rahul Patient
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  30 years • Male
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">

              <div>
                <p className="text-slate-400">ABHA ID</p>
                <p className="mt-1 font-semibold text-slate-700">
                  Not linked
                </p>
              </div>

              <div>
                <p className="text-slate-400">Language</p>
                <p className="mt-1 font-semibold text-slate-700">
                  English
                </p>
              </div>

              <div>
                <p className="text-slate-400">Session</p>
                <p className="mt-1 font-semibold text-emerald-600">
                  Complete
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* TWO COLUMN */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">

            {/* CHIEF COMPLAINT */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <SectionTitle
                icon="🩺"
                title="Chief Complaint"
                subtitle="मुख्य शिकायत"
              />

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">

                <p className="text-lg font-semibold text-slate-900">
                  Digestive discomfort
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  Patient reports abdominal discomfort and bloating.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <Tag text="3 months" />
                  <Tag text="Bloating" />
                  <Tag text="Post-meal discomfort" />

                </div>

              </div>

            </section>

            {/* HPI */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <SectionTitle
                icon="📋"
                title="History of Present Illness"
                subtitle="वर्तमान बीमारी का इतिहास"
              />

              <div className="mt-5 space-y-4">

                <HistoryRow
                  label="Duration"
                  value="Approximately 3 months"
                />

                <HistoryRow
                  label="Onset"
                  value="Gradual"
                />

                <HistoryRow
                  label="Associated symptoms"
                  value="Bloating and heaviness after meals"
                />

                <HistoryRow
                  label="Pattern"
                  value="Symptoms occur intermittently"
                />

              </div>

            </section>

            {/* AYURVEDIC ASSESSMENT */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <SectionTitle
                icon="🌿"
                title="Ayurvedic Assessment"
                subtitle="आयुर्वेदिक मूल्यांकन"
              />

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <AssessmentCard
                  title="Agni"
                  value="Variable / Vishama"
                />

                <AssessmentCard
                  title="Koshta"
                  value="Not yet assessed"
                />

                <AssessmentCard
                  title="Mala"
                  value="Occasional constipation"
                />

                <AssessmentCard
                  title="Ahara"
                  value="Irregular meal timing"
                />

                <AssessmentCard
                  title="Vihara"
                  value="Mostly sedentary"
                />

                <AssessmentCard
                  title="Nidra"
                  value="Interrupted / unrefreshing"
                />

              </div>

            </section>

            {/* DASHAVIDHA */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <SectionTitle
                  icon="🌿"
                  title="Dashavidha Pariksha"
                  subtitle="दशविध परीक्षा"
                />

                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  Physician verification required
                </span>

              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

                <div className="grid grid-cols-3 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">

                  <span>Parameter</span>
                  <span>Recorded Value</span>
                  <span>Source</span>

                </div>

                {dashavidha.map(([parameter, value, source]) => (

                  <div
                    key={parameter}
                    className="grid grid-cols-3 border-t border-slate-100 px-4 py-4 text-sm"
                  >

                    <span className="font-semibold text-slate-800">
                      {parameter}
                    </span>

                    <span className="text-slate-600">
                      {value}
                    </span>

                    <span
                      className={
                        source === "Physician assessment"
                          ? "font-medium text-amber-600"
                          : "text-slate-400"
                      }
                    >
                      {source}
                    </span>

                  </div>

                ))}

              </div>

            </section>

            {/* PAST HISTORY */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <SectionTitle
                icon="🏥"
                title="Past Medical History"
                subtitle="पूर्व चिकित्सा इतिहास"
              />

              <div className="mt-5 rounded-2xl bg-slate-50 p-5">

                <p className="font-semibold text-slate-800">
                  No major existing conditions reported.
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Physician should verify this information during consultation.
                </p>

              </div>

            </section>

            {/* MEDICINES */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <SectionTitle
                icon="💊"
                title="Medicines & Allergies"
                subtitle="दवाइयाँ और एलर्जी"
              />

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 p-5">

                  <p className="text-sm text-slate-400">
                    Current medicines
                  </p>

                  <p className="mt-2 font-semibold text-slate-800">
                    None reported
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-200 p-5">

                  <p className="text-sm text-slate-400">
                    Known allergies
                  </p>

                  <p className="mt-2 font-semibold text-slate-800">
                    None reported
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">

            {/* AI SUMMARY */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
                  ✨
                </div>

                <div>

                  <h3 className="font-bold">
                    AI History Summary
                  </h3>

                  <p className="text-xs text-slate-400">
                    Draft for physician review
                  </p>

                </div>

              </div>

              <p className="mt-6 text-sm leading-7 text-slate-300">
                Patient reports approximately three months of
                intermittent digestive discomfort with bloating
                and post-meal heaviness. Appetite is variable,
                with irregular meal timings and predominantly
                sedentary activity. Sleep is reported as
                interrupted and unrefreshing.
              </p>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Important
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  This is a structured history draft and not a
                  diagnosis or treatment recommendation.
                </p>

              </div>

            </section>

            {/* DOCUMENTS */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <h3 className="font-bold text-slate-900">
                📄 Previous Documents
              </h3>

              <div className="mt-4 space-y-3">

                <DocumentRow
                  name="Previous_Prescription.pdf"
                  status="Processed"
                />

                <DocumentRow
                  name="Blood_Report.jpg"
                  status="Processed"
                />

              </div>

            </section>

            {/* ACTIONS */}
            <section className="rounded-3xl bg-white p-6 shadow-sm">

              <h3 className="font-bold text-slate-900">
                Physician Action
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Review and verify the generated history before
                saving it to the patient's record.
              </p>

              <button
                onClick={() => setEditing(!editing)}
                className="mt-5 w-full rounded-2xl border-2 border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                ✏️ {editing ? "Finish Editing" : "Edit History"}
              </button>

              <button
                onClick={() => setConfirmed(true)}
                className="mt-3 w-full rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700"
              >
                ✓ Confirm History
              </button>

              {confirmed && (

                <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-center">

                  <p className="font-semibold text-emerald-700">
                    History confirmed
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    Ready for physician consultation.
                  </p>

                </div>

              )}

            </section>

          </aside>

        </div>

        {/* DISCLAIMER */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">

          <p className="text-sm font-semibold text-amber-800">
            ⚠️ Physician Review Required
          </p>

          <p className="mt-1 text-sm leading-relaxed text-amber-700">
            MediKiosk organizes patient-provided information
            into a structured clinical history. The treating
            physician remains responsible for clinical
            assessment, diagnosis and treatment decisions.
          </p>

        </div>

      </div>

    </main>
  );
}


/* COMPONENTS */

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
        {icon}
      </div>

      <div>

        <h3 className="text-lg font-bold text-slate-900">
          {title}
        </h3>

        <p className="text-sm text-slate-400">
          {subtitle}
        </p>

      </div>

    </div>
  );
}


function Tag({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
      {text}
    </span>
  );
}


function HistoryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center">

      <span className="w-40 text-sm font-semibold text-slate-400">
        {label}
      </span>

      <span className="text-sm text-slate-700">
        {value}
      </span>

    </div>
  );
}


function AssessmentCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">

      <p className="text-sm font-semibold text-slate-400">
        {title}
      </p>

      <p className="mt-2 font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
}


function DocumentRow({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">

      <div className="flex min-w-0 items-center gap-3">

        <span className="text-xl">
          📄
        </span>

        <span className="truncate text-sm font-medium text-slate-700">
          {name}
        </span>

      </div>

      <span className="ml-3 shrink-0 text-xs font-semibold text-emerald-600">
        {status}
      </span>

    </div>
  );
}