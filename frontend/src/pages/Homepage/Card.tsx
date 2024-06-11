import { CategoryCardDetails } from "@/types/cards";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ title, count, url, img }: CategoryCardDetails) => {
  return (
    <div className="card rounded-3xl border border-gray-800 bg-base-200 hover:green-shadow transition-shadow px-4 items-center justify-center">
      <Link href={url} className="flex gap-2 justify-center items-center">
        <Image
          src={img.url}
          alt={`${img.name} category image`}
          width={200}
          height={200}
        />

        <div className="card-body">
          <h2 className="card-title text-2xl">{title}</h2>
          <p className="text-gray-400 text-lg">{count} Categories</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
