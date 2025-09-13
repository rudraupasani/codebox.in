import React, { useState } from "react";
import { Code2, Globe, Terminal, X } from "lucide-react";
import ReactEditor from "../Componets/ReactEditor";
import HtmlEditor from "../Componets/HtmlEditor";
import PythonEditor from "../Componets/NextEditor"; // ✅ new
import { motion, AnimatePresence } from "framer-motion";

const Codeeditor = () => {
  const [selectedEditor, setSelectedEditor] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
      {/* Editor Views */}
      <AnimatePresence>
        {selectedEditor === "react" && (
          <motion.div
            key="react"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-full sm:max-w-4xl lg:max-w-6xl p-2 sm:p-4"
          >
            <ReactEditor />
          </motion.div>
        )}

        {selectedEditor === "html" && (
          <motion.div
            key="html"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-full sm:max-w-4xl lg:max-w-6xl p-2 sm:p-4"
          >
            <HtmlEditor />
          </motion.div>
        )}

        {selectedEditor === "NextJS" && (
          <motion.div
            key="nextjs"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-full sm:max-w-4xl lg:max-w-6xl p-2 sm:p-4"
          >
            <PythonEditor />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Card */}
      {!selectedEditor && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute z-20 rounded-2xl shadow-2xl border border-white/20
                     p-6 sm:p-8 w-72 sm:w-96 text-center flex flex-col 
                     items-center gap-5 sm:gap-8 bg-white/10 backdrop-blur-xl -mt-70"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
            🚀 Codebox Editor
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Choose your editor mode to start coding
          </p>

          <div className="flex flex-col gap-2 sm:gap-2 w-60">
            <button
              onClick={() => setSelectedEditor("react")}
              className="flex items-center justify-center gap-2 py-3 
                         rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
                         text-white font-semibold shadow-lg shadow-blue-500/30
                         hover:scale-105 hover:shadow-blue-400/40 
                         transition text-base"
            >
              <Code2 size={18} /> ReactJS
            </button>

            <button
              onClick={() => setSelectedEditor("html")}
              className="flex items-center justify-center gap-2 py-3 
                         rounded-xl bg-gradient-to-r from-pink-500 to-red-500 
                         text-white font-semibold shadow-lg shadow-pink-500/30
                         hover:scale-105 hover:shadow-pink-400/40
                         transition text-base"
            >
              <Globe size={18} /> HTML Editor
            </button>

            <button
              onClick={() => setSelectedEditor("NextJS")}
              className="flex items-center justify-center gap-2 py-3 
                         rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 
                         text-white font-semibold shadow-lg shadow-green-500/30
                         hover:scale-105 hover:shadow-green-400/40
                         transition text-base"
            >
              <Terminal size={18} /> Next jS Editor
            </button>
          </div>
          
        </motion.div>
      )}

      {/* Close Button */}
      {selectedEditor && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedEditor(null)}
          className="absolute top-4 right-4 
                     z-30 bg-red-500 hover:bg-red-600 text-white 
                     p-2 rounded-full shadow-lg shadow-red-500/40
                     transition"
        >
          <X size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default Codeeditor;
