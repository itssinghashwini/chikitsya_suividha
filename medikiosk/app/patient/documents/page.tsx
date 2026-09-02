"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

type DocumentItem = {
  id: number;
  name: string;
  type: string;
  size: string;
};

export default function DocumentsPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) return;

    const newDocuments: DocumentItem[] = Array.from(files).map(
      (file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type || "Document",
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      })
    );

    setDocuments((previous) => [
      ...previous,
      ...newDocuments,
    ]);

    event.target.value = "";
  }

  function removeDocument(id: number) {
    setDocuments((previous) =>
      previous.filter((document) => document.id !== id)
    );
  }

  function continueToSummary() {
    setIsProcessing(true);

    setTimeout(() => {
      router.push("/patient/complete");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🩺
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                MediKiosk
              </h1>

              <p className="text-xs text-slate-500">
                Ayurveda OPD Assistant
              </p>
            </div>

          </div>

          <div className="text-right">

            <p className="text-sm font-semibold text-slate-700">
              Step 4 of 5
            </p>

            <p className="text-xs text-slate-400">
              Previous medical records
            </p>

          </div>

        </div>

      </header>

      {/* Main */}
      <div className="mx-auto max-w-4xl px-6 py-10">

        {/* Title */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
            📄
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Previous Medical Records
          </h2>

          <p className="mt-3 text-lg text-slate-600">
            पुराने मेडिकल रिकॉर्ड
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Upload prescriptions, laboratory reports, discharge
            summaries or previous consultation records.
          </p>

        </div>

        {/* Upload Card */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">

          <label
            htmlFor="document-upload"
            className="
              flex cursor-pointer flex-col items-center
              justify-center rounded-3xl border-2
              border-dashed border-slate-300
              bg-slate-50 px-6 py-12
              text-center transition
              hover:border-blue-500
              hover:bg-blue-50
            "
          >

            <div className="text-5xl">
              📤
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-900">
              Upload your medical documents
            </h3>

            <p className="mt-2 text-slate-500">
              Tap here to choose files from this device
            </p>

            <p className="mt-4 text-sm text-slate-400">
              PDF, JPG, JPEG or PNG
            </p>

            <span
              className="
                mt-6 rounded-2xl bg-blue-600
                px-7 py-4 text-lg font-semibold
                text-white
              "
            >
              Choose Files
            </span>

            <input
              id="document-upload"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFiles}
              className="hidden"
            />

          </label>

          {/* Document Types */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-blue-50 p-5 text-center">
              <div className="text-3xl">💊</div>

              <p className="mt-2 font-semibold text-slate-800">
                Prescriptions
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Previous medicines
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5 text-center">
              <div className="text-3xl">🧪</div>

              <p className="mt-2 font-semibold text-slate-800">
                Lab Reports
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Blood tests & reports
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-5 text-center">
              <div className="text-3xl">🏥</div>

              <p className="mt-2 font-semibold text-slate-800">
                Discharge Summary
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Hospital records
              </p>
            </div>

          </div>

        </div>

        {/* Uploaded Documents */}
        {documents.length > 0 && (

          <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Uploaded Documents
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {documents.length} document
                  {documents.length !== 1 ? "s" : ""} selected
                </p>
              </div>

              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Ready
              </span>

            </div>

            <div className="mt-6 space-y-4">

              {documents.map((document) => (

                <div
                  key={document.id}
                  className="
                    flex items-center justify-between
                    rounded-2xl border border-slate-200
                    bg-slate-50 p-4
                  "
                >

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl">
                      📄
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-semibold text-slate-800">
                        {document.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {document.size}
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => removeDocument(document.id)}
                    className="
                      ml-4 rounded-xl px-4 py-2
                      text-sm font-semibold text-red-500
                      hover:bg-red-50
                    "
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Privacy */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">

          <div className="flex gap-3">

            <span className="text-xl">
              🔒
            </span>

            <div>

              <p className="font-semibold text-slate-800">
                Your documents are handled securely
              </p>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Documents are used to prepare your clinical
                history for review by your healthcare professional.
              </p>

            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          <button
            type="button"
            onClick={() => router.back()}
            className="
              flex-1 rounded-2xl border-2
              border-slate-200 bg-white
              px-6 py-4 text-lg font-semibold
              text-slate-700 hover:bg-slate-50
            "
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={continueToSummary}
            disabled={isProcessing}
            className="
              flex-1 rounded-2xl bg-blue-600
              px-6 py-4 text-lg font-semibold
              text-white transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:bg-slate-400
            "
          >
            {isProcessing
              ? "Preparing your history..."
              : "Continue"}
          </button>

        </div>

        {/* Skip */}
        {documents.length === 0 && !isProcessing && (

          <button
            type="button"
            onClick={continueToSummary}
            className="mt-5 block w-full text-center text-sm font-medium text-slate-500 hover:text-blue-600"
          >
            I don't have previous documents
          </button>

        )}

        {/* Progress */}
        <div className="mt-8 text-center">

          <p className="text-sm text-slate-400">
            Step 4 of 5
          </p>

          <div className="mx-auto mt-3 h-2 max-w-xs overflow-hidden rounded-full bg-slate-200">

            <div className="h-full w-4/5 rounded-full bg-blue-600" />

          </div>

        </div>

      </div>

    </main>
  );
}