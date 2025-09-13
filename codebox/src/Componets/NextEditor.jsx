"use client";

import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { motion } from "framer-motion";
import { Code, Play, Terminal } from "lucide-react";

const NextJsEditor = () => {
  const [activeTab, setActiveTab] = useState("editor"); // "editor" | "preview" | "console"

  // Default Next.js code sample
  const [code] = useState(`export default function Home() {
  console.log("Next.js App running!");
  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#0070f3" }}>⚡ Hello from Next.js</h1>
      <button onClick={() => console.log("Next.js Button clicked!")}>
        Click Me
      </button>
    </main>
  );
}`);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black p-2 sm:p-4">
      <SandpackProvider
        template="nextjs"
        theme="dark"
        files={{ "/pages/index.js": code }}
        options={{
          entry: "/pages/index.js",
          visibleFiles: ["/pages/index.js"],
        }}
      >
        <SandpackLayout className="rounded-2xl shadow-2xl border border-gray-700 flex flex-col w-full h-full overflow-hidden">
          {/* Mobile Tab Controls */}
          <div className="flex md:hidden bg-gray-800 border-b border-gray-700">
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
                    ? "bg-gray-900 text-blue-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editor + Preview (Desktop) */}
          <div className="hidden md:flex flex-1 overflow-hidden">
            {/* Editor Panel */}
            <div className="flex-1 border-r border-gray-700 overflow-auto bg-black">
              <SandpackCodeEditor
                style={{ height: "100%", fontSize: 14 }}
                showLineNumbers
              />
            </div>

            {/* Preview Panel */}
            <div className="flex-1 bg-white overflow-hidden">
              <SandpackPreview style={{ height: "100%" }} />
            </div>
          </div>

          {/* Console (Desktop) */}
          <div className="hidden md:block h-40 border-t border-gray-700 bg-black overflow-auto">
            <SandpackConsole style={{ height: "100%" }} />
          </div>

          {/* Mobile Views */}
          <div className="flex-1 md:hidden overflow-hidden">
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
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default NextJsEditor;
