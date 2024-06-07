import { CategoryCardDetailsType } from "@/types/cards";

const ApiUrlRoot = "https://www.dnd5eapi.co/api";
const GitHubUrl = "https://github.com/Achronus";

const HomepageCategories: CategoryCardDetailsType[] = [
  {
    url: "/classes",
    title: "Class",
    count: 30,
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/subclasses",
    title: "Subclass",
    count: 10,
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/attack-type",
    title: "Attack",
    count: 20,
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/levels",
    title: "Level",
    count: 20,
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/schools",
    title: "School",
    count: 20,
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/damage-type",
    title: "Damage",
    count: 20,
    img: {
      href: "",
      alt: "",
    },
  },
];

export { ApiUrlRoot, HomepageCategories, GitHubUrl };
