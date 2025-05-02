import React from 'react';
import Navbar from '../Componets/Navbar';
import codeVideo from '../assets/CODEBOX.IN.mp4';
import { motion } from 'framer-motion';
import Footer from '../Componets/Footer';
import Details from './Details';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Background Video */}
        <motion.video
          animated={{
            opacity: 0,
            scale: 1.2,
          }}
          transition={{
            duration: 1,
            z:20,
            ease: 'easeInOut',
          }}
          className="h-full w-full object-cover"
          src={codeVideo}
          loop
          autoPlay
          muted
          infinite
          playsInline
        />


        {/* Overlay */}
        <div className="absolute top-0 left-0 h-full w-full  flex flex-col justify-center items-center text-center text-white px-4">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -50, scale: 1.2 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold mb-4"
          >
            Welcome to <span className="text-blue-400">CODEBOX</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 50, scale: 1.2 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="text-lg md:text-2xl max-w-2xl"
          >
            Your intelligent coding companion — write, debug, and deploy with the power of AI at your fingertips.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y:20, scale: 1.2 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="text-white border border-gray-900 cursor-pointer py-2 px-6 rounded-xl bg-black hover:bg-blue-600 hover:scale-110 transition-all duration-300"
          >
            Try Now!
          </motion.button>
        </div>

        </div>
        <Details className="z-10" />

        <Footer />

    </>
  );
};

export default Home;
