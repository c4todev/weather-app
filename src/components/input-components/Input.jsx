import { MapPin, SpinnerGap, XCircle } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { citySearch } from "../autocomplete/citySearch";
import DropdownFilter from "./DropdownFilter";
import axios from "axios";
import PropTypes from "prop-types";

const apiKey = import.meta.env.VITE_API_KEY;

export default function Input({
  value,
  loading,
  fetchWeather,
  setError,
  setValue,
  setHourly,
  setLoading,
  setForecast,
  setWeatherPage,
  setCurrentHourly,
  setCurrentWeather,
  setCurrentTimeZoneOffset,
}) {
  // eslint-disable-next-line no-unused-vars
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [result, setResult] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [debouncedInput] = useDebounce(value, 350);

  const handleChange = async (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue.length > 0) {
      setDropdown(true);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      const filteredCities = await citySearch(debouncedInput);
      setResult(filteredCities);
    };

    fetchCities();
  }, [debouncedInput]);

  useEffect(() => {
    const fetchCities = async () => {
      const filteredCities = await citySearch(debouncedValue);
      setResult(filteredCities);
    };

    fetchCities();
  }, [debouncedValue]);

  const fetchCoordWeather = async (latitude, longitude) => {
    try {
      setLoading(true);
      const cityCoordURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
      const response = await axios.get(cityCoordURL);
      const cityName = `${response.data[0].name}, ${response.data[0].country}`;
      setValue(cityName);
      if (latitude && longitude) {
        const fetchWeatherDataURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const weatherResponse = await axios.get(fetchWeatherDataURL);
        const timeZoneOffset = weatherResponse.data.timezone_offset;
        setCurrentTimeZoneOffset(timeZoneOffset);
        setCurrentWeather(weatherResponse.data.daily[0]);
        const forecastData = weatherResponse.data.daily;
        setForecast(forecastData);
        const hourlyData = weatherResponse.data.hourly;
        setHourly(hourlyData);

        const currentHourlyData = hourlyData[0];
        setCurrentHourly(currentHourlyData);
        setWeatherPage(true);
      } else {
        throw new Error("Failed to retrieve city location.");
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error(error.message);
      setLoading(false);
    }
  };

  const fetchCoords = async () => {
    try {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            await fetchCoordWeather(latitude, longitude);
            setLoading(false);
          },
          () => {
            console.log("Unable to retrieve your location");
            setLoading(false);
          }
        );
      } else {
        console.log("Geolocation not supported");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error getting current location:", error);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather(value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex px-8 mt-8 relative max-w-screen-md w-full"
      >
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-center items-center relative">
            {value ? (
              <XCircle
                className="text-base-400 absolute cursor-pointer right-5"
                size={24}
                onClick={() => setValue("")}
              />
            ) : null}
            <input
              className="py-[17px] px-5 placeholder:text-md placeholder:text-base-400 rounded-lg w-full placeholder:font-nunito bg-[#1e1e29] text-base-100 font-nunito focus:outline-none"
              placeholder="Search location"
              value={value}
              onChange={handleChange}
              minLength={3}
            />
            {loading ? (
              <SpinnerGap
                size={24}
                className={`text-product absolute right-14 animate-spin`}
              />
            ) : null}
            {value ? null : (
              <MapPin
                onClick={() => fetchCoords()}
                size={24}
                className="text-base-400 absolute right-5 cursor-pointer"
              />
            )}
          </div>
          {dropdown && (
            <DropdownFilter
              result={result}
              value={value}
              fetchWeather={fetchWeather}
              debouncedInput={debouncedInput}
              setDropdown={setDropdown}
              setValue={setValue}
            />
          )}
        </div>
      </form>
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchWeather: PropTypes.func.isRequired,
  setWeatherPage: PropTypes.func.isRequired,
  setCurrentWeather: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setForecast: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setHourly: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setCurrentHourly: PropTypes.func.isRequired,
  setCurrentTimeZoneOffset: PropTypes.func,
};
