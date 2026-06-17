import { useEffect } from 'react'
import Hero            from '../../components/sections/Hero'
import About           from '../../components/sections/About'
import WhyChooseUs     from '../../components/sections/WhyChooseUs'
import Camp            from '../../components/sections/Camp'
import Safari          from '../../components/sections/Safari'
import Reservation     from '../../components/sections/Reservation'
import GalleryPreview  from '../../components/sections/GalleryPreview'
import VideoShowcase   from '../../components/sections/VideoShowcase'

export default function Home() {
  useEffect(() => {
    document.title = 'The Hukum Desert Camp — Luxury Desert Experience in Jaisalmer'
  }, [])

  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Camp />
      <Safari />
      <Reservation />
      <GalleryPreview />
      <VideoShowcase />
    </>
  )
}
