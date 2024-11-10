from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from routers.index import index_router
from routers.chatbot import chatbot_router

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(index_router)
app.include_router(chatbot_router)
