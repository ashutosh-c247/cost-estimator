import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDebounce } from "@/hooks/debounce";

const LocationAutocomplete = ({ value, onChange, onSelect, label }) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  const fetchSuggestions = useCallback(
    async (searchQuery) => {
      if (searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MAP_API_URL}/search?format=json&q=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setError("Failed to fetch suggestions. Please try again.");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [value]
  );

  useEffect(() => {
    if (debouncedQuery && isFocused) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, fetchSuggestions, isFocused]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onChange(newQuery);
  };

  const handleSelect = (suggestion) => {
    const selectedLocation = suggestion.display_name;
    setQuery(selectedLocation);
    onSelect(suggestion);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="relative">
      <label className="block mb-1 font-medium text-sm">{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className="w-full p-2 border border-black border-1 rounded"
        placeholder="Search for a location"
      />
      {isLoading && (
        <div className="absolute z-10 bg-white p-2">Loading...</div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {query && suggestions.length > 0 && (
        <ul
          id="suggestions-list"
          className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              <button
                onClick={() => handleSelect(suggestion)}
                className="w-full text-left"
              >
                {suggestion.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

LocationAutocomplete.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default LocationAutocomplete;
