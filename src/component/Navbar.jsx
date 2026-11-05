import Brand from './navbar/Brand'
import ApiStatus from './navbar/ApiStatus'
import UserLocationClock from './navbar/UserLocationClock'
import CitySearch from './navbar/CitySearch'
import TemperatureUnitToggle from './navbar/TemperatureUnitToggle'
import ThemeToggle from './navbar/ThemeToggle'
import useCitySearch from '../hooks/useCitySearch'

function Navbar({
  onSearch,
  unit = 'C',
  onUnitChange,
  darkMode = false,
  onToggleDarkMode,
  apiStatus = 'loading',
}) {
  const search = useCitySearch(onSearch)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-[#080F20]/90">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[76px] items-center justify-between gap-4">
          {/* Brand and API connection status */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <Brand darkMode={darkMode} />
            <ApiStatus apiStatus={apiStatus} />
          </div>

          {/* Center - User Location, Time and Date */}
          <UserLocationClock />

          {/* Right-side actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <CitySearch {...search} />
            <TemperatureUnitToggle unit={unit} onUnitChange={onUnitChange} />
            <ThemeToggle
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
            />
          </div>
        </div>

        {/* Mobile city search */}
        <CitySearch {...search} mobile />
      </nav>
    </header>
  )
}

export default Navbar
