import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hamburger from "../widgets/Hamburger";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/motion";
import Image from "next/image";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ulRef = useRef(null);

  const closeNavOnResize = () => {
    if (window.innerWidth >= 767) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", closeNavOnResize);
    return () => {
      window.removeEventListener("resize", closeNavOnResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.querySelector("html").classList.add("overflow-hidden");
      ulRef.current.classList.add("active");
    } else {
      document.querySelector("html").classList.remove("overflow-hidden");
      ulRef.current.classList.remove("active");
    }
  }, [isOpen]);

  return (
    <header>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className="my-container f-ai-c relative z-20 justify-between py-8"
      >
        <div className="gradient-01 absolute inset-0 -z-10 w-[50%]" />
        <Link href="/" className="text-2xl font-semibold md:text-3xl">
          Yassine Zaanouni
          {/* <img src="/logo.png" alt="logo" width={75} height={75} className="logo object-contain" /> */}
        </Link>

        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} handleCLick={() => {}} className="md:hidden" />

        <ul
          onClick={() => setIsOpen(false)}
          ref={ulRef}
          className="menu-on-mobile flex gap-10 md:static  md:translate-x-0"
        >
          <li className="">
            <Link href="#">About.</Link>
          </li>
          <li className="">
            <Link href="#">Work.</Link>
          </li>
          <li className="">
            <Link href="#" className="cta">
              Contact
            </Link>
          </li>
        </ul>

        <style jsx>{`
          .logo {
            mix-blend-mode: multiply;
          }
          @media (max-width: 767px) {
            .menu-on-mobile {
              @apply fixed inset-0 translate-x-full flex-col items-center justify-center bg-bg-dark/60  text-center text-2xl font-medium backdrop-blur-md transition-transform duration-300;
            }
            .active {
              @apply translate-x-0;
            }
          }
        `}</style>
      </motion.nav>
    </header>
  );
};
