from enum import Enum


class Classes(Enum, str):
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


class Subclasses(Enum, str):
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


class Components(Enum, str):
    VERBAL = "V"
    SOMANTIC = "S"
    MATERIAL = "M"


class Levels(Enum, int):
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


class MagicSchools(Enum, str):
    ABJURATION = "abjuration"
    CONJURATION = "conjuration"
    DIVINATION = "divination"
    ENCHANTMENT = "enchantment"
    EVOCATION = "evocation"
    ILLUSION = "illusion"
    NECROMANCY = "necromancy"
    TRANSMUTATION = "transmutation"


class DamageTypes(Enum, str):
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
