import { useEffect, useState } from "react";
import SuggestionsList from "./suggestions-list";

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
    console.log(fetchSuggestions, staticData);
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

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggestionClick = () => {};

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
