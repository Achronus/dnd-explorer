from contextlib import asynccontextmanager

from app.config.dependencies import get_db
from app.config.settings import settings
from app.routers import spells

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles


@asynccontextmanager
async def lifespan(_: FastAPI):
    _ = await get_db()
    yield


app = FastAPI(docs_url="/api/docs", redoc_url=None, lifespan=lifespan)

app.mount("/static", StaticFiles(directory=settings.DIRPATHS.PUBLIC), name="static")

app.include_router(spells.router, prefix="/api")


@app.get("/")
async def home(request: Request):
    return {"docs": "/api/docs"}
