import TypedArea from "@/components/index/TypedArea";
import ButtonTool from "@/components/widgets/ButtonTool";
import InputFloatingLabel2 from "@/components/widgets/InputFloatingLabel2";
import Modal from "@/components/widgets/Modal";
import Spinner from "@/components/widgets/Spinner";
import Video from "@/components/widgets/Video";
import { requireAuth, requireAuthRedirect } from "@/utils/auth";
import { API_URL } from "@/utils/consts";
import { useStore } from "@/utils/store";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BiSend } from "react-icons/bi";
import Typed from "react-typed";
import { MdOutlineSummarize } from "react-icons/md";
import { RiArticleLine, RiLinkedinFill } from "react-icons/ri";
import { BsImages } from "react-icons/bs";
import { BiHeading } from "react-icons/bi";
import Logo from "@/components/widgets/Logo";

export default function Home({}) {
  const user = useStore((state) => state.user);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGettingCaption, setIsGettingCaption] = useState(false);
  const [videoText, setVideoText] = useState("");
  const [chatgptAnswer, setChatgptAnswer] = useState("");
  const [selectedLanguage1, setSelectedLanguage1] = useState("english");
  const [selectedLanguage2, setSelectedLanguage2] = useState("english");
  const [thumbnailTitle, setThumbnailTitle] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");

  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [ocrText, setOcrText] = useState("");
  const [ocrImage, setOcrImage] = useState("");

  const [tiktokVideos, setTiktokVideos] = useState([]);

  requireAuthRedirect({ isOnlyUser: true, setIsLoading });
  const validUrl = new RegExp("((http://)?)(www.)?((youtube.com/)|(youtu.be)|(youtube)).(com|be)/(watch)?(v=)?(\\S+)");

  const handleCHange = (e) => {
    setVideoUrl(e.target.value);
    const id = e.target.value.split("v=")[1];
    setVideoId(id || "");
  };

  const TOOL_BUTTONS = [
    {
      text: "Summarize This Text",
      Icon: MdOutlineSummarize,
      onClick: async () => {
        await askGpt("Summarize this text", setChatgptAnswer);
      },
    },

    {
      text: "Transform To Blog",
      Icon: RiArticleLine,
      onClick: async () => {
        await askGpt("Transform this text into blog", setChatgptAnswer);
      },
    },
    {
      text: "Transform To Linkedin Post",
      Icon: RiLinkedinFill,
      onClick: async () => {
        await askGpt("Transform this to Linkedin post", setChatgptAnswer);
      },
    },
    {
      text: "Get A Thumbnail",
      Icon: BsImages,
      onClick: async () => {
        await getThumbnail();
      },
    },

    {
      text: "Give Me Title ideas",
      Icon: BiHeading,
      onClick: async () => {
        await askGpt("Give me title ideas for a video", setChatgptAnswer);
      },
    },
    {
      text: "Transform Image To Text",
      Icon: RiArticleLine,
      onClick: async () => {
        setIsOcrModalOpen(true);
      },
    },
  ];

  const getYoutubeCaption = async (videoId) => {
    setIsGettingCaption(true);
    setVideoText("Getting Your Caption... It will take time please wait...");
    try {
      const res = await axios.post(
        `${API_URL}/client/caption`,
        {
          videoID: videoId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.status === "Success") {
        console.log(res.data);
        setVideoText(res.data.videoText.slice(0, 200));
        console.log("text", res.data.videoText);
        console.log("text sliced", res.data.videoText.slice(0, 200));
      } else {
        console.log(res);
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
    setIsGettingCaption(false);
  };

  const askGpt = async (prompt, setAnswer) => {
    try {
      const res = await axios.post(
        `${API_URL}/client/ask-chatgpt`,
        {
          prompt: `${prompt} in ${selectedLanguage2}: ${videoText}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.status === "Success") {
        console.log(res.data);
        setAnswer(res.data.response);
      } else {
        console.log(res);
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getThumbnail = async () => {
    setIsGettingCaption(true);
    if (!thumbnailTitle) {
      await askGpt("Make a title for a youtube video", setThumbnailTitle);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    try {
      const res = await axios.post(
        `${API_URL}/client/get-ai-image`,
        {
          prompt: `${thumbnailTitle}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.status === "Success") {
        console.log(res.data);
        setThumbnailImage(res.data.imageURL);
      } else {
        console.log(res);
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
    setIsGettingCaption(false);
  };

  let initialRender = true;

  useEffect(() => {
    if (!videoText) return;

    translate(selectedLanguage1, setVideoText);
  }, [selectedLanguage1]);
  useEffect(() => {
    if (!chatgptAnswer) return;

    translate(selectedLanguage2, setChatgptAnswer);
  }, [selectedLanguage2]);

  const translate = async (lang, setText) => {
    try {
      const res = await axios.post(
        `${API_URL}/client/ask-chatgpt`,
        {
          prompt: `translate this text to ${lang}: ${videoText}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.status === "Success") {
        console.log(res.data);
        setText(res.data.response);
      } else {
        console.log(res);
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getOcrText = async () => {
    setIsGettingCaption(true);
    try {
      const res = await axios.post(
        `${API_URL}/client/ocr`,
        {
          imageURL: ocrImage,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.status === "Success") {
        const regex = /image_string: (.+)/;
        const match = regex.exec(res.data.data);

        if (match && match[1]) {
          const result = match[1];
          setOcrText(result);
        }
      } else {
        console.log(res);
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
    setIsGettingCaption(false);
  };
  // useEffect(() => {
  //   getTiktokVideos();
  // }, []);

  const getTiktokVideos = async () => {
    setIsGettingCaption(true);
    try {
      const res = await axios(`${API_URL}/client/trending`);
      if (res.data.status === "Success") {
        console.log(res.data);
        setTiktokVideos(res.data.videos);
      } else {
        console.log(res);
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function isDisabled() {
  //   return !videoText || videoText == "Getting Your Caption... It will take time please wait...";
  // }

  return (
    <section className="my-container flex flex-col items-center justify-center text-center">
      <AnimatePresence>
        {thumbnailImage && (
          <Modal className="title" setIsOpen={() => setThumbnailImage("")}>
            <Image src={thumbnailImage} alt="thumbnail" width={500} height={300} />
            <div className="relative mt-2  h-full w-full rounded-full ">
              <input
                type="text"
                value={thumbnailTitle}
                onChange={(e) => setThumbnailTitle(e.target.value)}
                className="h-full w-full rounded-md border border-secondary-400 bg-transparent p-2 pr-20 text-center text-xl text-primary-dark-400"
              />{" "}
              <button
                disabled={isGettingCaption}
                type="button"
                className="bg-primary-400 absolute right-0 top-0 flex h-full w-16 cursor-pointer items-center justify-center rounded-r-md bg-secondary-400 text-white"
                onClick={() => {
                  getThumbnail();
                }}
              >
                {isGettingCaption ? <Spinner /> : <BiSend />}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOcrModalOpen && (
          <Modal className="title" setIsOpen={() => setIsOcrModalOpen("")}>
            <p className="mt-4 h-[300px] w-[400px] whitespace-pre-line rounded-md bg-slate-700  p-8 text-center	">
              {ocrText}
            </p>
            <div className="relative mt-2  h-full w-full rounded-full ">
              <input
                type="text"
                value={ocrImage}
                onChange={(e) => setOcrImage(e.target.value)}
                className="h-full w-full rounded-md border  border-secondary-400 bg-transparent p-2 pr-20 text-center text-primary-dark-400"
              />
              <button
                disabled={isGettingCaption}
                type="button"
                className="bg-primary-400 absolute right-0 top-0 flex h-full w-16 cursor-pointer items-center justify-center rounded-r-md bg-secondary-400 text-white"
                onClick={() => {
                  getOcrText();
                }}
              >
                {isGettingCaption ? <Spinner /> : <BiSend />}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      {isLoading ? (
        <>
          <Logo className="mb-10" />
          <Spinner color="var(--primary-400)" />
        </>
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mb-10 text-3xl font-semibold"
          >
            Get More Done In Less Time!
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: 0.2 }}
            className="flex h-80 w-full shadow-xl"
          >
            <Video url={videoUrl} isValidUrl={validUrl?.test?.(videoUrl) && videoId.length === 11} id={videoId} />
            {/* <div key={videoText} className="h-full w-full overflow-hidden bg-slate-800 p-6 text-start">
              <Typed strings={[videoText]} typeSpeed={80} backSpeed={50}>
                <p className="h-full w-full bg-transparent" />
              </Typed>
            </div> */}
            <TypedArea
              withCopied={true}
              text={videoText}
              selectedLanguage={selectedLanguage1}
              setSelectedLanguage={setSelectedLanguage1}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex w-full flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.6 }}
              className="relative w-full  rounded-full"
            >
              <InputFloatingLabel2
                name="url"
                label="Video URL"
                type="text"
                handleChange={handleCHange}
                error={videoUrl && (!validUrl?.test?.(videoUrl) || videoId.length !== 11)}
              />
              <button
                type="button"
                className="bg-primary-400 absolute right-0 top-0 flex h-full w-16 cursor-pointer items-center justify-center rounded-r-full bg-secondary-400 text-white"
                onClick={() => {
                  getYoutubeCaption(videoId);
                }}
                disabled={isLoading || !(videoUrl && validUrl?.test?.(videoUrl) && videoId.length === 11)}
              >
                {isGettingCaption ? <Spinner /> : <BiSend />}
              </button>
            </motion.div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {TOOL_BUTTONS.map((tool, index) => (
                <ButtonTool
                  index={index}
                  key={index}
                  text={tool.text}
                  Icon={tool.Icon}
                  onClick={tool.onClick}
                  disabled={!videoText || videoText == "Getting Your Caption... It will take time please wait..."}
                />
              ))}
            </div>
            <TypedArea
              text={chatgptAnswer}
              selectedLanguage={selectedLanguage2}
              setSelectedLanguage={setSelectedLanguage2}
              className="mt-8"
            />
          </motion.div>
          <style jsx>{`
            .typed-cursor {
              opacity: 0 !important;
            }
          `}</style>
        </>
      )}
    </section>
  );
}
