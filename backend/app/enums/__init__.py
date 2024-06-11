from enum import IntEnum, StrEnum


class Classes(StrEnum):
    """An enum for spell classes."""

    BARBARIAN = "barbarian"
    BARD = "bard"
    CLERIC = "cleric"
    DRUID = "druid"
    FIGHTER = "fighter"
    MONK = "monk"
    PALADIN = "paladin"
    RANGER = "ranger"
    ROGUE = "rogue"
    SORCERER = "sorcerer"
    WARLOCK = "warlock"
    WIZARD = "wizard"


class Subclasses(StrEnum):
    """An enum for spell subclasses."""

    BERSERKER = "berserker"
    CHAMPION = "champion"
    DEVOTION = "devotion"
    DRACONIC = "draconic"
    EVOCATION = "evocation"
    FIEND = "fiend"
    HUNTER = "hunter"
    LAND = "land"
    LIFE = "life"
    LORE = "lore"
    OPEN_HAND = "open-hand"
    THIEF = "thief"


class Components(StrEnum):
    """An enum for spell components."""

    VERBAL = "v"
    SOMANTIC = "s"
    MATERIAL = "m"
    VERBAL_SOMANTIC = "v,s"
    VERBAL_MATERIAL = "v,m"
    MATERIAL_SOMANTIC = "m,s"
    ALL = "v,s,m"


class Levels(IntEnum):
    """An enum for spell levels."""

    CANTRIP = 0
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5
    SIX = 6
    SEVEN = 7
    EIGHT = 8
    NINE = 9


class MagicSchools(StrEnum):
    """An enum for spell magic schools."""

    ABJURATION = "abjuration"
    CONJURATION = "conjuration"
    DIVINATION = "divination"
    ENCHANTMENT = "enchantment"
    EVOCATION = "evocation"
    ILLUSION = "illusion"
    NECROMANCY = "necromancy"
    TRANSMUTATION = "transmutation"


class DamageTypes(StrEnum):
    """An enum for spell damage types."""

    ACID = "acid"
    BLUDGEONING = "bludgeoning"
    COLD = "cold"
    FIRE = "fire"
    FORCE = "force"
    LIGHTNING = "lightning"
    NECROTIC = "nectoric"
    PIERCING = "piercing"
    POISON = "poison"
    PSYCHIC = "psychic"
    RADIANT = "radiant"
    SLASHING = "slashing"
    THUNDER = "thunder"


class CategoryTypes(StrEnum):
    CLASS = "class"
    SUBCLASS = "subclass"
    COMPONENT = "component"
    LEVEL = "level"
    SCHOOl = "school"
    DAMAGE = "damage"


CATEGORY_COUNT_MAPPING = {
    "Class": len(Classes),
    "Subclass": len(Subclasses),
    "Component": len(Components),
    "Level": len(Levels),
    "School": len(MagicSchools),
    "Damage": len(DamageTypes),
}

CATEGORY_MAPPING = {
    "class": Classes,
    "subclass": Subclasses,
    "component": Components,
    "level": Levels,
    "school": MagicSchools,
    "damage": DamageTypes,
}

CATEGORY_KEY_MAPPING = {
    "class": "classes.index",
    "subclass": "subclasses.index",
    "component": "components",
    "level": "level",
    "school": "school.index",
    "damage": "damage.damage_type.index",
}

COMPONENT_NAME_MAPPING = {
    "v": "Verbal",
    "s": "Somantic",
    "m": "Material",
    "v,s": "Verbal and Somantic",
    "v,m": "Verbal and Material",
    "m,s": "Material and Somantic",
    "v,s,m": "Verbal, Somantic and Material",
}
