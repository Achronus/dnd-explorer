import { CategoryCardDetailsType } from "@/types/cards";

const ApiUrlRoot = "https://www.dnd5eapi.co/api";
const GitHubUrl = "https://github.com/Achronus";

const UTListFileURL = "/api/uploadthing/list-files";

const HomepageCategories: CategoryCardDetailsType[] = [
  {
    url: "/classes",
    title: "Class",
    count: 30,
    imgName: "class-cat",
  },
  {
    url: "/subclasses",
    title: "Subclass",
    count: 10,
    imgName: "subclass-cat",
  },
  {
    url: "/attack-type",
    title: "Attack",
    count: 20,
    imgName: "attack-cat",
  },
  {
    url: "/levels",
    title: "Level",
    count: 20,
    imgName: "level-cat",
  },
  {
    url: "/schools",
    title: "School",
    count: 20,
    imgName: "school-cat",
  },
  {
    url: "/damage-type",
    title: "Damage",
    count: 20,
    imgName: "dmg-cat",
  },
];

export {
  ApiUrlRoot,
  HomepageCategories,
  GitHubUrl,
  UTListFileURL,
};
