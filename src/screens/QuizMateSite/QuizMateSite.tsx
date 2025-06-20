import React, { useState, useEffect } from "react";
import FolderPopup from "../../components/Popup/FolderPopup";
import { Card, CardContent } from "../../components/ui/card";
import { QuizListSection } from "./sections/QuizListSection";
import { QuizSelectionSection } from "./sections/QuizSelectionSection";
import { QuizViewSection } from "./sections/QuizViewSection";

export const QuizMateSite = (): JSX.Element => {
  const [folderId, setFolderId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "자, 준비됐나요? 뇌를 깨우는 시간이에요! 🧠✨",
    "오늘도 퀴즈로 똑똑해지는 하루! 📘",
    "몰입의 시간! 지금 집중해볼까요? 💡",
    "내일의 나를 위한 10분 투자! ⏱️",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleFolderSelect = (id: string) => {
    setFolderId(id);
    setShowPopup(false);
  };

  if (showPopup) {
    return <FolderPopup onSelect={handleFolderSelect} />;
  }

  return (
    <main className="bg-slate-100 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-slate-100 w-full max-w-[1444px] relative">
        {/* Header with Logo - Positioned at top left */}
        <header className="absolute top-5 left-5 z-10">
          <div className="flex items-center gap-3">
            <img
              className="w-[38px] h-[38px] object-cover"
              alt="Quiz Mate Logo"
              src="/image-43.png"
            />
            <div className="inline-flex flex-col items-start gap-0.5">
              <h1 className="font-bold text-indigo-600 text-4xl leading-[38px] whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]">
                Quiz Mate
              </h1>
            </div>
          </div>
        </header>
 
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6 pt-24 px-6 pb-40">
          {/* Quiz Selection Section - Left Column */}
          <div className="col-span-3">
            <QuizSelectionSection folderId={folderId} />
          </div>

          {/* Quiz List Section - Center Column */}
          <div className="col-span-6">
            <QuizListSection />
          </div>

          {/* Quiz View Section - Right Column */}
          <div className="col-span-3 min-h-[800px]">
            <QuizViewSection />
          </div>
        </div>

        {/* Mascot and Chat Bubble - Bottom Center */}
        <div className="absolute bottom-96 left-1/2 transform -translate-x-1/2 flex items-end z-10 gap-4">
          <Card className="w-80 h-[120px] bg-white rounded-[20px_20px_20px_4px] border-[3px] border-solid border-indigo-600 shadow-lg flex items-center justify-center">
            <CardContent className="p-5 text-center">
              <p className="[font-family:'Inter',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[24px]">
                {messages[messageIndex]}
              </p>
            </CardContent>
          </Card>
          <div className="w-[120px] h-[120px] bg-[url(/quizmate----1.png)] bg-cover bg-[50%_50%] animate-[rotatefloat_4s_ease-in-out_infinite]" />
        </div>
      </div>
    </main>
  );
};