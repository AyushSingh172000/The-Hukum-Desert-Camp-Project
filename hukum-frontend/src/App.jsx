import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AppRoutes from './routes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
