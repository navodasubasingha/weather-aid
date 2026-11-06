# WeatherAid 🌦️

**Your First Check Before Every Plan.**

WeatherAid is a responsive weather dashboard built with React. It helps users check current weather conditions, upcoming hourly forecasts, and a 7-day forecast in one place. The interface is designed to be clean and easy to use on desktop, tablet, and mobile screens.

<details>
  <summary><strong>Project links</strong></summary>

- **Live Demo:** https://weather-aid-delta.vercel.app/
- **GitHub Repository:** https://github.com/navodasubasingha/weather-aid

</details>

## Features

- **Current weather** – View the current temperature, feels-like temperature, weather condition, daily high and low, sunrise, and sunset.
- **City search** – Search for locations using the Open-Meteo Geocoding API, with autocomplete suggestions.
- **Current location** – Use browser location permission to find weather for the user's current location.
- **Hourly forecast** – Check upcoming hourly conditions, including temperature, rain probability, wind speed, and wind direction.
- **7-day forecast** – View daily weather conditions and minimum/maximum temperatures.
- **Weather highlights** – See humidity, wind speed, UV index, visibility, cloud cover, and precipitation.
- **Temperature units** – Switch between Celsius and Fahrenheit.
- **Local time** – Display local time based on the selected location's time zone.
- **Light and dark themes** – Switch themes; the selected theme is saved in browser local storage.
- **Weather effects** – CSS-based rain and snowfall animations for supported weather conditions.
- **Loading states** – Dashboard skeleton placeholders while the initial weather data is loading.
- **Responsive layout** – Dashboard components adapt to different screen sizes.

## Tech Stack

| Technology               | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| React                    | User interface and reusable components       |
| Vite                     | Development server and build tooling         |
| Tailwind CSS v4          | Utility-first styling and responsive layouts |
| JavaScript (ES6+)        | Application logic                            |
| Open-Meteo Forecast API  | Current, hourly, and daily weather data      |
| Open-Meteo Geocoding API | City and location search                     |
| Browser Geolocation API  | Retrieve the user's current coordinates      |
| CSS animations           | Rain, snow, and loading shimmer effects      |

## APIs and Data Sources

WeatherAid uses public weather services:

- **Open-Meteo Forecast API:** https://open-meteo.com/en/docs
- **Open-Meteo Geocoding API:** https://open-meteo.com/en/docs/geocoding-api
- **BigDataCloud reverse geocoding:** https://www.bigdatacloud.com/ — used to help resolve a detected location into a readable place name in the location-detection flow.

The Open-Meteo APIs used by this project do not require an API key for the current setup. The browser may ask for location permission when the current-location feature is used. Location access is optional; city search can be used instead.

## Getting Started

### Prerequisites

- Node.js (use a current compatible LTS release)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/navodasubasingha/weather-aid.git
```

### 2. Open the project directory

```bash
cd weather-aid
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal. Vite commonly uses `http://localhost:5173`.

### 5. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

The main source files are organized as follows. Additional components and assets may be present in the project.

```text
weather-aid/
├── public/
│   └── image/
│       ├── icons/
│       ├── logos/
│       └── weather/
├── src/
│   ├── assets/
│   ├── component/
│   ├── hooks/
│   │   └── useCitySearch.js
│   ├── services/
│   │   ├── geocodingService.js
│   │   └── weatherService.js
│   ├── utils/
│   │   └── weatherAssets.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Weather Highlights

The dashboard's highlights section displays six useful measurements:

| Highlight     | Data                           |
| ------------- | ------------------------------ |
| Humidity      | Relative humidity (%)          |
| Wind speed    | Wind speed (km/h)              |
| UV index      | UV index and its general level |
| Visibility    | Visibility (km)                |
| Cloud cover   | Cloud cover (%)                |
| Precipitation | Precipitation amount (mm)      |

## Weather Animations

Rain and snowfall effects are rendered with CSS and selected using the current Open-Meteo weather code. The effects are decorative and do not replace the weather information returned by the API. Reduced-motion preferences are respected so users who request less motion are not shown the animated effects.

## Customization

- **Theme colors:** Update the Tailwind classes in the relevant components.
- **Fonts:** Font imports and Tailwind font tokens are configured in `src/index.css`.
- **Weather images and icons:** Add or replace assets in the relevant `public/` folders and keep the paths used by the components in sync.
- **Weather mapping:** Weather condition descriptions and image mappings are maintained in `src/utils/weatherAssets.js`.
- **API requests:** Forecast and geocoding requests are maintained in `src/services/`.

## Development Notes

- Do not commit `node_modules/` or generated build output (`dist/`).
- Keep API request and location-search logic in the service files rather than duplicating it inside UI components.
- Test the dashboard in both light and dark themes and at mobile, tablet, and desktop widths.
- Browser location access requires user permission and a secure context (HTTPS) when deployed.

## Screenshots

Screenshots can be added to a `screenshots/` folder and embedded here when ready. For example:

```markdown
![WeatherAid dashboard](screenshots/dashboard-light.png)
```

## Deployment

WeatherAid is deployed on Vercel.

**Live Demo:** https://weather-aid-delta.vercel.app/

The project is connected to the GitHub repository. Push changes to the deployment branch to trigger a new Vercel deployment.

## License

This project is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for the full license text.

---

Built with React, Vite, Tailwind CSS, and Open-Meteo.
