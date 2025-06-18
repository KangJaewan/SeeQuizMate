import React from "react";
import { useState } from "react";
import FolderPopup from "../../components/Popup/FolderPopup";
import { Card, CardContent } from "../../components/ui/card";
import { QuizListSection } from "./sections/QuizListSection";
import { QuizSelectionSection } from "./sections/QuizSelectionSection";
import { QuizViewSection } from "./sections/QuizViewSection";

export const QuizMateSite = (): JSX.Element => {
  const [folderId, setFolderId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(true);

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
              <h1 className="font-bold text-indigo-600 text-2xl leading-[28.8px] whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]">
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
          <div className="col-span-3">
            <QuizViewSection />
          </div>
        </div>

        {/* Mascot and Chat Bubble - Bottom Left */}
        <div className="absolute bottom-5 left-5 flex items-end z-10">
          <Card className="w-64 h-[90px] bg-white rounded-[20px_20px_20px_4px] border-[3px] border-solid border-indigo-600">
            <CardContent className="p-4">
              <p className="[font-family:'Inter',Helvetica] font-normal text-black text-base tracking-[0] leading-[20px]">
                자, 준비됐나요? <br />
                뇌를 깨우는 시간이에요! 🧠✨
              </p>
            </CardContent>
          </Card>
          <div className="w-[100px] h-[100px] bg-[url(/quizmate----1.png)] bg-cover bg-[50%_50%] animate-[rotatefloat_4s_ease-in-out_infinite]" />
        </div>
      </div>
    </main>
  );
};