from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import quiz, document, folder

app = FastAPI()

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React 개발 서버
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(quiz.router, prefix="/quiz", tags=["quiz"])
app.include_router(document.router, prefix="/document", tags=["document"])
app.include_router(folder.router, prefix="/folder", tags=["folder"]) 