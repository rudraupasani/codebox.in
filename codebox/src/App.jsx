import React from 'react';
import Home from './Componets/Home';
import { Route, Routes } from 'react-router-dom';
import Chatbox from './Componets/Chatbox';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbox" element={<Chatbox />} />
        {/* Add more routes here as needed */}
      </Routes>
  );
};

export default App;
