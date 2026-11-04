const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'

/**
 * Search locations using Open-Meteo Geocoding API.
 *
 * @param {string} query - City or location name.
 * @param {Object} options - Request options.
 * @returns {Promise<Array>} Matching locations.
 */
export async function searchLocations(query, { signal } = {}) {
  const searchTerm = query.trim()

  // Validate search input
  if (searchTerm.length < 2) {
    return []
  }

  const params = new URLSearchParams({
    name: searchTerm,
    count: '8',
    language: 'en',
    format: 'json',
  })

  try {
    const response = await fetch(`${GEOCODING_API}?${params.toString()}`, {
      signal,
    })

    const data = await response.json().catch(() => null)

    // Check API response
    if (!response.ok || !data || data.error) {
      throw new Error(
        data?.reason || `Location search failed. Status: ${response.status}`
      )
    }

    // Convert API results into application location objects
    return (data.results || []).map((location) => ({
      id: location.id,
      name: location.name,
      country: location.country || '',
      countryCode: location.country_code || '',
      admin1: location.admin1 || '',
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone || 'auto',
    }))
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }

    console.error('Geocoding API Error:', error)

    throw new Error(error.message || 'Unable to search for this location', {
      cause: error,
    })
  }
}
