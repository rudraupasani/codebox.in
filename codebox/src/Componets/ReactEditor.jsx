import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Play, Terminal } from "lucide-react";

const ReactEditor = () => {
  const [activeTab, setActiveTab] = useState("editor");

  const [code] = useState(`export default function App() {
  console.log("React App running!");
  return (
    <div style={{ padding: "20px", color: "#61dafb", fontFamily: "sans-serif" }}>
      <h1>🚀 Hello from React</h1>
      <button onClick={() => console.log("Button clicked!")}>Click Me</button>
    </div>
  );
}`);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-950 via-black to-gray-900 p-2 sm:p-4">
      <SandpackProvider
        template="react"
        theme="dark"
        files={{ "/App.js": code }}
        options={{ entry: "/App.js", visibleFiles: ["/App.js"] }}
      >
        <SandpackLayout className="rounded-2xl shadow-2xl border border-gray-700 flex flex-col w-full h-full overflow-hidden backdrop-blur-md bg-gray-900/60">
          {/* Mobile Tab Controls */}
          <div className="flex md:hidden bg-gray-800/80 border-b border-gray-700 rounded-t-2xl">
            {[
              { id: "editor", label: "Editor", icon: <Code size={16} /> },
              { id: "preview", label: "Preview", icon: <Play size={16} /> },
              { id: "console", label: "Console", icon: <Terminal size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-cyan-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-1 overflow-hidden">
            {/* Editor Panel */}
            <motion.div
              className="flex-1 border-r border-gray-700 overflow-auto bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SandpackCodeEditor
                style={{ height: "100%", fontSize: 14 }}
                showLineNumbers
              />
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              className="flex-1 bg-white overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SandpackPreview style={{ height: "100%" }} />
            </motion.div>
          </div>

          {/* Console (Desktop) */}
          <motion.div
            className="hidden md:block h-40 border-t border-gray-700 bg-black overflow-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <SandpackConsole style={{ height: "100%" }} />
          </motion.div>

          {/* Mobile Views */}
          <div className="flex-1 md:hidden overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "editor" && (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-black"
                >
                  <SandpackCodeEditor style={{ height: "100%", fontSize: 13 }} />
                </motion.div>
              )}
              {activeTab === "preview" && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-white"
                >
                  <SandpackPreview style={{ height: "100%" }} />
                </motion.div>
              )}
              {activeTab === "console" && (
                <motion.div
                  key="console"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-black text-green-400 font-mono text-sm"
                >
                  <SandpackConsole style={{ height: "100%" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default ReactEditor;
