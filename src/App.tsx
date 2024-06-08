import "./App.css";
import Autocomplete from "./components/autocomplete";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };

  const staticData = ["apple", "banana"];

  return (
    <div>
      <h1>Autocomplete/Typeahead</h1>
      <Autocomplete
        placeholder={"Enter recipe"}
        staticData={null}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoader={<div>loading...</div>}
        onChange={(input) => console.log(input)}
        onSelect={(suggestion) => console.log(suggestion)}
      />
    </div>
  );
}

export default App;
