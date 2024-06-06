from contextlib import asynccontextmanager

from app.db import init_db
from app.routers import spells
from app.config.settings import origins

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_db()
    yield


app = FastAPI(docs_url="/api/docs", redoc_url=None, lifespan=lifespan)

app.include_router(spells.router, prefix="/api")

app.add_middleware(CORSMiddleware, allow_origins=origins)


@app.get("/")
async def home():
    return {
        "docs": "/api/docs",
        "spells": "/api/spells",
        "spell_names": "/api/spells/names",
    }
