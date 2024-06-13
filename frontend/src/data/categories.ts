import { QueryParam, SelectOption } from "@/types/option";

export const urlSpellPrefix = "/api/spells/";

export const SpecialisationOptions: SelectOption[] = [
  {
    name: "class",
    heading: "What class?",
  },
  {
    name: "subclass",
    heading: "What sub-class?",
  },
  {
    name: "school",
    heading: "What school?",
  },
];

export const CharacteristicOptions: SelectOption[] = [
  {
    name: "level",
    heading: "What level?",
  },
  {
    name: "component",
    heading: "What component?",
  },
  {
    name: "damage",
    heading: "What damage type?",
  },
];

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
