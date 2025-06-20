import { MoreHorizontalIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../../../../components/ui/card";
import Quizpopup from "../../../../components/Popup/Quizpopup";

interface QuizRecord {
  session_id: string;
  folder_id?: string;
  quiz_topic: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  total_score: number;
  percentage: number;
  submitted_at: string;
}

interface QuizSubmission {
  question_id: string;
  question_text: string;
  quiz_type: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  score: number;
  options?: string[] | null;
  time_spent?: number | null;
  question_order: number;
  created_at: string;
}

export const QuizViewSection = (): JSX.Element => {
  const [quizHistoryData, setQuizHistoryData] = useState<QuizRecord[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [quizDetails, setQuizDetails] = useState<QuizSubmission[] | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchQuizDetails = async (sessionId: string) => {
    try {
      const res = await axios.get(`http://localhost:8000/quiz-qa/sessions/${sessionId}/details`);
      console.log("✅ 세션 상세 응답 데이터:", res.data); // Debug log

      // Update options field logic as per instruction
      const updatedData = res.data.map((sub: any) => {
        const options = sub.options ?? sub.quiz_options ?? sub.quizOptions ?? [];
        return {
          ...sub,
          options: Array.isArray(options) ? options : [],
        };
      });

      setQuizDetails(updatedData);
      setShowPopup(true);
    } catch (error) {
      console.error("❌ 퀴즈 세션 상세 내역 조회 실패:", error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/quiz-qa/records", {
          params: { offset, limit }
        });
        setQuizHistoryData((prev) => {
          const newRecords = res.data.filter(
            (newItem) => !prev.some((item) => item.session_id === newItem.session_id)
          );
          return [...prev, ...newRecords];
        });
        setLoading(false);
      } catch (error) {
        console.error("퀴즈 기록 불러오기 실패:", error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [offset]);

  return (
    <Card className="w-80 bg-white rounded-2xl shadow-[0px_8px_32px_#00000020]">
      <div className="relative pt-[13px] pb-4 flex flex-col items-center">
        <img
          className="w-6 h-6 mb-4"
          alt="Quiz history icon"
          src="/image-47.png"
        />
        <div className="text-center">
          <p className="font-normal text-sm text-black leading-[16.8px] font-['Inter',Helvetica]">
            이전 퀴즈 기록
          </p>
        </div>
      </div>

      <div className="flex justify-center pb-2">
        <button
          onClick={async () => {
            setQuizHistoryData([]); // Clear existing data
            setOffset(0); // Reset offset

            try {
              setLoading(true);
              const res = await axios.get("http://localhost:8000/quiz-qa/records", {
                params: { offset: 0, limit }
              });
              setQuizHistoryData(res.data);
            } catch (error) {
              console.error("❌ 새로고침 중 오류 발생:", error);
            } finally {
              setLoading(false);
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded"
        >
          🔄 새로고침
        </button>
      </div>

      <CardContent
        className="p-3.5 max-h-[500px] overflow-auto"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
            setOffset((prev) => prev + limit);
          }
        }}
      >
        {quizHistoryData.map((quiz) => (
          <div
            key={quiz.session_id}
            className="w-full bg-gray-50 rounded-md p-3 relative"
            onClick={() => fetchQuizDetails(quiz.session_id)}
          >
            <div className="flex">
              <img
                className="w-[27px] h-[27px] object-cover"
                alt="Quiz thumbnail"
                src="/image-48.png"
              />
              <div className="flex flex-col ml-[22px] gap-1 w-[198px]">
                <p className="font-normal text-sm text-gray-900 leading-[19.6px] font-['Inter',Helvetica]">
                  {quiz.quiz_topic}
                </p>
                <p className="font-normal text-xs text-gray-400 leading-[14.4px] font-['Inter',Helvetica]">
                  {new Date(quiz.submitted_at).toLocaleDateString("ko-KR")}
                </p>
                <p className="font-normal text-xs text-gray-600 leading-[14.4px] font-['Inter',Helvetica]">
                  문제 수: {quiz.total_questions} / 정답: {quiz.correct_answers} / 오답: {quiz.wrong_answers}
                </p>
                <p className="font-normal text-xs text-gray-600 leading-[14.4px] font-['Inter',Helvetica]">
                  정답률 : ({quiz.percentage}%)
                </p>
              </div>
            </div>
            <button className="absolute top-3 right-3">
              <MoreHorizontalIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </CardContent>
      {showPopup && quizDetails && (
        <Quizpopup
          quizResults={quizDetails}
          onClose={() => {
            setShowPopup(false);
            setQuizDetails(null);
          }}
        />
      )}
    </Card>
  );
};
