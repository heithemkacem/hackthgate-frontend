import { useEffect, useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputFloatingLabel = ({ As = "input", label, name = "", type = "text", handleChange, style = {}, id }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const labelRef = useRef(null);

  const onChange = (e) => {
    if (e.target.value) setIsFocused(true);
    else setIsFocused(false);
    handleChange(e);
  };
  useEffect(() => {
    if (isFocused) labelRef.current.classList.add("focused");
    else labelRef.current.classList.remove("focused");
  }, [isFocused]);

  return (
    <div className={`input-container`} style={style}>
      <BiUser className="absolute bottom-[0.8rem] left-0 -translate-y-1/2 transform text-lg" />
      <As
        onChange={onChange}
        name={name}
        type={isPasswordShown ? "text" : type}
        id={id}
        className="peer bg-transparent"
      />
      <label ref={labelRef} htmlFor={id}>
        {label}
      </label>
      {type === "password" && (
        <button
          type="button"
          className="absolute right-0 bottom-[0.6rem] -translate-y-1/2 transform text-lg transition-all hover:opacity-80"
          onClick={() => setIsPasswordShown(!isPasswordShown)}
        >
          {isPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      )}
      <style jsx>
        {`
          .input-container {
            position: relative;
            width: 100%;
            height: ${As == "textarea" ? "100%" : "unset"};
          }
          input,
          textarea {
            padding: 0.4rem 1.75rem;
            border-bottom: 1px solid #a0a0a0;
            outline: none;
            color: #fff;
            font-size: 1.15rem;
            font-weight: 500;
            width: 100%;
            padding-block: 1.5rem 0.75rem;
            transition: all 0.2s ease-out;
          }
          textarea {
            resize: none;
            width: 100%;
            height: 100%;
            min-height: 8rem;
          }

          label {
            position: absolute;
            left: 1.5rem;
            bottom: ${As == "textarea" ? "1.5rem" : "0.4rem"};
            transform: translateY(-50%);
            transition: all 0.15s ease-in-out;
            pointer-events: none;
          }

          input:active,
          textarea:active,
          input:focus,
          textarea:focus {
            border-bottom: 1px solid var(--primary-400);
            box-shadow: 0 4px 2px -2px rgb(0 146 122 / 25%);
          }
          .focused,
          input:focus + label,
          textarea:focus + label {
            bottom: 1.75rem;
            color: #767683;
            font-size: 80%;
          }
        `}
      </style>
    </div>
  );
};

export default InputFloatingLabel;
