import { useState } from 'react'

function Brand({ darkMode = false }) {
  const [failedLogoSrc, setFailedLogoSrc] = useState('')
  const logoSrc = darkMode
    ? '/image/logos/weatheraid-logo-dark.png'
    : '/image/logos/weatheraid-logo-light.png'

  const logoImageFailed = failedLogoSrc === logoSrc

  return (
    <a
      href="/"
      className="group flex shrink-0 items-center gap-3"
      aria-label="WeatherAid home"
    >
      {logoImageFailed ? (
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <circle cx="29" cy="15" r="7" fill="#FDE68A" />
            <path
              d="M8 29.5C8 25.9 10.9 23 14.5 23C15.1 18.9 18.6 16 22.7 16C27.2 16 30.8 19.6 30.8 24.1C34.1 24.1 36.5 26.6 36.5 29.7C36.5 33 33.8 35.5 30.5 35.5H14.5C10.9 35.5 8 32.8 8 29.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : (
        <img
          key={logoSrc}
          src={logoSrc}
          alt=""
          aria-hidden="true"
          onError={() => setFailedLogoSrc(logoSrc)}
          className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div className="leading-none">
        <span className="font-display text-[21px] font-bold tracking-[-0.06em] text-slate-900 dark:text-white">
          Weather<span className="text-blue-600">Aid</span>
        </span>

        <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.19em] text-slate-400 dark:text-slate-500">
          Weather intelligence
        </p>
      </div>
    </a>
  )
}

export default Brand
