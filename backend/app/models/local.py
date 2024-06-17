from typing import Optional

from app.enums import Classes, Components, DamageTypes, Levels, MagicSchools, Subclasses
from app.models import CoreDetails, DCType, DamageType
from pydantic import BaseModel, ConfigDict, field_validator


class SpellNames(BaseModel):
    """A model for retrieving all the spell names."""

    name: str


class CategoryCounts(BaseModel):
    """A model for category counts."""

    name: str
    count: int
    value: str


class CategoryValues(BaseModel):
    """A model for category values."""

    name: str
    items: list[CategoryCounts]


class CategoryCountsResponse(BaseModel):
    """A response model for the `category_counts` route."""

    query: str
    categories: list[CategoryValues]


class SpellOverviewInput(BaseModel):
    """A model that represents the query parameters for the `spells_overview` route."""

    limit: Optional[int] = None
    skip: Optional[int] = None
    classes: Optional[Classes] = None
    subclass: Optional[Subclasses] = None
    components: Optional[Components] = None
    level: Optional[Levels] = None
    school: Optional[MagicSchools] = None
    damage_type: Optional[DamageTypes] = None

    model_config = ConfigDict(use_enum_values=True)


class SpellOverview(BaseModel):
    """A model for the spell overview details."""

    name: str
    index: str
    desc: list[str] | str

    @field_validator("desc")
    def validate_desc(cls, desc: list[str]) -> str:
        if desc:
            return desc[0]

        return ""


class SpellOverviewResponse(BaseModel):
    """A model for the `spells_overview` route reponse."""

    count: int
    items: list[SpellOverview]


class SpellSearchResponse(BaseModel):
    """A model for the `spell_search` route response."""

    count: int
    results: list[SpellOverview]


class SpellDetailsResponse(BaseModel):
    """A model that represents the spell details for each spell."""

    name: str
    index: str
    desc: list[str]
    higher_level: list[str]
    range: str
    components: list[str]
    ritual: bool
    duration: str
    concentration: bool
    casting_time: str
    level: int
    damage: Optional[DamageType] = None
    dc: Optional[DCType] = None
    school: CoreDetails
    classes: list[CoreDetails]
    subclasses: list[CoreDetails]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Acid Arrow",
                    "desc": [
                        "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn."
                    ],
                    "higher_level": [
                        "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd."
                    ],
                    "range": "90 feet",
                    "components": ["V", "S", "M"],
                    "ritual": False,
                    "duration": "Instantaneous",
                    "concentration": False,
                    "casting_time": "1 action",
                    "level": 2,
                    "damage": {
                        "damage_type": {
                            "index": "acid",
                            "name": "Acid",
                            "url": "/api/damage-types/acid",
                        },
                        "damage_at_character_level": None,
                    },
                    "dc": None,
                    "school": {
                        "index": "evocation",
                        "name": "Evocation",
                        "url": "/api/magic-schools/evocation",
                    },
                    "classes": [
                        {
                            "index": "wizard",
                            "name": "Wizard",
                            "url": "/api/classes/wizard",
                        }
                    ],
                    "subclasses": [
                        {
                            "index": "lore",
                            "name": "Lore",
                            "url": "/api/subclasses/lore",
                        },
                        {
                            "index": "land",
                            "name": "Land",
                            "url": "/api/subclasses/land",
                        },
                    ],
                }
            ]
        },
    }
