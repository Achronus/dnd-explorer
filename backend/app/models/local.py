from typing import Optional
from app.models import CoreDetails, DCType, DamageType
from pydantic import BaseModel, field_validator


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
