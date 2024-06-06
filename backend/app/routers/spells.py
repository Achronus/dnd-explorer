from app.models import DBSpellDetails
from app.models.local import SpellOverview, SpellDetails

from fastapi import HTTPException, APIRouter


router = APIRouter(prefix="/spells", tags=["spells"])


@router.get("/", response_model=list[SpellOverview])
async def spells_overview(limit: int = None, skip: int = None):
    if limit and not skip:
        result = await DBSpellDetails.find_all().limit(limit).to_list()
    else:
        result = await DBSpellDetails.find_all().to_list()

        if limit and skip:
            result = result[skip : skip + limit]

    if result is None:
        raise HTTPException(status_code=404, detail="Cannot retrieve data.")

    return result


@router.get("/{index}", response_model=SpellDetails)
async def spell_details(index: str):
    result = await DBSpellDetails.find_one(DBSpellDetails.index == index)

    if result is None:
        raise HTTPException(status_code=404, detail="Item not found.")

    return result
