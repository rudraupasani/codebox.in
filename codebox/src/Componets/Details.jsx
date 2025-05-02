import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Details = () => {
  return (
    <div
      className="  flex flex-col justify-center items-center min-h-screen w-screen bg-gradient-to-br from-black to-gray-900 p-4 gap-8"
    >      <motion.h1
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        viewport={{ once: true }}  // 👈 Only animate once when in view
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="text-sm text-white font-bold lg:text-4xl text-center lg:mt-20 "
      >
        Writes, brainstorms, edits, and explores ideas with you
      </motion.h1>
      
      <Link className="text-blue-500 text-md lg:text-xl underline" to="/chatbox">Explore Now</Link>

      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        viewport={{ once: true  }} // 👈 Animate when in view
        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
      >
        <motion.img
          src="https://itgnthvglnbnwfrkrqvj.supabase.co/storage/v1/object/sign/clouddrive/photo/Screenshot%202025-05-02%20112749.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U4ZGNmNzI1LTM4M2YtNDFjOC05NWExLTM3NGFlYzQxMDUwNyJ9.eyJ1cmwiOiJjbG91ZGRyaXZlL3Bob3RvL1NjcmVlbnNob3QgMjAyNS0wNS0wMiAxMTI3NDkucG5nIiwiaWF0IjoxNzQ2MTY1NDk5LCJleHAiOjE5MDM4NDU0OTl9.I3oV1CHlC3WYV6oIPiox7OgUCVCoMHpXabJMT2V6Q-E"
          alt="AI Brainstorming"
          className="w-[1000px] mt-5 h-auto border-2 border-black rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 flex-wrap justify-center items-center p-4">
  {/* Card 1: AI Brainstorming */}
  <div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
  className="w-full max-w-md flex flex-col gap-4 border-2 border-black rounded-2xl shadow-xl p-6 bg-gradient-to-br from-black to-gray-700">
    <motion.h1
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
      className="text-xl text-white font-bold lg:text-4xl text-center lg:mt-10"
    >
      AI Brainstorming
    </motion.h1>
    <p className="text-white text-sm md:text-base lg:text-md text-center">
      AI Brainstorming is a tool that helps you brainstorm ideas and write content with the help of AI. It uses advanced natural language processing algorithms to understand your input and generate relevant suggestions.
    </p>
  </div>

  {/* Card 2: AI Writing Assistant */}
  <div
   whileHover={{ scale: 1.05 }}
   transition={{ duration: 0.3 }}
  className="w-full max-w-md flex flex-col gap-4 border-2 border-black rounded-2xl shadow-xl p-6 bg-gradient-to-br from-black to-gray-700">
    <motion.h1
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
      className="text-xl text-white font-bold lg:text-4xl text-center lg:mt-10"
    >
      AI Writing Assistant
    </motion.h1>
    <p className="text-white text-sm md:text-base lg:text-md text-center">
      AI Writing Assistant is a tool that helps you write better by providing suggestions and corrections. It uses advanced natural language processing algorithms to understand your input and generate relevant suggestions.
    </p>
  </div>
  
    
    {/* Card 3: AI Content Generator */}
  <div
   whileHover={{ scale: 1.05 }}
   transition={{ duration: 0.3 }}
  className="w-full max-w-md flex flex-col gap-4 border-2 border-black rounded-2xl shadow-xl p-6 bg-gradient-to-br from-black to-gray-700">
    <motion.h1
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
      className="text-xl text-white font-bold lg:text-4xl text-center lg:mt-10"
    >
      AI Content Generator
    </motion.h1>
    <p className="text-white text-sm md:text-base lg:text-md text-center">
      AI Content Generator is a tool that helps you generate content for your website or blog. It uses advanced natural language processing algorithms to understand your input and generate relevant
      <br/> suggestions.
    </p>
</div>
</div>   

<div className='items-center flex flex-col gap-4  p-4 shadow-xl border-2 border-black w-full  h-50'>   
  <motion.h1
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.2 }}
        className="text-xl text-white font-bold lg:text-4xl text-center lg:mt-10"
      >
        Join hundreds of millions of users and try Codebox today.
      </motion.h1>      


      <button className='py-3 px-4 bg-black text-white rounded-2xl '>Join Now</button>  

</div>



    </div>
  )
}

export default Details
