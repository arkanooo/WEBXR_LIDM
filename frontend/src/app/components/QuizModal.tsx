import { useState } from "react";
import { type QuizItem } from "../data/modul";

type QuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  quiz: QuizItem[];
  type: "Pre-test" | "Post-test";
  onComplete: (score: number) => void;
};

export function QuizModal({ isOpen, onClose, quiz, type, onComplete }: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = quiz[currentIndex];

  const handleNext = () => {
    if (selectedOption === null) return;

    let newScore = score;
    if (selectedOption === currentQ.answerIndex) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      const finalScore = Math.round((newScore / quiz.length) * 100);
      onComplete(finalScore);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={isFinished ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white tracking-wide">
            {type} <span className="text-zinc-400 text-sm font-normal ml-2">Knowledge Check</span>
          </h2>
          {isFinished && (
            <button onClick={onClose} className="text-zinc-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {!isFinished ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between text-xs font-medium text-emerald-400 mb-4 tracking-wider uppercase">
                <span>Pertanyaan {currentIndex + 1} dari {quiz.length}</span>
              </div>
              
              <h3 className="text-lg text-white mb-6 leading-relaxed">
                {currentQ.q}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                      selectedOption === i 
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                        : "bg-black/40 border-white/5 text-zinc-300 hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-start">
                      <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs mr-3 mt-0.5 ${
                        selectedOption === i ? "bg-emerald-500 text-white" : "bg-white/10 text-zinc-400"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {currentIndex === quiz.length - 1 ? "Selesai" : "Selanjutnya"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Kuis Selesai!</h3>
              <p className="text-zinc-400 mb-6">
                {type === "Pre-test" 
                  ? "Bagus! Kamu sekarang sudah siap untuk memulai simulasi praktikum VR."
                  : "Luar biasa! Kamu telah menyelesaikan modul praktikum ini."}
              </p>
              
              <div className="inline-block bg-black/50 border border-white/10 rounded-2xl px-8 py-6 mb-8">
                <div className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Skor Kamu</div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {Math.round((score / quiz.length) * 100)}
                </div>
              </div>

              <div>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                  {type === "Pre-test" ? "Mulai Simulasi VR Sekarang" : "Kembali ke Beranda"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
