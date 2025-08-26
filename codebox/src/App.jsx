import React from 'react';
import Home from './Componets/Home';
import { Route, Routes } from 'react-router-dom';
import Chatbox from './Componets/Chatbox';
import About from './Componets/About';
import HomePage from './pages/HomePage';
import Features from './pages/Features';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
  );
};

export default App;
