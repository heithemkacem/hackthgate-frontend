import { memo, useEffect, useRef, useState } from "react";

const InputFloatingLabel2 = ({
  As = "input",
  label,
  name = "",
  type = "text",
  handleChange,
  style = {},
  id,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(true);
  const labelRef = useRef(null);

  const onChange = (e) => {
    if (e.target.value) setIsFocused(true);
    else setIsFocused(false);
    handleChange(e);
  };
  useEffect(() => {
    if (isFocused) labelRef.current.classList.add("focused");
    // else labelRef.current.classList.remove("focused");
  }, [isFocused]);

  return (
    <div className={`input-container`} style={style}>
      <As onChange={onChange} name={name} type={type} id={id} className="peer rounded-full bg-transparent" />
      <label ref={labelRef} htmlFor={id}>
        {label}
      </label>
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
            border: 1px solid #a0a0a0;
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
            left: 1.75rem;
            top: ${As == "textarea" ? "1.5rem" : "50%"};
            transform: translateY(-50%);
            transition: all 0.15s ease-in-out;
            pointer-events: none;
          }

          input:active,
          textarea:active,
          input:focus,
          textarea:focus {
            border: 1px solid var(--secondary-400);
            box-shadow: ${error ? "0 0 0 2px #ff0000" : "0 0 0 0.25rem rgb(0 148 123 / 25%)"};
          }
          .focused,
          input:focus + label,
          textarea:focus + label {
            top: 1rem;
            color: #767683;
            font-size: 80%;
          }
        `}
      </style>
    </div>
  );
};

export default memo(InputFloatingLabel2);
