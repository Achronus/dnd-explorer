from contextlib import asynccontextmanager

from app.db import init_db
from app.routers import spells

from fastapi import FastAPI, Request


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_db()
    yield


app = FastAPI(docs_url="/api/docs", redoc_url=None, lifespan=lifespan)

app.include_router(spells.router, prefix="/api")


@app.get("/")
async def home(request: Request):
    return {"docs": "/api/docs"}
