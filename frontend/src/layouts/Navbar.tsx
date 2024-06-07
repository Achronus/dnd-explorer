"use client";

import Image from "next/image";
import Link from "next/link";

const MenuItems = () => {
  return (
    <>
      <li>
        <Link href="/classes">Class</Link>
      </li>
      <li>
        <Link href="/subclasses">Subclass</Link>
      </li>
      <li>
        <Link href="/levels">Level</Link>
      </li>
      <li>
        <Link href="/schools">School</Link>
      </li>
      <li>
        <Link href="/attack-types">Attack Type</Link>
      </li>
      <li>
        <Link href="/damage-types">Damage Type</Link>
      </li>
    </>
  );
};

const SearchBox = () => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder="Search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 p-5 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <MenuItems />
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          <Image
            src="/logo-sm.png"
            alt="Logo"
            width={42}
            height={42}
          />
          DnD Spell Explorer
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <MenuItems />
        </ul>
      </div>
      <div className="navbar-end hidden sm:flex">
        <SearchBox />
      </div>
    </div>
  );
};

export default Navbar;
