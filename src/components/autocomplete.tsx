import { useCallback, useEffect, useState } from "react";
import SuggestionsList from "./suggestions-list";
import debounce from "lodash/debounce";

export default function Autocomplete({
  placeholder,
  staticData,
  fetchSuggestions,
  dataKey,
  customLoader,
  onChange,
  onSelect,
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }

      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  console.log(">>>", suggestions);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
      />

      {error && <p>{error}</p>}

      {loading && <div>{customLoader}</div>}

      <ul>
        <SuggestionsList
          dataKey={dataKey}
          highlight={inputValue}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      </ul>
    </div>
  );
}
