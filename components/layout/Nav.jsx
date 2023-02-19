import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hamburger from "../widgets/Hamburger";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/motion";
import Image from "next/image";
import { useStore } from "@/utils/store";
import { useRouter } from "next/router";

export const Nav = () => {
  const user = useStore((state) => state.user);
  const removeUser = useStore((state) => state.removeUser);
  const [isOpen, setIsOpen] = useState(false);
  const ulRef = useRef(null);
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);

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
          Smart Content
          {/* <img src="/logo.png" alt="logo" width={75} height={75} className="logo object-contain" /> */}
        </Link>

        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} handleCLick={() => {}} className="md:hidden" />

        <ul
          onClick={() => setIsOpen(false)}
          ref={ulRef}
          className="menu-on-mobile flex items-center gap-10 md:static  md:translate-x-0"
        >
          <li>
            {token ? (
              <button
                className="block rounded-full bg-red-400 px-8 py-2"
                onClick={() => {
                  removeUser();
                  router.push("/login");
                }}
              >
                Logout
              </button>
            ) : (
              <Link href="/login?form=login" className="block rounded-full bg-secondary-400 px-8 py-2">
                Login
              </Link>
            )}
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
