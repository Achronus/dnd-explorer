from typing import Optional
from app.enums import (
    CATEGORY_MAPPING,
    Classes,
    Components,
    DamageTypes,
    Levels,
    MagicSchools,
    Subclasses,
)
from app.models import DBSpellDetails
from app.models.local import (
    CategoryCounts,
    SpellNames,
    SpellOverviewResponse,
    SpellDetailsResponse,
    SpellOverviewInput,
)

from fastapi import HTTPException, APIRouter


router = APIRouter(prefix="/spells", tags=["spells"])


@router.get("/", response_model=SpellOverviewResponse)
async def spells_overview(
    limit: Optional[int] = None,
    skip: Optional[int] = None,
    classes: Optional[Classes] = None,
    subclasses: Optional[Subclasses] = None,
    components: Optional[Components] = None,
    level: Optional[Levels] = None,
    school: Optional[MagicSchools] = None,
    damage_type: Optional[DamageTypes] = None,
):
    def set_find_map(query: SpellOverviewInput) -> dict:
        find_map = {}

        for key, value in query.model_dump().items():
            if value and key not in ["limit", "skip"]:
                if key in ["classes", "subclasses", "school"]:
                    new_key = f"{key}.index"
                elif key == "damage_type":
                    new_key = f"damage.{key}"
                else:
                    new_key = key

                if key == "components":
                    value: list[str] = value.upper().split(",")

                find_map[new_key] = value

        return find_map

    query = SpellOverviewInput(
        limit=limit,
        skip=skip,
        classes=classes,
        subclasses=subclasses,
        components=components,
        level=level,
        school=school,
        damage_type=damage_type,
    )

    find_map = set_find_map(query)

    if find_map:
        if query.limit and not query.skip:
            result = await DBSpellDetails.find(find_map).limit(query.limit).to_list()
        else:
            result = await DBSpellDetails.find(find_map).to_list()

    else:
        if query.limit and not query.skip:
            result = await DBSpellDetails.find_all().limit(query.limit).to_list()
        else:
            result = await DBSpellDetails.find_all().to_list()

    if not result:
        raise HTTPException(status_code=404, detail="No items found.")

    if query.limit and query.skip:
        result = result[query.skip : query.skip + query.limit]

    return {"count": len(result), "items": result}


@router.get("/counts", response_model=list[CategoryCounts])
async def category_counts():
    return [{"name": k, "value": v} for k, v in CATEGORY_MAPPING.items()]


@router.get("/names", response_model=list[SpellNames] | list[str])
async def spell_names():
    result = await DBSpellDetails.find_all().to_list()

    if result is None:
        raise HTTPException(status_code=404, detail="Cannot retrieve data.")

    names = ["-".join(name.name.lower().split(" ")) for name in result]
    return names


@router.get("/{index}", response_model=SpellDetailsResponse)
async def spell_details(index: str):
    result = await DBSpellDetails.find_one(DBSpellDetails.index == index)

    if result is None:
        raise HTTPException(status_code=404, detail="Item not found.")

    return result
