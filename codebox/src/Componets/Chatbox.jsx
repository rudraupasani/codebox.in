import React, { useState, useRef, useEffect, Suspense } from "react";
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
import Notes from "./Notes";

// ✅ Lazy load Codeeditor
const Codeeditor = React.lazy(() => import("../pages/Codeeditor"));

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

  const [showEditor, setShowEditor] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

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
    // keep last 20-30 messages for context
    const recentMessages = [...messages, newUserMessage].slice(-1000);

    // ✅ Only send raw conversation
    const conversationPrompt = recentMessages
      .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
      .join("\n");

    const response = await fetch("http://localhost:3000/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: conversationPrompt, // 👈 no instruction here
      }),
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
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: `⚠️ ${err.message}` },
    ]);
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

  const navLinks = [
    { label: "Home", to: "/" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-2 sm:p-4">
      {/* Header / Navbar */}
      <header className="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg px-4 sm:px-6 py-3 sm:py-4 w-full max-w-9xl flex items-center justify-between border border-white/10 relative z-[100]">
        <h1 className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-white">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          Codebox AI
        </h1>

        <nav className="hidden md:flex items-center gap-6 text-gray-300">
          {navLinks.map((link, i) =>
            link.to.startsWith("/") ? (
              <Link key={i} to={link.to} className="hover:text-blue-400 transition">
                {link.label}
              </Link>
            ) : (
              <a key={i} href={link.to} className="hover:text-blue-400 transition">
                {link.label}
              </a>
            )
          )}
          <button
            onClick={() => setShowEditor(true)}
            className="p-2 rounded-full hover:bg-gray-700">
            Code Editor
          </button>

          <button
            onClick={() => setShowNotes(true)}
            className="p-2 rounded-full hover:bg-gray-700">
            Notes
          </button>
        </nav>

        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-700 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} className="text-gray-300" /> : <Menu size={24} className="text-gray-300" />}
        </button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-gray-900/95 rounded-xl shadow-lg border border-white/10 flex flex-col items-start p-4 gap-3 text-gray-300 md:hidden z-[100]">
            {navLinks.map((link, i) =>
              link.to.startsWith("/") ? (
                <Link key={i} to={link.to} className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ) : (
                <a key={i} href={link.to} className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              )
            )}
           <button
            onClick={() => setShowEditor(true)}
            className="p-2 rounded-full hover:bg-gray-700">
            Code Editor
          </button>
           <button
            onClick={() => setShowNotes(true)}
            className="p-2 rounded-full hover:bg-gray-700">
            Notes
          </button>

          </div>
        )}
      </header>

      {showEditor ? (
        <motion.div
          drag
          dragMomentum={false}
          className="fixed inset-0 z-[90] flex justify-center items-center sm:pt-10 px-2">
          <div
           className="rounded-2xl shadow-xl w-full max-w-3xl h-[60vh] overflow-auto relative">
            <button
              onClick={() => setShowEditor(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 z-10"
            >
              <X size={24} className="text-gray-300" />
            </button>
            <Suspense fallback={<div className="text-white p-4">Loading Editor...</div>}>
              <Codeeditor />
            </Suspense>
          </div>
        </motion.div>
      ) : null}

      {showNotes ? (
        <motion.div
          drag
          dragMomentum={false}
          className="fixed inset-0 z-[90] flex justify-center items-center  sm:pt-10 px-2">
          <div className="rounded-2xl shadow-xl w-full max-w-3xl h-[60vh] overflow-hidden relative">
            <button
              onClick={() => setShowNotes(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 z-10"
            >
              <X size={24} className="text-gray-300" />
            </button>
            <Suspense fallback={<div className="text-white p-4">Loading Editor...</div>}>
            <Notes />
            </Suspense>
          </div>
        </motion.div>
      ) : null}

      {/* Chatbox */}
      <div className="w-full max-w-5xl flex flex-col h-[84vh] overflow-hidden mt-4 rounded-2xl">
        <div id="chatdiv" className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col gap-1 ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl max-w-80 md:max-w-xl text-sm leading-relaxed shadow-md overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none"
                      : "bg-gray-700/50 text-gray-300 rounded-bl-none border border-white/10"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const codeContent = String(children).replace(/\n$/, "");

                        const handleCopy = () => {
                          navigator.clipboard.writeText(codeContent);
                        };

                        return !inline && match ? (
                          <div className="relative overflow-x-auto max-w-full group">
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-lg p-3 text-xs sm:text-sm shadow-inner min-w-[200px]"
                              {...props}
                            >
                              {codeContent}
                            </SyntaxHighlighter>
                            <button
                              onClick={handleCopy}
                              className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded hover:bg-gray-700 transition opacity-100 group-hover:opacity-100"
                            >
                              Copy
                            </button>
                          </div>
                        ) : (
                          <code className="bg-gray-800/60 px-1.5 py-0.5 rounded text-green-600 text-xs" {...props}>
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => <p className="mb-2 leading-relaxed text-white break-words font-semibold">{children}</p>,
                      strong: ({ children }) => <strong className="text-purple-400 text-md font-semibold">{children}</strong>,
                      a: ({ children, ...props }) => (
                        <a className="text-blue-400 underline hover:text-blue-300 break-all" target="_blank" rel="noopener noreferrer" {...props}>
                          {children}
                        </a>
                      ),
                      li: ({ children }) => <li className="list-disc ml-6 text-gray-300 font-extralight">{children}</li>,
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-red-500 ">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-orange-400">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-bold text-zinc-400">{children}</h3>,
                      iframe: ({ ...props  }) => (
                        <div className="my-4">
                          <iframe src={props.src.video} className="w-full aspect-video rounded-lg shadow-lg"  />
                        </div>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2">
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
