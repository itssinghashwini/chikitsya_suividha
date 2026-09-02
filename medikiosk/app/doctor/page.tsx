"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  complaint: string;
  prakriti: string;
  time: string;
  status: "Ready" | "In Consultation" | "Waiting";
  alert?: string;
};

const patients: Patient[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 30,
    gender: "Male",
    complaint: "Digestive discomfort",
    prakriti: "Vata-Pitta",
    time: "09:15 AM",
    status: "Ready",
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 42,
    gender: "Female",
    complaint: "Knee pain",
    prakriti: "Vata",
    time: "09:30 AM",
    status: "Ready",
  },
  {
    id: 3,
    name: "Amit Kumar",
    age: 55,
    gender: "Male",
    complaint: "Joint stiffness",
    prakriti: "Kapha-Vata",
    time: "09:45 AM",
    status: "Waiting",
    alert: "Severe pain reported",
  },
  {
    id: 4,
    name: "Sneha Rao",
    age: 28,
    gender: "Female",
    complaint: "Acidity",
    prakriti: "Pitta",
    time: "10:00 AM",
    status: "In Consultation",
  },
  {
    id: 5,
    name: "Vikram Singh",
    age: 48,
    gender: "Male",
    complaint: "Sleep disturbance",
    prakriti: "Vata",
    time: "10:15 AM",
    status: "Waiting",
  },
];

export default function DoctorDashboard() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.complaint.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Ready" && patient.status === "Ready") ||
      (activeTab === "Waiting" && patient.status === "Waiting") ||
      (activeTab === "Consultation" &&
        patient.status === "In Consultation");

    return matchesSearch && matchesTab;
  });

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
              <h1 className="text-lg font-bold text-slate-900">
                MediKiosk
              </h1>

              <p className="text-xs text-slate-500">
                Ayurveda OPD
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-slate-800">
                Dr. Anjali Sharma
              </p>

              <p className="text-xs text-slate-400">
                Ayurveda Physician
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              AS
            </div>

          </div>

        </div>

      </header>

      {/* MAIN */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* PAGE TITLE */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Physician Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Good morning, Dr. Sharma
            </h2>

            <p className="mt-2 text-slate-500">
              Review today's patient histories before consultation.
            </p>

          </div>

          <div className="text-sm text-slate-400">
            General Ayurveda OPD • Today
          </div>

        </div>

        {/* STAT CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon="👥"
            title="Today's Patients"
            value="24"
            description="+4 from yesterday"
          />

          <StatCard
            icon="✨"
            title="AI Histories Ready"
            value="8"
            description="Waiting for review"
          />

          <StatCard
            icon="⏳"
            title="Waiting"
            value="5"
            description="Patients in queue"
          />

          <StatCard
            icon="⚠️"
            title="Attention Required"
            value="2"
            description="Review alerts"
            alert
          />

        </div>

        {/* ALERT */}
        <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl">
              ⚠️
            </div>

            <div>

              <p className="font-bold text-amber-900">
                Patient attention required
              </p>

              <p className="mt-1 text-sm text-amber-700">
                2 patients have reported symptoms that may require
                priority clinical review.
              </p>

            </div>

            <button className="ml-auto hidden rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 sm:block">
              Review
            </button>

          </div>

        </div>

        {/* PATIENT SECTION */}
        <section className="mt-8 rounded-3xl bg-white shadow-sm">

          {/* SECTION HEADER */}
          <div className="border-b p-6">

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

              <div>

                <h3 className="text-xl font-bold text-slate-900">
                  Patient Queue
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Patient histories prepared by MediKiosk
                </p>

              </div>

              {/* SEARCH */}
              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search patient..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full rounded-2xl border-2
                    border-slate-200 bg-slate-50
                    py-3 pl-11 pr-4
                    outline-none
                    focus:border-blue-500
                    focus:bg-white
                    lg:w-80
                  "
                />

              </div>

            </div>

            {/* TABS */}
            <div className="mt-6 flex gap-2 overflow-x-auto">

              {["All", "Ready", "Waiting", "Consultation"].map(
                (tab) => (

                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      whitespace-nowrap rounded-xl px-4 py-2
                      text-sm font-semibold transition
                      ${
                        activeTab === tab
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }
                    `}
                  >
                    {tab}
                  </button>

                )
              )}

            </div>

          </div>

          {/* PATIENT LIST */}
          <div className="divide-y divide-slate-100">

            {filteredPatients.map((patient) => (

              <div
                key={patient.id}
                className="p-6 transition hover:bg-slate-50"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* PATIENT */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {patient.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>

                      <h4 className="font-bold text-slate-900">
                        {patient.name}
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        {patient.age} years • {patient.gender}
                      </p>

                    </div>

                  </div>

                  {/* COMPLAINT */}
                  <div className="lg:w-52">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Chief Complaint
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {patient.complaint}
                    </p>

                  </div>

                  {/* PRAKRITI */}
                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Prakriti
                    </p>

                    <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {patient.prakriti}
                    </span>

                  </div>

                  {/* TIME */}
                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {patient.time}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div>

                    <StatusBadge status={patient.status} />

                    {patient.alert && (

                      <p className="mt-2 text-xs font-semibold text-red-500">
                        ⚠ {patient.alert}
                      </p>

                    )}

                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() => router.push("/patient/complete")}
                    className="
                      rounded-xl bg-blue-600
                      px-5 py-3 text-sm font-semibold
                      text-white transition
                      hover:bg-blue-700
                    "
                  >
                    View History →
                  </button>

                </div>

              </div>

            ))}

            {filteredPatients.length === 0 && (

              <div className="p-12 text-center">

                <div className="text-4xl">
                  🔍
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  No patients found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Try a different search.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* BOTTOM INFO */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              🌿 Ayurveda Assessment
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Patient-reported Ayurvedic information such as
              Prakriti, Agni, Ahara, Vihara, Nidra and Dashavidha
              Pariksha is organized for physician verification.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <h3 className="font-bold text-slate-900">
              🔒 Clinical Safety
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              AI-generated histories are drafts only. Clinical
              assessment, diagnosis and treatment decisions remain
              with the treating physician.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}


/* STAT CARD */

function StatCard({
  icon,
  title,
  value,
  description,
  alert = false,
}: {
  icon: string;
  title: string;
  value: string;
  description: string;
  alert?: boolean;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
          {icon}
        </div>

        {alert && (
          <span className="h-3 w-3 rounded-full bg-red-500" />
        )}

      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* STATUS */

function StatusBadge({
  status,
}: {
  status: Patient["status"];
}) {
  const styles = {
    Ready: "bg-emerald-100 text-emerald-700",
    Waiting: "bg-amber-100 text-amber-700",
    "In Consultation": "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}