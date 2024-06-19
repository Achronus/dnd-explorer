from typing import Optional

from app.config.settings import settings

from beanie import Document
from pydantic import BaseModel


class CoreDetails(BaseModel):
    index: str
    name: str
    url: str


class DamageType(BaseModel):
    damage_type: Optional[CoreDetails] = None
    damage_at_character_level: Optional[dict[str, str]] = None


class DCType(BaseModel):
    dc_type: dict[str, str]
    dc_success: str


class DBSpellDetails(Document, CoreDetails):
    """The spell detail representation in the database."""

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

    class Settings:
        name = settings.DB_SPELLS_COLLECTION


__beanie_models__ = [DBSpellDetails]
