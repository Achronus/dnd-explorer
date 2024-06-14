import { CategoryCounts, QueryParam } from "@/types/option";

export const urlSpellPrefix = "/api/spells/";

export const SpellQueryParams: QueryParam[] = [
  {
    name: "class",
    value: "",
    prefix: "classes=",
  },
  {
    name: "subclass",
    value: "",
    prefix: "subclass=",
  },
  {
    name: "component",
    value: "",
    prefix: "components=",
  },
  {
    name: "level",
    value: "",
    prefix: "level=",
  },
  {
    name: "school",
    value: "",
    prefix: "school=",
  },
  {
    name: "damage",
    value: "",
    prefix: "damage_type=",
  },
];

export const InitCategoryOptions: CategoryCounts = {
  query: "",
  categories: [
    {
      name: "class",
      items: [
        {
          name: "Bard",
          count: 111,
          value: "bard",
        },
        {
          name: "Cleric",
          count: 105,
          value: "cleric",
        },
        {
          name: "Druid",
          count: 106,
          value: "druid",
        },
        {
          name: "Paladin",
          count: 31,
          value: "paladin",
        },
        {
          name: "Ranger",
          count: 37,
          value: "ranger",
        },
        {
          name: "Sorcerer",
          count: 120,
          value: "sorcerer",
        },
        {
          name: "Warlock",
          count: 64,
          value: "warlock",
        },
        {
          name: "Wizard",
          count: 204,
          value: "wizard",
        },
      ],
    },
    {
      name: "subclass",
      items: [
        {
          name: "Devotion",
          count: 9,
          value: "devotion",
        },
        {
          name: "Fiend",
          count: 10,
          value: "fiend",
        },
        {
          name: "Land",
          count: 47,
          value: "land",
        },
        {
          name: "Life",
          count: 9,
          value: "life",
        },
        {
          name: "Lore",
          count: 157,
          value: "lore",
        },
      ],
    },
    {
      name: "component",
      items: [
        {
          name: "Verbal",
          count: 26,
          value: "v",
        },
        {
          name: "Somantic",
          count: 4,
          value: "s",
        },
      ],
    },
    {
      name: "level",
      items: [
        {
          name: "0",
          count: 24,
          value: "0",
        },
        {
          name: "1",
          count: 49,
          value: "1",
        },
        {
          name: "2",
          count: 54,
          value: "2",
        },
        {
          name: "3",
          count: 42,
          value: "3",
        },
        {
          name: "4",
          count: 31,
          value: "4",
        },
        {
          name: "5",
          count: 37,
          value: "5",
        },
        {
          name: "6",
          count: 31,
          value: "6",
        },
        {
          name: "7",
          count: 20,
          value: "7",
        },
        {
          name: "8",
          count: 16,
          value: "8",
        },
        {
          name: "9",
          count: 15,
          value: "9",
        },
      ],
    },
    {
      name: "school",
      items: [
        {
          name: "Abjuration",
          count: 39,
          value: "abjuration",
        },
        {
          name: "Conjuration",
          count: 52,
          value: "conjuration",
        },
        {
          name: "Divination",
          count: 29,
          value: "divination",
        },
        {
          name: "Enchantment",
          count: 29,
          value: "enchantment",
        },
        {
          name: "Evocation",
          count: 60,
          value: "evocation",
        },
        {
          name: "Illusion",
          count: 27,
          value: "illusion",
        },
        {
          name: "Necromancy",
          count: 24,
          value: "necromancy",
        },
        {
          name: "Transmutation",
          count: 59,
          value: "transmutation",
        },
      ],
    },
    {
      name: "damage",
      items: [
        {
          name: "Acid",
          count: 2,
          value: "acid",
        },
        {
          name: "Bludgeoning",
          count: 4,
          value: "bludgeoning",
        },
        {
          name: "Cold",
          count: 4,
          value: "cold",
        },
        {
          name: "Fire",
          count: 16,
          value: "fire",
        },
        {
          name: "Force",
          count: 6,
          value: "force",
        },
        {
          name: "Lightning",
          count: 4,
          value: "lightning",
        },
        {
          name: "Piercing",
          count: 3,
          value: "piercing",
        },
        {
          name: "Poison",
          count: 2,
          value: "poison",
        },
        {
          name: "Psychic",
          count: 4,
          value: "psychic",
        },
        {
          name: "Radiant",
          count: 8,
          value: "radiant",
        },
        {
          name: "Slashing",
          count: 1,
          value: "slashing",
        },
        {
          name: "Thunder",
          count: 3,
          value: "thunder",
        },
      ],
    },
  ],
};
