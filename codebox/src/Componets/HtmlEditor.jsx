import React, { useState, useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

const HtmlEditor = () => {
  const [code, setCode] = useState(defaultCode);
  const [showEditor, setShowEditor] = useState(true);
  const iframeRef = useRef(null);

  // Run code inside iframe
  const runCode = () => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    doc.open();
    doc.write(code);
    doc.close();
    setShowEditor(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          ⚡ HTML Live Sandbox
        </h1>

        <div className="flex gap-3">
          {showEditor ? (
            <button
              onClick={runCode}
              className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 shadow-md hover:shadow-green-500/40 transition font-semibold"
            >
              ▶ Run
            </button>
          ) : (
            <button
              onClick={() => setShowEditor(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-md hover:shadow-blue-500/40 transition font-semibold"
            >
              📝 Edit
            </button>
          )}
        </div>
      </div>

      {/* Editor + Preview Panels */}
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Editor */}
        {showEditor && (
          <div className="flex-1 backdrop-blur-md bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700 overflow-hidden min-h-[40vh]">
            <CodeMirrorEditor value={code} onChange={setCode} />
          </div>
        )}

        {/* Preview */}
        <div className="flex-1 backdrop-blur-md bg-white rounded-2xl shadow-lg border border-gray-700 overflow-hidden min-h-[40vh]">
          <iframe
            title="Preview"
            ref={iframeRef}
            className="w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

const CodeMirrorEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || viewRef.current) return;

    viewRef.current = new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        html(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
      parent: editorRef.current,
    });

    return () => viewRef.current?.destroy();
  }, [onChange]);

  return <div ref={editorRef} className="h-full w-full" />;
};

const defaultCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Vanilla Sandbox</title>
  <style>
    body {
      font-family: sans-serif;
      background-color: black;
      color: #0ff;
      text-align: center;
      padding: 50px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #6b5b95;
      color: white;
      border: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>Hello from HTML 🚀</h1>
  <button onclick="sayHello()">Click Me</button>

  <script>
    function sayHello() {
      console.log("JS running!");
      alert("Hello from JavaScript 🎉");
    }
  </script>
</body>
</html>`;

export default HtmlEditor;
