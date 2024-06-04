import Link from "next/link";

const Card = ({ href }: { href: string }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <Link href={href}>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>
            If a dog chews shoes whose shoes does he choose?
          </p>
        </div>
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
      </Link>
    </div>
  );
};

export default Card;
