from fastapi import APIRouter, Query
from typing import List, Dict
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/documents", tags=["documents"])

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGODB_DB_NAME")]
documents_collection = db["documents"]

@router.get("")
async def get_documents_by_folder(folder_id: str):
    docs = documents_collection.find(
        {"folder_id": folder_id},
        {"_id": 0, "file_metadata.file_id": 1, "created_at": 1}
    )
    return list(docs)
