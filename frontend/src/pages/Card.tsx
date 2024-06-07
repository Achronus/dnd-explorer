import {
  CategoryCardDetailsType,
  CardDetailsType,
} from "@/types/cards";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({
  title,
  count,
  url,
  img,
}: CategoryCardDetailsType) => {
  return (
    <div className="card text-white rounded-3xl border border-gray-800 bg-base-200 hover:green-shadow transition-shadow px-4 items-center justify-center">
      <Link
        href={url}
        className="flex gap-2 justify-center items-center"
      >
        <div className="skeleton w-36 h-28"></div>
        {/* <figure className="float-left"> */}
        {/* <Image src={img.href} alt={img.alt} /> */}
        {/* </figure> */}
        <div className="card-body">
          <h2 className="card-title text-white text-2xl">
            {title}
          </h2>
          <p className="text-gray-500 text-lg">
            {count} Categories
          </p>
        </div>
      </Link>
    </div>
  );
};

const Card = ({
  title,
  description,
  url,
  img,
}: CardDetailsType) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <Link href={url}>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
        <figure>
          <Image src={img.href} alt={img.alt} fill />
        </figure>
      </Link>
    </div>
  );
};

export { CategoryCard, Card };
