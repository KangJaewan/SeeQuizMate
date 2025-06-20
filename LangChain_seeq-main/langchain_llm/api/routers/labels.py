from fastapi import APIRouter, Query
from typing import List
from pydantic import BaseModel
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import random
load_dotenv()

router = APIRouter(prefix="/labels", tags=["labels"])

# MongoDB 연결 설정
MONGO_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGO_URI)
db = client[os.getenv("MONGODB_DB_NAME")]
labels_collection = db["labels"]

class LabelKeywordsResponse(BaseModel):
    document_id: str
    keywords: List[str]

@router.get("/keywords", response_model=List[LabelKeywordsResponse])
async def get_keywords(document_ids: List[str] = Query(...)):
    results = []
    for doc_id in document_ids:
        label_doc = labels_collection.find_one({"document_id": doc_id})
        if label_doc:
            keywords = label_doc.get("keywords", [])
            results.append({"document_id": doc_id, "keywords": keywords})
    return results

@router.get("/topic")
async def get_topic(document_ids: List[str] = Query(...)):
    all_keywords = []

    for doc_id in document_ids:
        label_doc = labels_collection.find_one({"document_id": doc_id})
        if label_doc:
            # labels.keywords 구조
            if "labels" in label_doc:
                keywords = label_doc["labels"].get("keywords", [])
            # 루트 수준 keywords
            elif "keywords" in label_doc:
                keywords = label_doc.get("keywords", [])
            else:
                keywords = []

            if keywords:
                all_keywords.append(random.choice(keywords))  # 대표 키워드 1개 수집

    if not all_keywords:
        return {"topic": None}

    topic = random.choice(all_keywords)

    return {"topic": topic}