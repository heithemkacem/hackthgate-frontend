import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import Lottie from "react-lottie";
import empty from "/public/lotties/empty";

const Video = ({ id, isValidUrl }) => {
  const [imageClicked, setImageClicked] = useState(false);
  // validate url also id with 11
  // "((http://)?)(www.)?((youtube.com/)|(youtu.be)|(youtube)).(com|be)/(watch)?(v=)?([a-zA-Z0-9_-]{11})"
  //
  const emptyOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {isValidUrl ? (
        <div
          className="relative h-full w-full cursor-pointer overflow-hidden rounded-md"
          onClick={() => setImageClicked(true)}
        >
          <AnimatePresence>
            {!imageClicked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                  fill
                  alt="yt thumbnail"
                  className="object-cover"
                  priority
                />
                <Image
                  width={50}
                  height={50}
                  src="http://addplaybuttontoimage.way4info.net/Images/Icons/7.png"
                  alt="play button"
                  className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {imageClicked && (
              <motion.iframe
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={imageClicked ? `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1` : ""}
                title="youtube video"
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex h-full w-full animate-pulse flex-col items-center justify-center overflow-hidden rounded-md bg-gray-400">
          <h2 className="text-2xl font-semibold text-secondary-400">I need a video url please!</h2>
          <Lottie options={emptyOptions} height={200} width={260} />
        </div>
      )}
    </>
  );
};
export default Video;
