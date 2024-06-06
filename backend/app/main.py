from contextlib import asynccontextmanager

from app.models import __beanie_models__
from app.config.settings import settings
from app.routers import spells

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles


@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncIOMotorClient(settings.DB_URL)
    await init_beanie(
        database=client[settings.DB_NAME], document_models=__beanie_models__
    )
    yield


app = FastAPI(docs_url="/api/docs", redoc_url=None, lifespan=lifespan)

app.mount("/static", StaticFiles(directory=settings.DIRPATHS.PUBLIC), name="static")

app.include_router(spells.router, prefix="/api")


@app.get("/")
async def home(request: Request):
    return {"docs": "/api/docs"}
