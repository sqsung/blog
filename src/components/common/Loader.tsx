"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <motion.div
        className="border-t-background-secondary h-10 w-10 rounded-full border-4 border-violet-500"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
