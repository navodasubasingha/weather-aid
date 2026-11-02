import { useState } from 'react'

import Navbar from './component/Navbar'
import CurrentWeather from './component/CurrentWeather'
import WeatherHighlights from './component/WeatherHighlights'
import HourlyForecast from './component/HourlyForecast'

function App() {
  const [unit, setUnit] = useState('C')

  return (
    <div className="min-h-screen bg-slate-50 xl:flex xl:h-screen xl:flex-col xl:overflow-hidden">
      <div className="shrink-0">
        <Navbar unit={unit} onUnitChange={setUnit} />
      </div>

      <main className="mx-auto w-full max-w-[1600px] space-y-5 px-5 py-5 sm:px-6 lg:px-8 xl:flex xl:min-h-0 xl:flex-1 xl:flex-col xl:gap-4 xl:space-y-0 xl:overflow-hidden">
        {/* Dashboard Heading */}
        <section className="shrink-0">
          <p className="text-sm font-medium text-blue-600">WEATHER OVERVIEW</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Your daily weather
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Your weather forecast, all in one place.
          </p>
        </section>

        {/* Top Dashboard */}
        <section className="grid grid-cols-1 gap-4 xl:min-h-0 xl:flex-[1.1] xl:grid-cols-12">
          <div className="xl:col-span-7 xl:min-h-0">
            <CurrentWeather />
          </div>

          <div className="xl:col-span-5 xl:min-h-0">
            <WeatherHighlights />
          </div>
        </section>

        {/* Hourly Forecast */}
        <div className="xl:min-h-0 xl:flex-1">
          <HourlyForecast />
        </div>
      </main>
    </div>
  )
}

export default App
