import { useState } from 'react'
import './App.css'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ScheduleMeetingSection from './components/ScheduleMeetingSection'
import FooterSection from './components/FooterSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HeroSection />
    <FeaturesSection />
    <ScheduleMeetingSection />
    <FooterSection />
    </>
  )
}

export default App
