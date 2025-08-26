import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I’m Codebox AI. How can I help you today?" },
  ]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
      // Only take the last 30 messages for context
      const recentMessages = [...messages, newUserMessage].slice(-30);

      const conversationPrompt =
        recentMessages
          .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
          .join("\n") + `\nUser: ${text}\nBot:`;

      const response = await fetch(
        "https://codebox-d3m9.onrender.com/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: conversationPrompt }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Special handling for quota exceeded (429)
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
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `⚠️ ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 w-full max-w-4xl flex items-center justify-between">
        <h1 className="text-sm md:text-2xl font-bold text-white">
          Chat with Codebox AI
        </h1>
        <Link to="/" className="text-blue-400 hover:underline">
          Go to Home
        </Link>
      </div>

      <div className="w-full max-w-5xl flex flex-col h-[80vh] overflow-hidden mt-4 bg-gray-800/20 rounded-2xl backdrop-blur-lg">
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
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white">
                  <Bot size={18} />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-auto text-sm break-words ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                    : "bg-white/20 text-white rounded-bl-none overflow-auto"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
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
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white animate-pulse">
                <Bot size={18} />
              </div>
              <div className="px-4 py-2 rounded-2xl max-w-xs text-sm bg-white/20 text-white rounded-bl-none">
                Typing...
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20 flex items-center gap-3 bg-black/40 backdrop-blur-lg rounded-2xl">
          <input
            type="text"
            placeholder="Message Codebox AI..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-white/10 text-white px-4 py-2 rounded-xl outline-none border border-white/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white shadow-lg hover:opacity-90 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
