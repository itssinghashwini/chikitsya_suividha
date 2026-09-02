"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  section: string;
  sectionHindi: string;
  question: string;
  questionHindi: string;
  subtitle: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    section: "Chief Complaint",
    sectionHindi: "मुख्य शिकायत",
    question: "What brings you here today?",
    questionHindi: "आज आप किस समस्या के लिए आए हैं?",
    subtitle:
      "Tell us about the main health problem you are experiencing.",
    options: [
      "Pain",
      "Digestive problem",
      "Fever",
      "Joint problem",
      "Skin problem",
      "Other",
    ],
  },

  {
    id: 2,
    section: "Present Illness",
    sectionHindi: "वर्तमान बीमारी का इतिहास",
    question: "When did this problem begin?",
    questionHindi: "यह समस्या कब शुरू हुई?",
    subtitle:
      "Choose the option that best describes when you first noticed the problem.",
    options: [
      "Today",
      "Within the last week",
      "1–4 weeks ago",
      "1–6 months ago",
      "More than 6 months ago",
    ],
  },

  {
    id: 3,
    section: "Agni",
    sectionHindi: "अग्नि",
    question: "How would you describe your appetite?",
    questionHindi: "आप अपनी भूख को कैसे बताएंगे?",
    subtitle:
      "Think about your usual appetite and how regularly you feel hungry.",
    options: [
      "Good and regular",
      "Variable / irregular",
      "Low appetite",
      "Very strong appetite",
      "No appetite",
    ],
  },

  {
    id: 4,
    section: "Digestion",
    sectionHindi: "पाचन",
    question: "How is your digestion usually?",
    questionHindi: "आपका पाचन सामान्यतः कैसा रहता है?",
    subtitle:
      "Choose the option that most closely matches your usual experience.",
    options: [
      "Normal",
      "Gas or bloating",
      "Acidity or burning",
      "Heaviness after meals",
      "Irregular digestion",
    ],
  },

  {
    id: 5,
    section: "Mala",
    sectionHindi: "मल",
    question: "How are your bowel movements?",
    questionHindi: "आपकी मल त्याग की स्थिति कैसी है?",
    subtitle:
      "Tell us about your usual bowel movement pattern.",
    options: [
      "Regular",
      "Constipation",
      "Loose stools",
      "Irregular",
      "Other",
    ],
  },

  {
    id: 6,
    section: "Ahara",
    sectionHindi: "आहार",
    question: "How would you describe your usual eating habits?",
    questionHindi: "आपकी सामान्य भोजन की आदतें कैसी हैं?",
    subtitle:
      "Think about meal timing, food choices and regularity.",
    options: [
      "Regular and balanced",
      "Irregular meal timings",
      "Frequently eat outside",
      "Very spicy / oily food",
      "Mostly light food",
      "Other",
    ],
  },

  {
    id: 7,
    section: "Vihara",
    sectionHindi: "विहार",
    question: "How physically active are you?",
    questionHindi: "आपकी शारीरिक गतिविधि कैसी है?",
    subtitle:
      "Consider your daily work, exercise and general physical activity.",
    options: [
      "Very active",
      "Moderately active",
      "Lightly active",
      "Mostly sedentary",
    ],
  },

  {
    id: 8,
    section: "Nidra",
    sectionHindi: "निद्रा",
    question: "How is your sleep?",
    questionHindi: "आपकी नींद कैसी रहती है?",
    subtitle:
      "Tell us about your usual sleep duration and quality.",
    options: [
      "Good and refreshing",
      "Difficulty falling asleep",
      "Frequent waking",
      "Too much sleep",
      "Poor / unrefreshing sleep",
    ],
  },

  {
    id: 9,
    section: "Dashavidha Pariksha",
    sectionHindi: "दशविध परीक्षा",
    question: "How would you describe your body constitution?",
    questionHindi: "आप अपने शरीर की प्रकृति को कैसे बताएंगे?",
    subtitle:
      "Select the description that feels closest to your usual constitution. The physician will verify this information.",
    options: [
      "Lean / light build",
      "Medium build",
      "Broad / sturdy build",
      "Not sure",
    ],
  },

  {
    id: 10,
    section: "Medical History",
    sectionHindi: "पूर्व चिकित्सा इतिहास",
    question: "Do you have any existing medical conditions?",
    questionHindi: "क्या आपको पहले से कोई बीमारी है?",
    subtitle:
      "Include conditions such as diabetes, hypertension, asthma or other diagnosed conditions.",
    options: [
      "Yes",
      "No",
      "Not sure",
    ],
  },

  {
    id: 11,
    section: "Medication",
    sectionHindi: "दवाइयाँ",
    question: "Are you currently taking any medicines?",
    questionHindi: "क्या आप वर्तमान में कोई दवा ले रहे हैं?",
    subtitle:
      "Include Ayurvedic, modern, homeopathic or other medicines.",
    options: [
      "Yes",
      "No",
      "Not sure",
    ],
  },

  {
    id: 12,
    section: "Allergies",
    sectionHindi: "एलर्जी",
    question: "Do you have any known allergies?",
    questionHindi: "क्या आपको किसी चीज़ से एलर्जी है?",
    subtitle:
      "This includes medicine, food or other known allergies.",
    options: [
      "Yes",
      "No",
      "Not sure",
    ],
  },
];

export default function InterviewPage() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isListening, setIsListening] = useState(false);

  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  function selectAnswer(answer: string) {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((previous) => previous + 1);
      } else {
        router.push("/patient/documents");
      }
    }, 250);
  }

  function toggleListening() {
    setIsListening((previous) => !previous);
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    } else {
      router.back();
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
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
              Question {currentQuestion + 1} of {questions.length}
            </p>

            <p className="text-xs text-slate-400">
              Clinical history
            </p>

          </div>

        </div>

        {/* Progress */}
        <div className="h-2 bg-slate-200">

          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

        </div>

      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* SECTION */}
        <div className="text-center">

          <span className="inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
            {question.section}
          </span>

          <p className="mt-2 text-sm text-slate-500">
            {question.sectionHindi}
          </p>

          <h2 className="mt-6 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {question.question}
          </h2>

          <p className="mt-3 text-xl text-slate-700">
            {question.questionHindi}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
            {question.subtitle}
          </p>

        </div>

        {/* VOICE CARD */}
        <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-white p-8 text-center shadow-lg">

          <button
            type="button"
            onClick={toggleListening}
            className={`
              mx-auto flex h-24 w-24 items-center justify-center
              rounded-full text-4xl shadow-lg transition-all
              ${
                isListening
                  ? "scale-105 bg-red-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            {isListening ? "⏹" : "🎤"}
          </button>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">

            {isListening
              ? "Listening..."
              : "Tap to speak"}

          </h3>

          <p className="mt-2 text-sm text-slate-500">

            {isListening
              ? "Speak naturally. MediKiosk is listening."
              : "You can speak or select an answer below."}

          </p>

          {isListening && (
            <div className="mt-5 flex justify-center gap-1">

              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />

              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:100ms]" />

              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:200ms]" />

              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:300ms]" />

            </div>
          )}

        </div>

        {/* DIVIDER */}
        <div className="my-10 flex items-center gap-4">

          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs font-semibold tracking-wider text-slate-400">
            OR SELECT AN ANSWER
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* OPTIONS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {question.options.map((option) => {

            const selected =
              answers[question.id] === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => selectAnswer(option)}
                className={`
                  flex items-center rounded-2xl border-2
                  px-6 py-5 text-left text-lg font-semibold
                  shadow-sm transition-all
                  ${
                    selected
                      ? "border-blue-600 bg-blue-50 text-blue-800"
                      : "border-slate-200 bg-white text-slate-800 hover:border-blue-500 hover:bg-blue-50"
                  }
                `}
              >

                <span
                  className={`
                    mr-4 flex h-7 w-7 items-center justify-center
                    rounded-full border-2 text-sm
                    ${
                      selected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300"
                    }
                  `}
                >
                  {selected ? "✓" : ""}
                </span>

                {option}

              </button>
            );
          })}

        </div>

        {/* NAVIGATION */}
        <div className="mt-10 flex items-center justify-between">

          <button
            type="button"
            onClick={goBack}
            className="
              rounded-2xl border-2 border-slate-200
              bg-white px-6 py-4 font-semibold
              text-slate-700 transition
              hover:bg-slate-50
            "
          >
            ← Back
          </button>

          <div className="hidden text-right sm:block">

            <p className="text-sm font-medium text-slate-500">
              Ayurvedic clinical history
            </p>

            <p className="text-xs text-slate-400">
              Your answers will be reviewed by the physician.
            </p>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t bg-white py-5">

        <p className="text-center text-sm text-slate-400">
          🔒 Secure patient session • Physician reviewed
        </p>

      </footer>

    </main>
  );
}