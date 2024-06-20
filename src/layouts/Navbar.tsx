import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 p-5 z-10">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          <Image src="/logo-sm.png" alt="Logo" width={42} height={42} />
          DnD Spell Explorer
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
