import { useState } from 'react'

import Navbar from './component/Navbar'
import CurrentWeather from './component/CurrentWeather'
import WeatherHighlights from './component/WeatherHighlights'
import FiveHourForecast from './component/FiveHourForecast'
import WeeklyForecast from './component/WeeklyForecast'

function App() {
  const [unit, setUnit] = useState('C')

  return (
    <div className="min-h-screen bg-slate-50 xl:flex xl:h-screen xl:flex-col xl:overflow-hidden">
      {/* Navigation */}
      <div className="shrink-0">
        <Navbar unit={unit} onUnitChange={setUnit} />
      </div>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-5 px-5 py-5 sm:px-6 lg:px-8 xl:min-h-0 xl:overflow-hidden">
        {/* Dashboard introduction */}
        <header className="shrink-0">
          <h1 className="font-display text-2xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl">
            Your daily weather
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            A clear view of current conditions and the forecast ahead.
          </p>
        </header>

        {/* Top dashboard row */}
        <section className="grid grid-cols-1 items-stretch gap-5 xl:min-h-0 xl:flex-[1.1] xl:grid-cols-12">
          <div className="xl:col-span-7 xl:min-h-0">
            <CurrentWeather />
          </div>

          <div className="xl:col-span-5 xl:min-h-0">
            <WeatherHighlights />
          </div>
        </section>

        {/* Forecast row */}
        <section className="grid grid-cols-1 items-stretch gap-5 xl:min-h-0 xl:flex-1 xl:grid-cols-12">
          <div className="xl:col-span-5 xl:min-h-0">
            <FiveHourForecast />
          </div>

          <div className="xl:col-span-7 xl:min-h-0">
            <WeeklyForecast />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
