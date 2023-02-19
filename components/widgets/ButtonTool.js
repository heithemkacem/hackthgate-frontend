import React, { useState } from "react";
import Spinner from "./Spinner";
import { motion } from "framer-motion";
const ButtonTool = ({ text, Icon, disabled, onClick, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
      disabled={disabled || isLoading}
      type="button"
      className="btn-tool group relative flex items-center justify-center rounded-md"
      onClick={async () => {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
      }}
    >
      {isLoading ? (
        <Spinner color="white" />
      ) : (
        <div className="absolute inset-[3px] flex items-center justify-center  rounded-sm bg-primary-dark-400 p-4 transition-all duration-1000 hover:bg-transparent">
          <div className="flex h-full flex-col items-center justify-between gap-2">
            {Icon && <Icon className=" h-9 w-9" />}
            {text}
          </div>
        </div>
      )}
      <style>
        {`
         
         .btn-tool {
          background-image: linear-gradient(to right, #02AAB0 0%, #00CDAC  51%, #02AAB0  100%);
          margin: 10px;
          padding: 1rem;
          min-height: 50px;
          text-align: center;
          transition: 0.5s;
          background-size: 200% auto;
          color: white;            
          box-shadow: 0 0 20px rgba(238, 238, 238, 0.3);
          display: block;
          width: 10rem;
          height: 8rem;
        }

        .btn-tool:hover:enabled {
          background-position: right center; /* change the direction of the change here */
          color: #fff;
          text-decoration: none;
        }
       
    
       
        `}
      </style>
    </motion.button>
  );
};

export default ButtonTool;
