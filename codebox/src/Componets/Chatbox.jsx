import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Bot,
  User,
  BrainCircuit,
  Sun,
  Play,
  Square,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I’m Codebox AI. How can I help you today?" },
  ]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const newUserMessage = { sender: "user", text };
    setMessages((prev) => [...prev, newUserMessage]);
    setText("");
    setLoading(true);

    try {
      const recentMessages = [...messages, newUserMessage].slice(-1000);
      const conversationPrompt =
        recentMessages
          .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
          .join("\n") + `\nUser: ${text}\nBot:`;

      const response = await fetch("https://codebox-d3m9.onrender.com/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: conversationPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "⚠️ You’ve hit the request limit. Please wait a moment before trying again.",
            },
          ]);
        } else {
          throw new Error(data.error || "Server error");
        }
        return;
      }

      const botText = data.response || "🤖 Sorry, I didn't understand that.";
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: `⚠️ ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = (text, idx) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeakingIndex(null);
    setSpeakingIndex(idx);
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeakingIndex(null);
  };

  // ✅ Navbar Links
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Code Reviewer", to: "/reviewer" },
    { label: "Lumex AI", to: "/lumex" },
    { label: "Features", to: "#features" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-2 sm:p-4">
      {/* Header / Navbar */}
    {/* Header / Navbar */}
<header className="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg px-4 sm:px-6 py-3 sm:py-4 w-full max-w-5xl flex items-center justify-between border border-white/10 relative z-[100]">
  {/* Logo */}
  <h1 className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-white">
    <BrainCircuit className="w-6 h-6 text-blue-400" />
    Codebox AI
  </h1>

  {/* Desktop Nav */}
  <nav className="hidden md:flex items-center gap-6 text-gray-300">
    {navLinks.map((link, i) =>
      link.to.startsWith("/") ? (
        <Link
          key={i}
          to={link.to}
          className="hover:text-blue-400 transition"
        >
          {link.label}
        </Link>
      ) : (
        <a
          key={i}
          href={link.to}
          className="hover:text-blue-400 transition"
        >
          {link.label}
        </a>
      )
    )}
    <button className="p-2 rounded-full hover:bg-gray-700">
      <Sun className="w-5 h-5 text-yellow-400" />
      <span className="sr-only">Toggle theme</span>
    </button>
  </nav>

  {/* Mobile Menu Button */}
  <button
    className="md:hidden p-2 rounded-md hover:bg-gray-700 transition"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? (
      <X size={24} className="text-gray-300" />
    ) : (
      <Menu size={24} className="text-gray-300" />
    )}
  </button>

  {/* ✅ Mobile Nav with higher z-index */}
  {menuOpen && (
    <div className="absolute top-full left-0 w-full mt-2 bg-gray-900/95 rounded-xl shadow-lg border border-white/10 flex flex-col items-start p-4 gap-3 text-gray-300 md:hidden z-[100]">
      {navLinks.map((link, i) =>
        link.to.startsWith("/") ? (
          <Link
            key={i}
            to={link.to}
            className="hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ) : (
          <a
            key={i}
            href={link.to}
            className="hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        )
      )}
      <button className="p-2 rounded-full hover:bg-gray-700 mt-2">
        <Sun className="w-5 h-5 text-yellow-400" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  )}
</header>

      {/* Chatbox */}
      <div className="w-full max-w-5xl flex flex-col h-[84vh] overflow-hidden mt-4  rounded-2xl  ">
        {/* Messages */}
        <div id="chatdiv" className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col gap-1 ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl max-w-[85%] sm:max-w-xl text-sm leading-relaxed shadow-md overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none"
                      : "bg-gray-700/50 text-gray-100 rounded-bl-none border border-white/10"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <div className="overflow-x-auto max-w-full">
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-lg p-3 text-xs sm:text-sm shadow-inner min-w-[200px]"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code
                            className="bg-gray-800/60 px-1.5 py-0.5 rounded text-green-600 text-xs"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => (
                        <p className="mb-2 leading-relaxed text-white break-words">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-purple-500 text-md">{children}</strong>
                      ),
                      a: ({ children, ...props }) => (
                        <a
                          className="text-blue-400 underline hover:text-blue-300 break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {children}
                        </a>
                      ),
                      li: ({ children }) => (
                        <li className="list-disc ml-6 text-gray-300">
                          {children}
                        </li>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-gray-100">
                          {children}
                        </h1>
                      ),  
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                    <User size={16} />
                  </div>
                )}
              </div>

              {msg.sender === "bot" && (
                <div className="flex gap-2 mt-1 ml-10">
                  {speakingIndex === idx ? (
                    <button
                      onClick={handleStop}
                      className="flex items-center gap-1 px-2 py-1 bg-red-500/80 hover:bg-red-500 text-white text-xs rounded-md"
                    >
                      <Square size={14} /> Stop
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRead(msg.text, idx)}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-500/80 hover:bg-blue-500 text-white text-xs rounded-md"
                    >
                      <Play size={14} /> Read AI
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white animate-pulse">
                <Bot size={16} />
              </div>
              <div className="px-3 py-2 rounded-2xl max-w-[60%] text-sm bg-white/10 text-white rounded-bl-none flex gap-1">
                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-300" />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 sm:p-3 border-t border-white/10 flex items-center gap-2 bg-black/40 backdrop-blur-xl rounded-2xl shadow-inner">
          <textarea
            placeholder="Message Codebox AI..."
            value={text}
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
            }
            rows={1}
            className="flex-1 resize-none bg-white/10 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl outline-none border border-white/10 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-md text-sm sm:text-base"
          ></textarea>
          <button
            onClick={handleSend}
            disabled={loading}
            className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white shadow-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
