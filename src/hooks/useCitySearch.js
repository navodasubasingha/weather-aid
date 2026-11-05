import { useEffect, useState } from 'react'
import { searchLocations } from '../services/geocodingService'

function useCitySearch(onSearch) {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)

  // Debounced city autocomplete request
  useEffect(() => {
    const query = city.trim()

    if (query.length < 2) return undefined

    const controller = new AbortController()

    const debounceTimer = setTimeout(async () => {
      setIsSuggestionsLoading(true)

      try {
        const results = await searchLocations(query, {
          signal: controller.signal,
        })

        setSuggestions(results)
        setShowSuggestions(true)
        setActiveSuggestionIndex(-1)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('City suggestions error:', error)
          setSuggestions([])
          setShowSuggestions(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSuggestionsLoading(false)
        }
      }
    }, 300)

    return () => {
      clearTimeout(debounceTimer)
      controller.abort()
    }
  }, [city])

  function handleCityChange(event) {
    const value = event.target.value

    setCity(value)
    setActiveSuggestionIndex(-1)

    if (value.trim().length >= 2) {
      setSuggestions([])
      setIsSuggestionsLoading(true)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setIsSuggestionsLoading(false)
    }
  }

  function clearSearch() {
    setCity('')
    setSuggestions([])
    setShowSuggestions(false)
    setIsSuggestionsLoading(false)
    setActiveSuggestionIndex(-1)
  }

  function handleSelectSuggestion(location) {
    onSearch?.(location)
    clearSearch()
  }

  function handleSuggestionKeyDown(event) {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault()
      setShowSuggestions(true)
      setActiveSuggestionIndex((previous) =>
        previous >= suggestions.length - 1 ? 0 : previous + 1
      )
    } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault()
      setActiveSuggestionIndex((previous) =>
        previous <= 0 ? suggestions.length - 1 : previous - 1
      )
    } else if (event.key === 'Escape') {
      setShowSuggestions(false)
      setActiveSuggestionIndex(-1)
    } else if (
      event.key === 'Enter' &&
      activeSuggestionIndex >= 0 &&
      suggestions[activeSuggestionIndex]
    ) {
      event.preventDefault()
      handleSelectSuggestion(suggestions[activeSuggestionIndex])
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      handleSelectSuggestion(suggestions[activeSuggestionIndex])
      return
    }

    const searchCity = city.trim()

    if (searchCity && onSearch) {
      onSearch(searchCity)
      clearSearch()
    }
  }

  return {
    city,
    suggestions,
    isSuggestionsLoading,
    showSuggestions,
    activeSuggestionIndex,
    setShowSuggestions,
    setActiveSuggestionIndex,
    handleCityChange,
    handleSuggestionKeyDown,
    handleSubmit,
    handleSelectSuggestion,
  }
}

export default useCitySearch
