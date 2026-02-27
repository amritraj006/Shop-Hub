import { FeaturedProducts, OurCollections } from "../components/FeaturedProducts"
import FeaturesSection from "../components/FeaturesSection"
import Hero from "../components/Hero"
import Loading from "../components/Loading"
import Newsletter from "../components/Newsletter"
import Testimonials from "../components/Testimonials"



const Home = () => {
  return (
    <div className="transition-colors duration-500 bg-white dark:bg-gray-900 min-h-screen">
      <Hero />
      <FeaturesSection />
      <FeaturedProducts />
      <OurCollections />
      <Testimonials />
      <Newsletter />




    </div>
  )
}

export default Home