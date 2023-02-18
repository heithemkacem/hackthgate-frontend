import { useRef } from "react";

const InputFloatingLabel = ({ As = "input", label, name = "", type = "text", handleChange, style = {}, id }) => {
  const labelRef = useRef(null);

  const onChange = (e) => {
    if (e.target.value) labelRef.current.classList.add("focused");
    else labelRef.current.classList.remove("focused");
    handleChange(e);
  };
  return (
    <div className={`input-container`} style={style}>
      <As onChange={onChange} name={name} type={type} id={id} className="peer tw-bg-transparent" />
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
            padding: 0.6rem 0.4rem;
            border: 1px solid #a0a0a0;
            outline: none;
            border-radius: 0.4em;
            color: #1c1c1c;
            font-size: 1.15rem;
            font-weight: 500;
            width: 100%;
            padding-block: 1.5rem 0.75rem;
            padding-inline: 1rem;
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
            left: 1rem;
            top: ${As == "textarea" ? "1.5rem" : "50%"};
            transform: translateY(-50%);
            transition: all 0.15s ease-in-out;
            pointer-events: none;
          }

          input:active,
          textarea:active,
          input:focus,
          textarea:focus {
            border: 1px solid var(--primary-400);
            box-shadow: 0 0 0 0.25rem rgb(84 99 255 / 25%);
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

export default InputFloatingLabel;
