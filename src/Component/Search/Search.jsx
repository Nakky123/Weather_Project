import React, { useState, useEffect } from "react";
import "./Search.css";
import Select from "react-select";
import axios from "axios";

const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchValue.length >= 3) {
      setLoading(true);

      // Make a request to the remote API to fetch city data
      axios
        .get("https://lenghub1.github.io/host_api/cityname_data.json")
        .then((response) => {
          const cityData = response.data;
          const options = cityData.map((city) => ({
            label: city.name,
            value: city.name,
          }));

          // Filter city options based on the search input
          const filteredOptions = options.filter(
            (option) =>
              option.label.toLowerCase().includes(searchValue.toLowerCase()) &&
              searchValue.length >= 3
          );
          setFilteredCities(filteredOptions);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data from the remote API", error);
          setLoading(false);
        });
    } else {
      setFilteredCities([]);
    }
  }, [searchValue]);

  const handleInputChange = (inputValue) => {
    setSearchValue(inputValue);
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
        isLoading={loading}
      />
    </div>
  );
};

export default Search;
