import useFetchImgs from "@/hooks/useFetchImgs";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  spellName: string;
};

const CardImage = ({ spellName }: Props) => {
  const [name, setName] = useState(spellName);
  const { imgUrls, isLoading, error } = useFetchImgs(name);

  useEffect(() => {
    if (!spellName) {
      return;
    }

    setName(spellName);
  }, [spellName]);

  return (
    <div className="flex justify-center lg:block lg:col-span-3 w-full">
      {isLoading ? (
        <div className="skeleton w-[400px] h-[650px] lg:w-[350px]"></div>
      ) : (
        <Image
          src={imgUrls[0].url}
          alt={imgUrls[0].name}
          width={400}
          height={650}
          priority={true}
        />
      )}
    </div>
  );
};

export default CardImage;
