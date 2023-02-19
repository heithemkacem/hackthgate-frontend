import LoginForm from "@/components/login/LoginForm";
import OtpForm from "@/components/login/OtpForm";
import RegisterForm from "@/components/login/RegisterForm";
import CardSwiper from "@/components/widgets/CardSwiper";
import InputFloatingLabel from "@/components/widgets/InputFloatingLabel";
import Logo from "@/components/widgets/Logo";
import { useStore } from "@/utils/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const login = ({ query }) => {
  const user = useStore((state) => state.user);
  const router = useRouter();

  const [loginState, setLoginState] = useState(query || "login");
  useEffect(() => {
    setLoginState(query);
  }, [query]);

  const LOGIN_CARDS = [
    {
      title: "Leverage our AI",
      desc: "Leverage our AI to find the best deals for you. We will find the best deals for you and send you a notification. when",
      img: "/images/login/card-1.webp",
    },
    {
      title: "Leverage our AI",
      desc: "Leverage our AI to find the best deals for you. We will find the best deals for you and send you a notification. when",
      img: "/images/login/card-2.webp",
    },
    {
      title: "Leverage our AI",
      desc: "Leverage our AI to find the best deals for you. We will find the best deals for you and send you a notification. when",
      img: "/images/login/card-3.webp",
    },
    {
      title: "Leverage our AI",
      desc: "Leverage our AI to find the best deals for you. We will find the best deals for you and send you a notification. when",
      img: "/images/login/card-4.webp",
    },
    {
      title: "Leverage our AI",
      desc: "Leverage our AI to find the best deals for you. We will find the best deals for you and send you a notification. when",
      img: "/images/login/card-5.webp",
    },
    {
      title: "Leverage our AI",
      desc: "Leverage our AI to find the best deals for you. We will find the best deals for you and send you a notification. when",
      img: "/images/login/card-6.webp",
    },
  ];

  if (user.token) router.push("/");

  return (
    <section
      className="my-container grid text-center lg:mt-20"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {/* Card */}
      <div className="relative isolate overflow-hidden rounded-md bg-[#1f2c3b] p-8 shadow-xl lg:p-10">
        <CardSwiper data={LOGIN_CARDS.slice(0, 3)} delay={3000} />
      </div>
      {/* form */}
      <div className="relative isolate  max-w-md overflow-hidden rounded-md bg-[#1f2c3b] p-8 shadow-2xl lg:-translate-y-14 lg:p-10">
        <Image
          alt=""
          src="/images/login/overlay-card.webp"
          fill
          className="-z-10 scale-[3] opacity-10 mix-blend-overlay"
        />
        <Logo />
        <AnimatePresence>
          {loginState == "login" ? (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <LoginForm />
            </motion.div>
          ) : loginState == "register" ? (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <RegisterForm />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <OtpForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card */}
      <div className="relative isolate max-w-md overflow-hidden rounded-md bg-[#1f2c3b] p-8 shadow-xl lg:p-10">
        <CardSwiper data={LOGIN_CARDS.slice(3, 6)} delay={3250} />
      </div>
    </section>
  );
};

export default login;

export async function getServerSideProps(context) {
  const { query } = context;

  return {
    props: {
      query: query?.form || "login",
    },
  };
}
