import { SelectOption } from "@/types/option";

export const urlPrefix = "/api/spells/category";

export const SpecialisationOptions: SelectOption[] = [
  {
    heading: "What class?",
    url: `${urlPrefix}/class`,
  },
  {
    heading: "What sub-class?",
    url: `${urlPrefix}/subclass`,
  },
  {
    heading: "What school?",
    url: `${urlPrefix}/school`,
  },
];

export const CategoryOptions: SelectOption[] = [
  {
    heading: "What level?",
    url: `${urlPrefix}/level`,
  },
  {
    heading: "Any components?",
    url: `${urlPrefix}/component`,
  },
  {
    heading: "What damage type?",
    url: `${urlPrefix}/damage`,
  },
];
