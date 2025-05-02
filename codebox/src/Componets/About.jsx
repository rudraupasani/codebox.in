import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col justify-center items-center min-h-screen w-screen bg-gradient-to-br from-black to-gray-900 p-4 gap-8'
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className=' mt-20 text-white text-3xl font-bold'
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='text-white text-lg text-center max-w-2xl'
        >
          We are a team of passionate developers and designers dedicated to creating innovative solutions that make your life easier. Our mission is to provide high-quality products and services that meet the needs of our users.
        </motion.p>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className='flex flex-col md:flex-row gap-4'
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className='bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm'
          >
            <h2 className='text-white text-xl font-semibold'>Our Vision</h2>
            <p className='text-gray-400'>To be a leader in the tech industry by providing cutting-edge solutions that empower individuals and businesses.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className='bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm'
          >
            <h2 className='text-white text-xl font-semibold'>Our Mission</h2>
            <p className='text-gray-400'>To create user-friendly applications that enhance productivity and creativity.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className='bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm'
          >
            <h2 className='text-white text-xl font-semibold'>Our Values</h2>
            <p className='text-gray-400'>We value innovation, integrity, and customer satisfaction. We strive to exceed expectations and deliver exceptional results.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          whileInView={true}
          className='flex flex-col justify-center items-center w-full bg-gradient-to-br from-black to-gray-900 p-4 gap-8'
        >
          <h1 className='text-white text-3xl font-bold'>Contect Us</h1>
          <form className='lg:w-100' action="">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileInView={true}

              className='flex flex-col gap-4'
            >
              <input type="text" placeholder='Name' className='h-12 p-2 w-full   rounded-lg bg-gray-800 text-white' />
              <input type="email" placeholder='Email' className='h-12 p-2 rounded-lg bg-gray-800 text-white' />
              <textarea placeholder='Message' className='p-2 h-12 rounded-lg bg-gray-800 lg:w-100 text-white'></textarea>
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileInView={true}

                type="submit"
                className='bg-blue-600 p-2 rounded-lg'
              >
                Send
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  )
}

export default About
