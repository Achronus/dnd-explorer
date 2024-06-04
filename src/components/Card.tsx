import { CardDetailsType } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const Card = ({
  url,
  title,
  description,
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

export default Card;
