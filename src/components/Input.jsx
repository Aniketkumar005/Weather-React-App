
import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";


export default function Input({ setQuery, setUnits }) {
  const [city, setCity] = useState("");
  const [units, setSelectedUnits] = useState("metric"); // Track active unit

  const handleSearchClick = () => {
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setQuery({ lat: latitude, lon: longitude });
        },
        (error) => {
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleUnitChange = (unit) => {
    setSelectedUnits(unit);
    setUnits(unit);
  };

  return (

    <div className="flex flex-col md:flex-row justify-center items-center my-8 mt-12 gap-4">
  <div className="flex flex-row w-full md:w-3/4 items-center justify-center space-x-4">
    <input
      value={city}
      onChange={(e) => setCity(e.currentTarget.value)}
      type="text"
      placeholder="Search for city...."
      className="text-gray-500 text-sm md:text-xl font-light rounded-3xl p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
    />
    <BiSearch
      size={40}
      className="cursor-pointer transition ease-out hover:scale-125"
      onClick={handleSearchClick}
    />
    <BiCurrentLocation
      size={40}
      className="cursor-pointer transition ease-out hover:scale-125"
      onClick={handleLocationClick}
    />
  </div>

  <div className="flex flex-row w-full md:w-1/4 items-center justify-center gap-2">
    <button
          className={`text-lg md:text-2xl font-semibold transition ease-out hover:scale-125 ${
            units === "metric" ? "text-blue-500" : ""
          }`}
          onClick={() => handleUnitChange("metric")}
        >
          °C
        </button>
    <p className="text-lg md:text-2xl font-medium">|</p>
    <button
          className={`text-lg md:text-2xl font-semibold transition ease-out hover:scale-125 ${
            units === "imperial" ? "text-red-500" : ""
          }`}
          onClick={() => handleUnitChange("imperial")}
        >
          °F
        </button>
  </div>
</div>

    
  );
}





