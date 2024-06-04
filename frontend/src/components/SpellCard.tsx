import { SpellCardInfo } from "@/types/cards";
import Image from "next/image";
import Link from "next/link";

const SpellCard = ({ name, desc, level, url, img }: SpellCardInfo) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <Link href={url}>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{desc.join("\n")}</p>
        </div>
        <figure>{img && <Image src={img.href} alt={img.alt} fill />}</figure>
      </Link>
    </div>
  );
};

export default SpellCard;
