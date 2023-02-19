import Image from "next/image";
import { useRef } from "react";
import Typed from "react-typed";

const TypedArea = ({ text, setSelectedLanguage, selectedLanguage, className, withCopied }) => {
  const FLAGS = [
    {
      value: "english",
      img: "/images/flags/english.webp",
    },
    {
      value: "dutch",
      img: "/images/flags/dutch.webp",
    },

    {
      value: "french",
      img: "/images/flags/french.webp",
    },
  ];
  const toast = useRef();
  const textToCopy = useRef();

  function copyToClipboard(e) {
    e.preventDefault();
    if (!text) return;
    toast.current.classList.add("opacity-100");
    toast.current.classList.remove("opacity-0");

    navigator.clipboard.writeText(text);
    setTimeout(() => {
      toast.current.classList.remove("opacity-100");
      toast.current.classList.add("opacity-0");
    }, 600);
  }
  return (
    <>
      <div
        key={text}
        className={`relative h-full w-full overflow-hidden rounded-md bg-slate-800 p-6 text-start ${className}`}
      >
        {withCopied && text && (
          <button
            onClick={(e) => {
              copyToClipboard(e);
            }}
            className=" rounded-cl absolute right-6 top-6 ml-1 flex cursor-pointer items-center justify-center rounded-xl"
          >
            <Image src="/icons/copy-to-clipboard.svg" width={25} height={25} />
            <div
              className="text-primary-100 absolute w-20 translate-y-1/2 rounded-lg bg-slate-700/60 p-2 text-xs opacity-0 transition duration-500 "
              ref={toast}
            >
              Copied to clipboard
            </div>
          </button>
        )}
        <div className="flex flex-wrap gap-4">
          {FLAGS.map((flag, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelectedLanguage(flag.value);
              }}
              className={`relative h-8 w-8 cursor-pointer overflow-hidden rounded-full hover:opacity-80 ${
                selectedLanguage === flag.value ? "" : "opacity-50"
              }`}
            >
              <Image key={index} src={flag.img} alt={flag.value} fill className="" />
            </button>
          ))}
        </div>
        <Typed strings={[text]} typeSpeed={8} backSpeed={50}>
          <p ref={textToCopy} className="mt-4 h-full min-h-[300px] w-full whitespace-pre-line bg-transparent	" />
        </Typed>
      </div>
    </>
  );
};

export default TypedArea;
