import React from "react";

interface QuizSubmission {
  question_id: string;
  question_text: string;
  quiz_type: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  score: number;
  options?: string[] | null;
  quiz_options?: string[] | null;
  time_spent?: number | null;
  question_order: number;
  created_at: string;
}

interface QuizPopupProps {
  quizResults: QuizSubmission[];
  onClose: () => void;
}

const Quizpopup: React.FC<QuizPopupProps> = ({ quizResults, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-3xl max-h-[80%] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4">퀴즈 풀이 상세 내역</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          닫기
        </button>

        {quizResults.map((q, index) => {
          console.log("문제:", q.question_text);
          console.log("옵션:", q.options);
          console.log("내 답:", q.user_answer);
          console.log("정답:", q.correct_answer);

          if (!q.options || (Array.isArray(q.options) && q.options.length === 0)) {
            console.warn("❌ 옵션이 null이거나 비어 있음:", {
              question: q.question_text,
              options: q.options,
              user_answer: q.user_answer,
              correct_answer: q.correct_answer,
            });
          }

          console.log("🔑 키 확인:", `${q.question_id}-${index}`);

          return (
            <div key={`${q.question_id}-${index}`} className="mb-6 border-b pb-4">
            <p className="font-semibold mb-1">
              Q{q.question_order}. {q.question_text}
            </p>
            <ul className="mb-2">
              {((q.options && q.options.length > 0) ? q.options : (q.quiz_options && q.quiz_options.length > 0 ? q.quiz_options : [])).map((opt, idx) => (
                <li
                  key={idx}
                  className={`px-2 py-1 rounded ${
                    opt === q.correct_answer
                      ? "bg-green-100"
                      : opt === q.user_answer
                      ? "bg-red-100"
                      : ""
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
            <p className="text-sm">
              <strong>내 답변:</strong> {q.user_answer}
              {" / "}
              <strong>정답:</strong> {q.correct_answer}
            </p>
            <p className="text-sm">
              <strong>정답 여부:</strong>{" "}
              {q.is_correct ? "정답" : "오답"} | <strong>점수:</strong> {q.score}
            </p>
            {q.time_spent && <p className="text-sm">소요 시간: {q.time_spent}초</p>}
            <p className="text-xs text-gray-400 mt-1">제출 시각: {new Date(q.created_at).toLocaleString()}</p>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quizpopup;