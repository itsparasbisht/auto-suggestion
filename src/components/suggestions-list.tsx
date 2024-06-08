export default function SuggestionsList({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
}) {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b style={{ color: "red" }}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li key={index} onClick={() => onSuggestionClick(suggestion)}>
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
}
