import { useEffect, useRef } from "react";

const Hamburger = ({ className, handleCLick, isOpen, setIsOpen }) => {
  const buttonRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => {
    if (isOpen) svgRef.current.classList.add("active");
    else svgRef.current.classList.remove("active");

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
      <svg ref={svgRef} className="ham hamRotate ham1" viewBox="0 0 100 100" width="60">
        <path
          className="line top"
          d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
        />
        <path className="line middle" d="m 30,50 h 40" />
        <path
          className="line bottom"
          d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
        />
      </svg>

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

          body {
            align-items: center;
            display: flex;
            height: 100%;
            justify-content: center;
            margin: 0;
            overflow: hidden;
            position: absolute;
            width: 100%;
          }
          .ham {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            transition: transform 400ms;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .hamRotate.active {
            transform: rotate(45deg);
          }
          .hamRotate180.active {
            transform: rotate(180deg);
          }
          .line {
            fill: none;
            transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
            stroke: #fff;
            stroke-width: 5.5;
            stroke-linecap: round;
          }
          .ham1 .top {
            stroke-dasharray: 40 139;
          }
          .ham1 .bottom {
            stroke-dasharray: 40 180;
          }
          .ham1.active .top {
            stroke-dashoffset: -98px;
          }
          .ham1.active .bottom {
            stroke-dashoffset: -138px;
          }
        `}
      </style>
    </button>
  );
};

export default Hamburger;
