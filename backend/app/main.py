from contextlib import asynccontextmanager

from app.db import init_db
from app.config.settings import settings
from app.routers import spells

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_db()
    yield


app = FastAPI(docs_url="/api/docs", redoc_url=None, lifespan=lifespan)

app.include_router(spells.router, prefix="/api")


origins = [
    f"http://localhost:{settings.PORT}",
    f"http://localhost:{settings.FRONT_PORT}",
    f"http://{settings.HOST}:{settings.FRONT_PORT}",
    f"http://frontend:{settings.FRONT_PORT}",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)
