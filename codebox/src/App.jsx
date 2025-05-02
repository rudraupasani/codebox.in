import React from 'react';
import Home from './Componets/Home';
import { Route, Routes } from 'react-router-dom';
import Chatbox from './Componets/Chatbox';
import About from './Componets/About';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
  );
};

export default App;
