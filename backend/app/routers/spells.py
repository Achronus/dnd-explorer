from typing import Optional
from app.enums import (
    CATEGORY_KEY_MAPPING,
    CATEGORY_MAPPING,
    COMPONENT_NAME_MAPPING,
    CategoryTypes,
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
    CategoryValues,
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
                    new_key = f"damage.{key}.index"
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


@router.get("/category/{type}", response_model=CategoryValues)
async def category_values(type: CategoryTypes):
    def handle_names(type: str, values: list[str | int]) -> list[str]:
        if type == CategoryTypes.COMPONENT:
            return [COMPONENT_NAME_MAPPING[value].title() for value in values]
        elif type == CategoryTypes.LEVEL:
            return [str(name) for name in values]
        else:
            return [value.title() for value in values]

    values = [e.value for e in CATEGORY_MAPPING[type]]
    names = handle_names(type, values)

    if type == "component":
        values = [value.upper().split(",") for value in values]

    find_key = CATEGORY_KEY_MAPPING[type]
    counts = [await DBSpellDetails.find({find_key: item}).count() for item in values]

    items = [
        CategoryCounts(name=str(name), count=count)
        for name, count in zip(names, counts)
    ]

    return CategoryValues(name=type, items=items)


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
