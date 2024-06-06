from typing import Optional
from app.models import CoreDetails, DCType, DamageType
from pydantic import BaseModel, field_validator


class SpellNames(BaseModel):
    """A model for retrieving all the spell names."""

    name: str


class SpellOverview(BaseModel):
    """A model for a spells overview details."""

    name: str
    desc: list[str] | str
    level: int
    school: CoreDetails
    range: str
    url: str

    @field_validator("desc")
    def validate_desc(cls, desc: list[str]) -> str:
        if desc:
            return desc[0]

        return ""


class SpellDetails(BaseModel):
    """A model for a spells complete details."""

    name: str
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
