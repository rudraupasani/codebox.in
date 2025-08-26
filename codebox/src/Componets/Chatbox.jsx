import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, BrainCircuit, Sun } from "lucide-react";
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
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Scroll to bottom when messages change
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
      const recentMessages = [...messages, newUserMessage].slice(-30);
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
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `⚠️ ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/chat", label: "Chat" },
    { path: "/docs", label: "Docs" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-4">
      {/* Header */}
      <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg px-6 py-4 w-full max-w-5xl flex items-center justify-between border border-white/10">
        {/* Logo */}
        <h1 className="flex items-center gap-2 text-lg md:text-2xl font-bold text-white">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          Codebox AI
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition ${
                location.pathname === link.path
                  ? "text-blue-400 font-semibold"
                  : "hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-700">
            <Sun className="w-5 h-5 text-yellow-400" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>

      {/* Chatbox */}
      <div className="w-full max-w-5xl flex flex-col h-[80vh] md:h-[84vh] overflow-hidden mt-4 bg-gray-800/30 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                  <Bot size={18} />
                </div>
              )}

              <div
                className={`px-4 py-3 rounded-2xl max-w-xl text-sm leading-relaxed shadow-md ${
                  msg.sender === "user"
                    ?" text-white rounded-br-none"
                    : " text-gray-100 rounded-bl-none border border-white/10"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg p-3 text-sm shadow-inner"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800/60 px-1.5 py-0.5 rounded text-blue-300 text-xs"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-blue-300 mb-2">
                        {children}
                      </h1>
                    ),
                    p: ({ children }) => (
                      <p className="mb-2 leading-relaxed text-gray-200">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-blue-400">{children}</strong>
                    ),
                    a: ({ children, ...props }) => (
                      <a
                        className="text-blue-400 underline hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      >
                        {children}
                      </a>
                    ),
                    li: ({ children }) => (
                      <li className="list-disc ml-6 text-gray-300">{children}</li>
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>

              {msg.sender === "user" && (
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                  <User size={18} />
                </div>
              )}
            </motion.div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white animate-pulse">
                <Bot size={18} />
              </div>
              <div className="px-4 py-2 rounded-2xl max-w-xs text-sm bg-white/10 text-white rounded-bl-none flex gap-1">
                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-300" />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 border-t border-white/10 flex items-center gap-1 bg-black/40 backdrop-blur-xl rounded-2xl shadow-inner">
          <textarea
            placeholder="Message Codebox AI..."
            value={text}
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
            }
            rows={1}
            className="flex-1 resize-y bg-white/10 text-white px-4 py-3 rounded-xl outline-none border border-white/10 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-md"
          ></textarea>
          <button
            onClick={handleSend}
            disabled={loading}
            className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white shadow-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
