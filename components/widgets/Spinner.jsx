import React from "react";

const Spinner = ({ color = "#fff", size = 20 }) => {
  return (
    <>
      <div
        className={`spinner-border`}
        style={{
          color,
          width: size,
          height: size,
        }}
      >
        <span className="sr-only">Loading...</span>
      </div>

      <style jsx>{`
        .spinner-border {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          vertical-align: text-bottom;
          border: 0.25em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spinner-border 0.75s linear infinite;
        }
        @keyframes spinner-border {
          to {
            transform: rotate(360deg);
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </>
  );
};

export default Spinner;
