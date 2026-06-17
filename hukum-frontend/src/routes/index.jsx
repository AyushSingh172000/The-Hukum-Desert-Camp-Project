import { Routes, Route } from 'react-router-dom'
import Home             from '../pages/Home'
import Accommodation    from '../pages/Accommodation'
import AccomDetail      from '../pages/Accommodation/AccomDetail'
import DesertExperience from '../pages/DesertExperience'
import Attractions      from '../pages/Attractions'
import Gallery          from '../pages/Gallery'
import Policy           from '../pages/Policy'
import Contact          from '../pages/Contact'
import Booking          from '../pages/Booking'
import NotFound         from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                          element={<Home />} />
      <Route path="/accommodation"             element={<Accommodation />} />
      <Route path="/accommodation/:slug"       element={<AccomDetail />} />
      <Route path="/desert-experience"         element={<DesertExperience />} />
      <Route path="/attractions"               element={<Attractions />} />
      <Route path="/gallery"                   element={<Gallery />} />
      <Route path="/policy"                    element={<Policy />} />
      <Route path="/contact"                   element={<Contact />} />
      <Route path="/booking"                   element={<Booking />} />
      <Route path="*"                          element={<NotFound />} />
    </Routes>
  )
}
