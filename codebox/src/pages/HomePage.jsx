import React from 'react'
import Navbar from '../Componets/Navbar'
import Home from '../Componets/Home'
import Details from '../Componets/Details'
import Footer from '../Componets/Footer'
import Features from './Features'
import About from '../Componets/About'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Home/>
        <Features />
        <Footer/>
    </div>
  )
}

export default HomePage