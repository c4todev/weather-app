import Input from "./input-components/Input";
import MainContent from "./MainContent";
import Logo from "./Logo";
import { easeInOut, motion } from "framer-motion";
import LocationCards from "./location-components/LocationCards";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export default function Main({
  loading,
  value,
  weatherPage,
  citiesArray,
  currentHourly,
  setValue,
  setHourly,
  setLoading,
  setForecast,
  setCitiesArray,
  setWeatherPage,
  setCurrentHourly,
  setCurrentWeather,
  setCurrentTimeZone,
  setCurrentTimeZoneOffset,
}) {
  const [error, setError] = useState(null);
  const [errorPopup, setErrorPopup] = useState(false);

  const fetchWeather = async (value) => {
    try {
      if (!value) {
        throw new Error("City name is required.");
      }
      setLoading(true);
      const cityCoordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`;
      const response = await axios.get(cityCoordURL);
      setValue(`${response.data[0].name}, ${response.data[0].country}`);
      const latitude = response.data[0]?.lat;
      const longitude = response.data[0]?.lon;
      if (latitude && longitude) {
        const fetchWeatherDataURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const weatherResponse = await axios.get(fetchWeatherDataURL);
        const timeZoneOffset = weatherResponse.data.timezone_offset;
        const timeZone = weatherResponse.data.timezone;
        setCurrentTimeZone(timeZone);
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
      setError("Failed to retrieve city location.");

      setErrorPopup(true);
      setLoading(false);
    }
  };

  const ErrorPopup = (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{
        y: errorPopup ? 0 : "-100%",
        opacity: errorPopup ? "100%" : 0,
      }}
      transition={{ duration: 0.7, ease: easeInOut }}
      className="flex flex-col items-center font-nunito gap-5 px-5 bg-base-500 py-[17px] rounded-xl"
    >
      <div className="w-full flex flex-col justify-center md:gap-1">
        <p className="text-base-100 text-heading-sm md:text-heading-md text-wrap lg:max-w-md text-center">
          {error}
        </p>
        <p className="text-sm md:text-md text-base-100">
          Please check your city name and try again.
        </p>
      </div>
      <div
        onClick={() => setErrorPopup(false)}
        className="bg-product flex items-center justify-center rounded-lg px-5 cursor-pointer w-full md:w-1/3"
      >
        <button className="text-base-600 text-heading-sm h-10 text-center whitespace-nowrap">
          Try Again
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="h-screen w-screen absolute hide-scrollbar overflow-hidden overflow-x-hidden overflow-y-hidden">
      {errorPopup && (
        <div className="absolute w-full z-20 flex justify-center items-center h-screen px-8">
          {ErrorPopup}
        </div>
      )}

      <motion.div
        className={`flex flex-col ${errorPopup ? "opacity-30" : "opacity-100"}`}
        initial={{ x: 0 }}
        animate={{
          x: weatherPage ? "-100%" : 0,
        }}
        transition={{ duration: 0.7, ease: easeInOut }}
      >
        <Logo />
        <MainContent />
        <Input
          value={value}
          loading={loading}
          setError={setError}
          fetchWeather={fetchWeather}
          currentHourly={currentHourly}
          setCurrentTimeZone={setCurrentTimeZone}
          setValue={setValue}
          setHourly={setHourly}
          setLoading={setLoading}
          setForecast={setForecast}
          setWeatherPage={setWeatherPage}
          setCurrentHourly={setCurrentHourly}
          setCurrentWeather={setCurrentWeather}
          setCurrentTimeZoneOffset={setCurrentTimeZoneOffset}
        />
        <div className="flex flex-col items-center w-full mt-4">
          <p className="font-nunito text-heading-sm text-base-100 md:text-heading-md">
            Saved Locations
          </p>
          <LocationCards
            fetchWeather={fetchWeather}
            citiesArray={citiesArray}
            setCitiesArray={setCitiesArray}
            currentHourly={currentHourly}
          />
        </div>
      </motion.div>
    </div>
  );
}

Main.propTypes = {
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  weatherPage: PropTypes.bool.isRequired,
  citiesArray: PropTypes.array.isRequired,
  currentTimeZoneOffset: PropTypes.number.isRequired,
  currentHourly: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  setHourly: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setForecast: PropTypes.func.isRequired,
  setWeatherPage: PropTypes.func.isRequired,
  setCitiesArray: PropTypes.func.isRequired,
  setCurrentHourly: PropTypes.func.isRequired,
  setCurrentWeather: PropTypes.func.isRequired,
  setCurrentTimeZone: PropTypes.func.isRequired,
  setCurrentTimeZoneOffset: PropTypes.func.isRequired,
};
