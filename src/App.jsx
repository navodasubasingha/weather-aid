import { useState } from 'react'
import Navbar from './component/Navbar'
import CurrentWeather from './component/CurrentWeather'

function App() {
  const [unit, setUnit] = useState('C')

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar unit={unit} onUnitChange={setUnit} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section id="today">
          <p className="text-sm font-medium text-blue-600">WEATHER OVERVIEW</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Your daily weather
          </h1>

          <p className="mt-2 text-slate-500">
            Your weather forecast, all in one place.
          </p>
        </section>
      </main>
      <CurrentWeather />
    </div>
  )
}

export default App
