import { HeroSection } from '@/components/sections/HeroSection'
import { PersonalizationQuiz } from '@/components/sections/PersonalizationQuiz'
import { FeaturedCollections } from '@/components/sections/FeaturedCollections'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { CustomerReviews } from '@/components/sections/CustomerReviews'
import { Newsletter } from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PersonalizationQuiz />
      <FeaturedCollections />
      <WhyChooseUs />
      <CustomerReviews />
      <Newsletter />
    </>
  )
}
