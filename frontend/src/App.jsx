
import './App.css'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ScheduleMeetingSection from './components/ScheduleMeetingSection'
import FooterSection from './components/FooterSection'

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);

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
