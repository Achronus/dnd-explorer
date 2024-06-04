from .config.settings import settings
from .routers import dnd

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles


app = FastAPI(docs_url="/api/docs", redoc_url=None)

app.mount("/static", StaticFiles(directory=settings.DIRPATHS.PUBLIC), name="static")

app.include_router(dnd.router, prefix="/api")


@app.get("/")
async def home(request: Request):
    return {"docs": "/api/docs"}
