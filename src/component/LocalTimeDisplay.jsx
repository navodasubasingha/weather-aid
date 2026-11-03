import { useEffect, useState } from 'react'

function getMinutes(value) {
  if (!value) return null

  const match = String(value).match(/T(\d{2}):(\d{2})/)

  if (!match) return null

  return Number(match[1]) * 60 + Number(match[2])
}

function LocalTimeDisplay({ timeZone = 'Asia/Colombo', sunrise, sunset }) {
  const [now, setNow] = useState(() => new Date())

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Local time
  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(now)

  // Local date
  const localDate = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(now)

  // Local hour and minute
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)

  const hour = Number(parts.find((part) => part.type === 'hour')?.value)

  const minute = Number(parts.find((part) => part.type === 'minute')?.value)

  const currentMinutes = hour * 60 + minute

  // Sunrise / Sunset
  const sunriseMinutes = getMinutes(sunrise)
  const sunsetMinutes = getMinutes(sunset)

  let isDayTime

  if (sunriseMinutes !== null && sunsetMinutes !== null) {
    isDayTime =
      currentMinutes >= sunriseMinutes && currentMinutes < sunsetMinutes
  } else {
    isDayTime = hour >= 6 && hour < 18
  }

  // Select image
  const iconPath = isDayTime
    ? '/image/icons/day-time.png'
    : '/image/icons/night-time.png'

  return (
    <div className="absolute bottom-5 right-5 z-20 flex w-[185px] flex-col items-center text-center sm:bottom-6 sm:right-6 sm:w-[205px]">
      {/* Large Sun / Moon Illustration */}
      <img
        src={iconPath}
        alt={isDayTime ? 'Daytime' : 'Nighttime'}
        className="h-26 w-26 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] sm:h-32 sm:w-32 translate-y-5"
      />

      {/* Current Time */}
      <h2 className="mt-1 whitespace-nowrap font-display text-[29px] font-bold leading-tight tracking-[-0.045em] text-white tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:text-[32px]">
        {localTime}
      </h2>

      {/* Current Date */}
      <p className="mt-1 whitespace-nowrap text-[11px] font-medium tracking-wide text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] sm:text-xs">
        {localDate}
      </p>
    </div>
  )
}

export default LocalTimeDisplay
