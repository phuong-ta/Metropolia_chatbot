from fastapi import APIRouter

chatbot_router = APIRouter()


@chatbot_router.post("/chat")
async def upload_message():
    return {"response": "Hi there!"}
