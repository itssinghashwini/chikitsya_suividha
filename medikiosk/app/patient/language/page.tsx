"use client";

import { useRouter } from "next/navigation";

const languages = [
  { name: "English", nativeName: "English" },
  { name: "Hindi", nativeName: "हिन्दी" },
  { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { name: "Marathi", nativeName: "मराठी" },
  { name: "Bengali", nativeName: "বাংলা" },
  { name: "Tamil", nativeName: "தமிழ்" },
  { name: "Telugu", nativeName: "తెలుగు" },
  { name: "Gujarati", nativeName: "ગુજરાતી" },
];

export default function LanguagePage() {
  const router = useRouter();

  const selectLanguage = (language: string) => {
    console.log("Selected:", language);

    router.push("/patient/consent");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
            🩺
          </div>

          <h1 className="mt-6 text-4xl font-bold text-slate-900">
            Choose your language
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            अपनी भाषा चुनें
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Select the language you are most comfortable speaking.
          </p>

        </div>

        {/* Language Buttons */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {languages.map((language) => (
            <button
              key={language.name}
              onClick={() => selectLanguage(language.name)}
              className="
                rounded-2xl
                border-2
                border-transparent
                bg-white
                p-6
                text-center
                shadow-sm
                transition
                duration-200
                hover:border-blue-500
                hover:shadow-lg
                focus:outline-none
                focus:ring-4
                focus:ring-blue-200
              "
            >

              <div className="text-xl font-semibold text-slate-900">
                {language.nativeName}
              </div>

              <div className="mt-2 text-sm text-slate-500">
                {language.name}
              </div>

            </button>
          ))}

        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          You can change your language later.
        </p>

      </div>

    </main>
  );
}