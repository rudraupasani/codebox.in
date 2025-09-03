import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chatbox" },
    { name: "Features", path: "#features" },
    { name: "About", path: "#about" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                   bg-white/10 backdrop-blur-xl border border-white/20 
                   rounded-full shadow-lg px-6 py-3 flex items-center justify-between w-[90%] md:w-auto"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center cursor-pointer mr-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px rgba(59,130,246,0.6)",
                "0 0 20px rgba(147,51,234,0.7)",
                "0 0 10px rgba(59,130,246,0.6)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                       rounded-full flex items-center justify-center relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-30"
            />
            <Bot size={18} className="text-white relative z-10" />
          </motion.div>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-2 font-medium text-sm">
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {link.path === "/chatbox" ? (
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/chatbox");
                  }}
                  className="px-3 py-1.5 rounded-full 
                             text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 
                             hover:text-white transition-all"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  href={link.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className="px-3 py-1.5 rounded-full
                             text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 
                             hover:text-white transition-all"
                >
                  {link.name}
                </a>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden ml-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[90%] 
                       bg-white/10 backdrop-blur-xl border border-white/20 
                       rounded-2xl shadow-lg px-6 py-4 z-40"
          >
            <ul className="flex flex-col space-y-3 text-white font-medium text-base">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.path === "/chatbox" ? (
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate("/chatbox");
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.path}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setIsOpen(false);
                      }}
                      className="block px-3 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
