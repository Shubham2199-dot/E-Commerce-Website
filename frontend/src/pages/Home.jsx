import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import BestSeller from '../components/BestSeller'
const Home = () => {
  return (
    <div>
     <Hero/>
     <LatestCollection/>
     <BestSeller/>
      <OurPolicy/>
    </div>
  )
}

export default Home
