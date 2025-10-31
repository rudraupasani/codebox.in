import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Bot,
  User,
  BrainCircuit,
  Play,
  Square,
  Menu,
  X,
  Copy,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hi there! I'm Codebox AI, your coding assistant. I can help you with programming questions, code reviews, debugging, and more. What would you like to work on today?" 
    },
  ]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState({});
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const newUserMessage = { sender: "user", text };
    setMessages((prev) => [...prev, newUserMessage]);
    setText("");
    setLoading(true);

    try {
      const recentMessages = [...messages, newUserMessage].slice(-1000);

      const conversationPrompt = recentMessages
        .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
        .join("\n");

      const response = await fetch("https://codebox-d3m9.onrender.com/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: conversationPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "I'm experiencing high demand right now. Please wait a moment before trying again.",
            },
          ]);
        } else {
          throw new Error(data.error || "Server error");
        }
        return;
      }

      const botText = data.response || "I apologize, but I didn't understand that. Could you please rephrase your question?";
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `I encountered an error: ${err.message}` },
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

  const handleCopyCode = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setCopiedCode(prev => ({ ...prev, [index]: false }));
    }, 2000);
  };

  const navLinks = [
    { label: "Home", to: "/" },
  ];

  return (
    <div className="h-screen bg-gray-900 flex flex-col transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between z-50 transition-colors duration-300 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-100">Codebox AI</h1>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <Link key={i} to={link.to} className="text-gray-300 hover:text-gray-100 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} className="text-gray-100" /> : <Menu size={20} className="text-gray-100" />}
          </button>
        </div>

        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-15 left-0 right-0 bg-gray-800 border-b border-gray-700 p-4 md:hidden z-40"
          >
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.to} 
                className="block py-2 text-gray-300 hover:text-gray-100 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </header>

      {/* Main Chat Area - Flex container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Container - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-8">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full ${msg.sender === "user" ? "flex justify-end" : ""}`}
                >
                  {msg.sender === "user" ? (
                    /* User Message - Right Side */
                    <div className="flex gap-3 items-start max-w-[80%] flex-row-reverse">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-white" />
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="mb-1">
                          <span className="text-sm font-medium text-gray-100">You</span>
                        </div>
                        <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-full">
                          <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ inline, className, children, ...props }) {
                                  const match = /language-(\w+)/.exec(className || "");
                                  const codeContent = String(children).replace(/\n$/, "");

                                  return !inline && match ? (
                                    <div className="relative group my-2">
                                      <div className="bg-black/20 rounded-lg overflow-hidden border border-white/20">
                                        <div className="flex items-center justify-between px-3 py-2 bg-black/30 border-b border-white/20">
                                          <span className="text-xs text-white/70 font-medium uppercase">
                                            {match[1]}
                                          </span>
                                          <button
                                            onClick={() => handleCopyCode(codeContent, `user-${idx}-${match[1]}`)}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                                          >
                                            {copiedCode[`user-${idx}-${match[1]}`] ? (
                                              <>
                                                <Check size={12} />
                                                Copied
                                              </>
                                            ) : (
                                              <>
                                                <Copy size={12} />
                                                Copy
                                              </>
                                            )}
                                          </button>
                                        </div>
                                        <SyntaxHighlighter
                                          style={oneDark}
                                          language={match[1]}
                                          PreTag="div"
                                          className="!m-0 text-sm"
                                          customStyle={{ 
                                            padding: '0.75rem', 
                                            background: 'rgba(0,0,0,0.3)',
                                            margin: 0
                                          }}
                                          {...props}
                                        >
                                          {codeContent}
                                        </SyntaxHighlighter>
                                      </div>
                                    </div>
                                  ) : (
                                    <code className="bg-white/20 text-white px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                                p: ({ children }) => (
                                  <p className="mb-2 text-white leading-relaxed last:mb-0">{children}</p>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-semibold text-white">{children}</strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic text-white">{children}</em>
                                ),
                                a: ({ children, ...props }) => (
                                  <a 
                                    className="text-blue-200 hover:text-blue-100 underline" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    {...props}
                                  >
                                    {children}
                                  </a>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                                ),
                                li: ({ children }) => (
                                  <li className="text-white text-sm">{children}</li>
                                ),
                                h1: ({ children }) => (
                                  <h1 className="text-lg font-bold text-white mb-2 mt-3 first:mt-0">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-base font-bold text-white mb-2 mt-2">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-sm font-semibold text-white mb-1 mt-2">{children}</h3>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="border-l-2 border-white/30 pl-3 py-1 my-2 text-white/90 italic">
                                    {children}
                                  </blockquote>
                                ),
                                hr: () => (
                                  <hr className="border-white/30 my-2" />
                                ),
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Bot Message - Left Side */
                    <div className="flex gap-4 items-start w-full">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-100">Codebox AI</span>
                        </div>
                        
                        <div className="prose prose-gray max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                const codeContent = String(children).replace(/\n$/, "");

                                return !inline && match ? (
                                  <div className="relative group my-4">
                                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                                        <span className="text-xs text-gray-400 font-medium uppercase">
                                          {match[1]}
                                        </span>
                                        <button
                                          onClick={() => handleCopyCode(codeContent, `${idx}-${match[1]}`)}
                                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 rounded transition-colors"
                                        >
                                          {copiedCode[`${idx}-${match[1]}`] ? (
                                            <>
                                              <Check size={12} />
                                              Copied
                                            </>
                                          ) : (
                                            <>
                                              <Copy size={12} />
                                              Copy
                                            </>
                                          )}
                                        </button>
                                      </div>
                                      <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        className="!m-0 text-sm"
                                        customStyle={{ 
                                          padding: '1rem', 
                                          background: '#1f2937',
                                          margin: 0
                                        }}
                                        {...props}
                                      >
                                        {codeContent}
                                      </SyntaxHighlighter>
                                    </div>
                                  </div>
                                ) : (
                                  <code className="bg-gray-800 text-orange-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                    {children}
                                  </code>
                                );
                              },
                              p: ({ children }) => (
                                <p className="mb-3 text-gray-200 leading-relaxed">{children}</p>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-gray-100">{children}</strong>
                              ),
                              a: ({ children, ...props }) => (
                                <a 
                                  className="text-blue-500 hover:text-blue-600 underline" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  {...props}
                                >
                                  {children}
                                </a>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-gray-200">{children}</li>
                              ),
                              h1: ({ children }) => (
                                <h1 className="text-2xl font-bold text-gray-100 mb-3 mt-6 first:mt-0">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-xl font-bold text-gray-100 mb-3 mt-5">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-lg font-semibold text-gray-100 mb-2 mt-4">{children}</h3>
                              ),
                              h4: ({ children }) => (
                                <h4 className="text-md font-semibold text-gray-100 mb-2 mt-3">{children}</h4>
                              ),  
                              table: ({ children }) => (
                                <div className="overflow-x-auto my-4">
                                  <table className="min-w-full border border-gray-700 text-gray-200">
                                    <thead>
                                      <tr className="bg-gray-800">
                                        <th className="p-2 border-b border-gray-600">Header 1</th>
                                        <th className="p-2 border-b border-gray-600">Header 2</th>
                                        <th className="p-2 border-b border-gray-600">Header 3</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {children}
                                    </tbody>
                                  </table>
                                </div>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-gray-600 text-gray-300 pl-4 py-2 my-4 italic">
                                  {children}
                                </blockquote>
                              ),
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>

                        {/* Bot message actions */}
                        <div className="flex gap-2 mt-3">
                          {speakingIndex === idx ? (
                            <button
                              onClick={handleStop}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Square size={12} />
                              Stop
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRead(msg.text, idx)}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Play size={12} />
                              Read aloud
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex gap-4 items-start w-full"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-100">Codebox AI</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 transition-colors duration-300 flex-shrink-0">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex  items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  placeholder="Message Codebox AI..."
                  value={text}
                  disabled={loading}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  className="w-full resize-none bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-orange-500 rounded-l-xl px-4 py-3 outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={loading || !text.trim()}
                className={`p-4 mb-1.5 ml-1 ${loading || !text.trim() ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'} disabled:cursor-not-allowed rounded-r-xl transition-colors flex-shrink-0`}
              >
                <Send size={15} />
              </motion.button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Codebox AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;