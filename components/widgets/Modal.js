import { motion } from "framer-motion";
const Modal = ({ children, className, setIsOpen }) => {
  return (
    <div className="  modalContainer f-ai-c fixed inset-0 z-20 justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 -z-10 bg-[#000]/40"
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        key="modal"
        exit={{ opacity: 0, scale: 0.8 }}
        className={`modal -mt-[calc(20vh+2.5rem)] min-h-[12rem] min-w-[20rem] rounded-xl bg-white  p-6 shadow-xl ${className}`}
      >
        {children && children}
      </motion.div>
    </div>
  );
};

export default Modal;
