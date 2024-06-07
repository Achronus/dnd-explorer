import { CardDetailsType } from "../types/cards";

const ApiUrlRoot = "https://www.dnd5eapi.co/api";
const GitHubUrl = "https://github.com/Achronus";

const HomepageCategories: CardDetailsType[] = [
  {
    url: "/classes",
    title: "Classes",
    description: "Get your classes here!",
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/spells",
    title: "Spells",
    description: "Get your spells here!",
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/monsters",
    title: "Monsters",
    description: "Get your monsters here!",
    img: {
      href: "",
      alt: "",
    },
  },
];

export { ApiUrlRoot, HomepageCategories, GitHubUrl };
