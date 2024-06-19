import Image from "next/image";
import Link from "next/link";
import ProfilePic from "@/assets/me.jpg";
import { GitHubUrl } from "@/lib/constants";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
      <aside>
        <div className="flex gap-2 items-center">
          <span className="flex gap-1 items-center">
            Built with <Heart width={10} height={10} /> by{" "}
            <Link
              href={GitHubUrl}
              className="hover:underline"
            >
              Ryan
            </Link>
          </span>{" "}
          <Image
            src={ProfilePic}
            width={20}
            height={20}
            alt="Ryan the creator"
            className="rounded-full"
          />
        </div>
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
