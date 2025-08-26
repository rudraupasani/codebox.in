import React from 'react'
import Navbar from '../Componets/Navbar'
import Home from '../Componets/Home'
import Details from '../Componets/Details'
import Footer from '../Componets/Footer'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Home/>
        <Details/>
        <Footer/>
    </div>
  )
}

export default HomePage