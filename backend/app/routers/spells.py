import asyncio
from typing import Optional
from app.enums import (
    CATEGORY_KEY_MAPPING,
    CATEGORY_MAPPING,
    COMPONENT_NAME_MAPPING,
    QUERY_CAT_MAPPING,
    CategoryTypes,
    Classes,
    Components,
    DamageTypes,
    Levels,
    MagicSchools,
    SpellQueryKeys,
    Subclasses,
)
from app.models import DBSpellDetails
from app.models.local import (
    CategoryCounts,
    CategoryCountsResponse,
    CategoryValues,
    SpellNames,
    SpellOverviewResponse,
    SpellDetailsResponse,
    SpellOverviewInput,
    SpellSearchResponse,
)

from fastapi import HTTPException, APIRouter, Request


router = APIRouter(prefix="/spells", tags=["spells"])


@router.get("", response_model=SpellOverviewResponse)
async def spells_overview(
    limit: Optional[int] = None,
    skip: Optional[int] = None,
    classes: Optional[Classes] = None,
    subclass: Optional[Subclasses] = None,
    components: Optional[Components] = None,
    level: Optional[Levels] = None,
    school: Optional[MagicSchools] = None,
    damage_type: Optional[DamageTypes] = None,
):
    def set_find_map(query: SpellOverviewInput) -> dict:
        find_map = {}

        for key, value in query.model_dump().items():
            if value is not None and key not in [
                SpellQueryKeys.LIMIT,
                SpellQueryKeys.SKIP,
            ]:
                new_key = CATEGORY_KEY_MAPPING[key]

                if key == SpellQueryKeys.COMPONENTS:
                    value: list[str] = value.upper().split(",")

                find_map[new_key] = value

        return find_map

    query = SpellOverviewInput(
        limit=limit,
        skip=skip,
        classes=classes,
        subclass=subclass,
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
        return {"count": 0, "items": []}

    if query.limit and query.skip:
        result = result[query.skip : query.skip + query.limit]

    return {"count": len(result), "items": result}


@router.get("/search", response_model=SpellSearchResponse)
async def spell_search(query: str, limit: Optional[int] = 5):
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter required.")

    pattern = f"^{query}"
    find_map = {"name": {"$regex": pattern, "$options": "i"}}

    if limit:
        result = await DBSpellDetails.find(find_map).limit(limit).sort("name").to_list()
    else:
        result = await DBSpellDetails.find(find_map).sort("name").to_list()

    if not result:
        return {"count": 0, "results": []}

    return {"count": len(result), "results": result}


@router.get("/counts", response_model=CategoryCountsResponse)
async def category_counts(
    request: Request,
    classes: Optional[Classes] = None,
    subclass: Optional[Subclasses] = None,
    components: Optional[Components] = None,
    level: Optional[Levels] = None,
    school: Optional[MagicSchools] = None,
    damage_type: Optional[DamageTypes] = None,
):
    def handle_names(type: str, values: list[str | int]) -> list[str]:
        if type == CategoryTypes.COMPONENT:
            return [COMPONENT_NAME_MAPPING[value].title() for value in values]
        elif type == CategoryTypes.LEVEL:
            return [str(name) for name in values]
        else:
            return [value.title() for value in values]

    query_dict = {
        "classes": classes,
        "subclass": subclass,
        "components": components,
        "level": level,
        "school": school,
        "damage_type": damage_type,
    }

    missing_keys = [key for key, value in query_dict.items() if value is None]

    categories = []
    for i in missing_keys:
        key = QUERY_CAT_MAPPING[i]
        values = [e.value for e in CATEGORY_MAPPING[key]]
        names = handle_names(key, values)

        tasks = []
        for item in values:
            search_dict = query_dict.copy()
            search_dict[i] = item
            tasks.append(spells_overview(**search_dict))

        responses = await asyncio.gather(*tasks)
        counts = [response["count"] for response in responses]

        items = [
            CategoryCounts(name=str(name), count=count, value=str(value))
            for name, count, value in zip(names, counts, values)
            if count != 0
        ]
        categories.append(CategoryValues(name=key, items=items))

    query = str(request.query_params)
    return {"query": query, "categories": categories}


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
