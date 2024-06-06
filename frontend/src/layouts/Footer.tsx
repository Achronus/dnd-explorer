import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        <p className="text-xs opacity-60">
          Logo by{" "}
          <Link
            href="https://www.flaticon.com/free-icons/feather"
            className="hover:underline"
          >
            Freepik - Flaticon
          </Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
