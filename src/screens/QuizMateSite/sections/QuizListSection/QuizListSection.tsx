import { ArrowRightIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import QuizChoiceMultiple from "./QuizCard/QuizChoiceMultiple";
import QuizChoiceShortAnswer from "./QuizCard/QuizChoiceShortAnswer";
import QuizChoiceTrueFalse from "./QuizCard/QuizChoiceTrueFalse";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ScorePopupA from "../../../../components/Popup/ScorePopupA";
import QuizLoadingScreen from "./QuizLoadingScreen";
import QuizStartScreen from "./QuizStartScreen";
import QuizSolveScreen from "./QuizSolveScreen";

export const QuizListSection = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const fallbackFolderId = "683e8fd3a7d860028b795845"; // TODO: Replace with real folderId from props or router
  const location = useLocation();
  const state = location.state || {};
  const count = typeof state.quizCount === "number" ? state.quizCount : 10;
  const folderId = state.folderId || fallbackFolderId;
  const quizzes = state.quizzes || [];
  const [quizList, setQuizList] = useState(quizzes);
  const [answers, setAnswers] = useState<any[]>([]);
  const [startQuiz, setStartQuiz] = useState(false);
  
  const checkAnswer = (quiz: any, selected: string | number | null): boolean => {
    if (!quiz || selected === null || selected === undefined) return false;

    switch (quiz.quiz_type) {
      case "multiple_choice":
      case "true_false":
        return selected === quiz.correct_option;

      case "short_answer":
        return (
          typeof selected === "string" &&
          selected.trim().toLowerCase() === quiz.correct_answer.trim().toLowerCase()
        );

      default:
        return false;
    }
  };

  useEffect(() => {
    const MIN_LOADING_DURATION = 12000; // 12 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, MIN_LOADING_DURATION);

    const fetchQuizzes = async () => {
      if (state.quizzes && Array.isArray(state.quizzes) && state.quizzes.length > 0) {
        const isValid = state.quizzes.every(q => q.question && q.quiz_type);
        if (isValid) {
          console.log("🧪 유효한 퀴즈가 state에서 전달됨");
          setQuizList(state.quizzes);
          return;
        } else {
          console.warn("⚠️ 전달된 state.quizzes에 유효하지 않은 항목이 있습니다.");
        }
      }

      try {
        const res = await axios.get("http://localhost:8000/quiz/list", {
          params: {
            folder_id: folderId,
            page: 1,
            limit: count,
          },
        });
        console.log("✅ API 응답 수신:", res.data);
        setQuizList(res.data.quizzes);
      } catch (err) {
        console.error("❌ API 호출 실패:", err);
        console.error("퀴즈 불러오기 실패:", err);
      }
    };

    fetchQuizzes();

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [state.quizzes]);
  
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (startTime !== null) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startTime]);
  
  // 퀴즈 시작 버튼 눌렀을 때
  const handleStartQuiz = () => {
    setStartTime(Date.now());
  };

  // Dynamic quiz header info
  const totalQuizzes = quizList.length;

  const submitAnswers = async (submissionPayload: any) => {
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setFinalTime(elapsedTime); // capture final time before submitting
      const response = await axios.post("http://localhost:8000/quiz-qa/submit", submissionPayload);
      console.log("제출 결과:", response.data);
      setShowPopup(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        console.error("❗️422 오류 - 유효성 검증 실패:", error.response.data.detail);
      } else {
        console.error("제출 오류:", error);
      }
    }
  };

  if (loading) {
    return <QuizLoadingScreen />;
  }

  if (!startQuiz) {
    return <QuizStartScreen onStart={() => {
      setStartTime(Date.now());
      setStartQuiz(true);
    }} />;
  }

  return (
    <>
      <QuizSolveScreen
        quizList={quizList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        checkAnswer={checkAnswer}
        answers={answers}
        setAnswers={setAnswers}
        elapsedTime={elapsedTime}
        submitAnswers={submitAnswers}
        startTime={startTime}
        setStartTime={setStartTime}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        folderId={folderId}
        state={state}
        setFinalTime={setFinalTime}
      />
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 hover:cursor-pointer">
          <ScorePopupA
            correctCount={answers.filter((a) => a.user_answer === a.correct_answer).length}
            totalCount={answers.length}
            elapsedTime={finalTime}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </>
  );
};
