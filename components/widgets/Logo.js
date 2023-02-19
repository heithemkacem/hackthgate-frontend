import Link from "next/link";
import React from "react";

const Logo = ({ className }) => {
  return (
    <Link href="/" className={`text-2xl font-semibold md:text-3xl ${className}`}>
      Smart Content
      {/* <img src="/logo.png" alt="logo" width={75} height={75} className="logo object-contain" /> */}
    </Link>
  );
};

export default Logo;
