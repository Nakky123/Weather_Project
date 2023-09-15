import React, { useState } from "react";
import "./Search.css";
import cityData from "../../../city_data.json";
import Select from "react-select";

const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const options = cityData.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  const handleInputChange = (inputValue) => {
    setSearchValue(inputValue);

    // Filter city options based on the search input
    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        inputValue.length >= 3
    );
    setFilteredCities(filteredOptions);
  };

  const handleCitySelect = (selectedOption) => {
    setSearchValue(selectedOption.label);
    onSearch(selectedOption.label);
  };

  return (
    <div className="search-box">
      <Select
        options={filteredCities}
        value={searchValue}
        onInputChange={handleInputChange}
        onChange={handleCitySelect}
        placeholder="Search for a city"
        isSearchable
      />
    </div>
  );
};

export default Search;
