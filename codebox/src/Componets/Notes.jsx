"use client";

import React, { useState, useEffect } from "react";
import { X, Edit, Plus, Copy } from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("keepNotesDark") || "[]");
    setNotes(stored);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("keepNotesDark", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (!text.trim()) return;
    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = text;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([text, ...notes]); // New notes on top
    }
    setText("");
  };

  const handleDelete = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx) => {
    setText(notes[idx]);
    setEditIndex(idx);
  };

  const handleCopy = (note) => {
    navigator.clipboard.writeText(note);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">💡 Notes</h1>

      {/* Input Section */}
      <div className="flex gap-3 w-full max-w-xl mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 p-3 rounded-2xl border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-inner"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 transition px-5 py-3 rounded-2xl shadow-lg flex items-center justify-center text-white"
        >
          {editIndex !== null ? "Update" : <Plus size={20} />}
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {notes.map((note, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-5 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 relative"
          >
            <p className="break-words text-gray-100 whitespace-pre-line">{note}</p>
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => handleCopy(note)}
                className="text-gray-300 hover:text-yellow-400 transition"
              >
                <Copy size={18} />
              </button>
              <button
                onClick={() => handleEdit(idx)}
                className="text-gray-300 hover:text-blue-400 transition"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(idx)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button for Mobile */}
      <button
        onClick={() => setText("")}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 p-4 rounded-full shadow-2xl flex items-center justify-center md:hidden"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Notes;
