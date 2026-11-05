import { useEffect, useState } from 'react'

function UserLocationClock() {
  const browserTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

  const [userLocation, setUserLocation] = useState({
    city: '',
    country: '',
    timeZone: browserTimeZone,
  })

  const [locationStatus, setLocationStatus] = useState(() =>
    typeof navigator !== 'undefined' && navigator.geolocation
      ? 'loading'
      : 'unsupported'
  )

  const [currentTime, setCurrentTime] = useState(() => new Date())

  // Update the displayed local time once per second.
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Detect the user's own GPS location and timezone.
  useEffect(() => {
    let isActive = true

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      return () => {
        isActive = false
      }
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        const locationParams = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          localityLanguage: 'en',
        })

        const reverseGeocodeURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?${locationParams}`

        const timezoneParams = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current: 'temperature_2m',
          timezone: 'auto',
        })

        const timezoneURL = `https://api.open-meteo.com/v1/forecast?${timezoneParams}`

        const [locationResult, timezoneResult] = await Promise.allSettled([
          fetch(reverseGeocodeURL).then((response) => {
            if (!response.ok) throw new Error('Location lookup failed')
            return response.json()
          }),
          fetch(timezoneURL).then((response) => {
            if (!response.ok) throw new Error('Timezone lookup failed')
            return response.json()
          }),
        ])

        if (!isActive) return

        const locationData =
          locationResult.status === 'fulfilled' ? locationResult.value : {}
        const timezoneData =
          timezoneResult.status === 'fulfilled' ? timezoneResult.value : {}

        const detectedCity =
          locationData.city ||
          locationData.locality ||
          locationData.principalSubdivision ||
          ''
        const detectedCountry = locationData.countryName || ''
        const detectedTimezone = timezoneData.timezone || browserTimeZone

        setUserLocation({
          city: detectedCity,
          country: detectedCountry,
          timeZone: detectedTimezone,
        })

        if (detectedCity || detectedCountry) {
          setLocationStatus('success')
        } else if (timezoneData.timezone) {
          setLocationStatus('partial')
        } else {
          setLocationStatus('error')
        }
      },
      (error) => {
        if (!isActive) return
        setLocationStatus(error.code === 1 ? 'denied' : 'error')
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    )

    return () => {
      isActive = false
    }
  }, [browserTimeZone])

  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone: userLocation.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(currentTime)

  const localDate = new Intl.DateTimeFormat('en-US', {
    timeZone: userLocation.timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(currentTime)

  const localHour = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: userLocation.timeZone,
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(currentTime)
  )

  const isDayTime = localHour >= 6 && localHour < 18

  return (
    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 xl:flex">
      {/* User country and city */}
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5 shrink-0 text-blue-500 dark:text-blue-400"
          aria-hidden="true"
        >
          <path
            d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.5" />
        </svg>

        {locationStatus === 'loading' ? (
          <span className="text-xs font-medium text-slate-400">
            Detecting your location...
          </span>
        ) : locationStatus === 'success' || locationStatus === 'partial' ? (
          <>
            <span className="text-[13px] font-bold tracking-wide text-slate-800 dark:text-slate-100">
              {userLocation.country || 'Current Location'}
            </span>

            {userLocation.city && (
              <>
                <span className="text-xs text-slate-400">/</span>
                <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">
                  {userLocation.city}
                </span>
              </>
            )}
          </>
        ) : (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            Location access needed
          </span>
        )}
      </div>

      {/* Local time and date */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <img
            src={
              isDayTime
                ? '/image/icons/day-time.png'
                : '/image/icons/night-time.png'
            }
            alt=""
            aria-hidden="true"
            className="h-7 w-7 shrink-0 object-contain"
          />
          <span className="font-display text-xs font-bold tabular-nums text-slate-700 dark:text-slate-200">
            {localTime}
          </span>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          {localDate}
        </span>
      </div>
    </div>
  )
}

export default UserLocationClock
