import React from 'react'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Benefits } from '@/components/sections/Benefits'
import { CasesSection } from '@/components/sections/CasesSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { useLoading } from '@/hooks'

function App() {
  const { isLoading } = useLoading(true)

  // Simula carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // setIsLoading será implementado quando o hook estiver funcionando
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <CasesSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
