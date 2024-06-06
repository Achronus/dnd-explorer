from app.models import __beanie_models__
from app.config.settings import settings

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient


async def get_db():
    """A dependency to retrieve a database connection."""
    client = AsyncIOMotorClient(settings.DB_URL)
    database = client[settings.DB_NAME]
    await init_beanie(database=database, document_models=__beanie_models__)
    return database
