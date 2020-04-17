import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { emojis } from "./emoji";

function App() {
  const [search, setSearch] = useState("");
  const copyToClipboard = (emoji: string) => () => {
    navigator.clipboard.writeText(emoji);
  };

  const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="search"
          value={search}
          onChange={onSearch}
          autoFocus
        />
      </div>
      <div className="emojis">
        {emojis
          .filter((emoji) => search === "" || emoji.name.match(search))
          .map((emoji) => (
            <span onClick={copyToClipboard(emoji.emoji)} className="emoji">
              {emoji.emoji}
            </span>
          ))}
      </div>
    </div>
  );
}

export default App;
