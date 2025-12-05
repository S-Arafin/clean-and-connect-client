import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <h1 className="text-primary font-extrabold text-xl">C&C</h1>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <FaXTwitter className="text-2xl" />
          </a>
          <a>
            <FaFacebook className="text-2xl" />
          </a>
          <a>
           <FaInstagram className="text-2xl" />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
