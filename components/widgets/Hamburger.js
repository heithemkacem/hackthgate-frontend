import { useEffect, useRef } from "react";

const Hamburger = ({ className, handleCLick, isOpen, setIsOpen }) => {
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    if (isOpen) menuRef.current.classList.add("open");
    else menuRef.current.classList.remove("open");

    buttonRef?.current?.setAttribute("aria-expanded", isOpen);
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      className={`hamburger-btn ${className}`}
      aria-controls="primary-navigation"
      aria-expanded="false"
      onClick={(e) => {
        setIsOpen((prev) => !prev);
        handleCLick();
      }}
    >
      <div ref={menuRef} className="wrapper-menu">
        <div className="line-menu half start"></div>
        <div className="line-menu"></div>
        <div className="line-menu half end"></div>
      </div>

      <style jsx>
        {`
          button {
            background: transparent;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            position: relative;
            z-index: 30;
          }

          .wrapper-menu {
            width: 25px;
            height: 25px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            transition: transform 330ms ease-out;
          }

          .wrapper-menu.open {
            transform: rotate(-45deg);
          }

          .line-menu {
            background-color: #fff;
            border-radius: 5px;
            width: 100%;
            height: 5px;
          }

          .line-menu.half {
            width: 50%;
          }

          .line-menu.start {
            transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
            transform-origin: right;
          }

          .open .line-menu.start {
            transform: rotate(-90deg) translateX(3px);
          }

          .line-menu.end {
            align-self: flex-end;
            transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
            transform-origin: left;
          }

          .open .line-menu.end {
            transform: rotate(-90deg) translateX(-3px);
          }
        `}
      </style>
    </button>
  );
};

export default Hamburger;
