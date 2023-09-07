import React, { useState } from "react";
import "./Search.css";
const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchValue);
      setSearchValue("");
    }
  };

  return (
    <div className="wrapper-search">
      <div className="right-item-search">
        <input
          type="text"
          placeholder="Search"
          className="search-box"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Search;
