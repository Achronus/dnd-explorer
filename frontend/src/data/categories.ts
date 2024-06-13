import { QueryParam, SelectOption } from "@/types/option";

export const urlSpellPrefix = "/api/spells/";
export const urlCategoryPrefix = `${urlSpellPrefix}category`;

export const SpecialisationOptions: SelectOption[] = [
  {
    heading: "What class?",
    url: `${urlCategoryPrefix}/class`,
  },
  {
    heading: "What sub-class?",
    url: `${urlCategoryPrefix}/subclass`,
  },
  {
    heading: "What school?",
    url: `${urlCategoryPrefix}/school`,
  },
];

export const CategoryOptions: SelectOption[] = [
  {
    heading: "What level?",
    url: `${urlCategoryPrefix}/level`,
  },
  {
    heading: "Any components?",
    url: `${urlCategoryPrefix}/component`,
  },
  {
    heading: "What damage type?",
    url: `${urlCategoryPrefix}/damage`,
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
