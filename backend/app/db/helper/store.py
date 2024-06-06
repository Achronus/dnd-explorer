import asyncio

import aiohttp
from app.config.constants import SPELLS_URL
from app.config.settings import settings
from app.models import __beanie_models__
from app.models import DBSpellDetails
from app.utils.retrieval import fetch_all, fetch_one

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException


async def add_spells() -> None:
    """A helper method for extracting all the spell information from the [DnD API](https://5e-bits.github.io/docs/api/get-list-of-spells-with-optional-filtering) and storing them in the database."""
    client = AsyncIOMotorClient(settings.DB_URL)
    await init_beanie(
        database=client[settings.DB_NAME], document_models=__beanie_models__
    )

    print("Retrieving spells...", end="")
    spells = fetch_one(SPELLS_URL)
    urls = [f"{SPELLS_URL}/{item["index"]}" for item in spells["results"]]

    async with aiohttp.ClientSession() as session:
        data_list = await fetch_all(session, urls)
        documents = [DBSpellDetails(**item) for item in data_list]
    print("Complete.")

    print("Adding documents...", end="")
    try:
        await DBSpellDetails.insert_many(documents)
        print("Complete.")
    except HTTPException:
        raise HTTPException(status_code=400, detail="Item could not be created.")


asyncio.run(add_spells())
