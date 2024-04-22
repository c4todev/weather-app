import {
  ThermometerSimple,
  SunDim,
  CloudRain,
  Wind,
  Drop,
  ArrowLeft,
  Plus,
  Check,
} from "@phosphor-icons/react";
import "../../index.css";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";
import { useEffect, useState } from "react";
import Hourly from "./Hourly";
import PropTypes from "prop-types";
import moment from "moment-timezone";

export default function LocationPage({
  value,
  hourly,
  forecast,
  weatherPage,
  currentHourly,
  currentWeather,
  currentTimeZoneOffset,
  setValue,
  setCitiesArray,
  setWeatherPage,
  setCurrentTimeZoneOffset,
  currentTimeZone,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [citySunriseTime, setCitySunriseTime] = useState(null);
  const [citySunsetTime, setCitySunsetTime] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(value));

    if (savedData) {
      setIsSaved(savedData.isSaved);
    }
  }, [value]);

  useEffect(() => {
    if (currentWeather) {
      const sunriseMoment = moment
        .unix(currentWeather.sunrise)
        .tz(currentTimeZone)
        .format("HH:mm");
      const sunsetMoment = moment
        .unix(currentWeather.sunset)
        .tz(currentTimeZone)
        .format("HH:mm");

      setCitySunriseTime(sunriseMoment);
      setCitySunsetTime(sunsetMoment);
    }
  }, [currentWeather, currentTimeZone]);

  if (!weatherPage || !currentWeather || !currentHourly) return null;

  const { max, min } = currentWeather.temp;

  const { dt } = hourly[0];
  const hourlyDtime = new Date(dt * 1000);
  const localTimeOptions = {
    hour: "2-digit",
    hour12: false,
  };
  const currentLocalTime = hourlyDtime
    .toLocaleTimeString([], localTimeOptions)
    .split(":")[0];
  const dtime = new Date(currentWeather.dt * 1000);
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  const weatherDate = dtime.toLocaleDateString([], options);

  let dayOrNight;
  if (
    currentLocalTime >= citySunriseTime &&
    currentLocalTime < citySunsetTime
  ) {
    // (sunrise to sunset)
    dayOrNight = "day";
  } else {
    // (sunset to sunrise)
    dayOrNight = "night";
  }

  const sunriseTime = citySunriseTime;
  const sunsetTime = citySunsetTime;

  const minMaxTemp = `${max.toFixed()}ºc / ${min.toFixed()}ºc`;
  const weatherDesc = `${
    currentHourly.weather[0].description.charAt(0).toUpperCase() +
    currentHourly.weather[0].description.slice(1)
  }`;
  const humidity = currentHourly.humidity;
  const feelsLikeTemperature = currentHourly.feels_like.toFixed();
  const rain = (currentHourly.pop * 100).toFixed();
  const windSpeed = currentHourly.wind_speed.toFixed();
  const uv = currentHourly.uvi.toFixed();
  const currentImg = `/${currentHourly.weather[0].main.toLowerCase()}-${dayOrNight}.svg`;
  const temp = currentHourly.temp.toFixed();
  const weatherImg = currentHourly.weather[0].main.replace(/ /g, "");
  const bgImage = `${weatherImg.toLowerCase()}${dayOrNight}`;

  const handleSaveWeather = () => {
    const savedCityWeather = {
      day_temp: currentWeather.temp.day.toFixed(),
      weatherImg: `/${currentWeather.weather[0].main.toLowerCase()}-day.svg`,
      bgImage: bgImage,
      isSaved: true,
    };

    setCitiesArray((prevCitiesArray) => [
      ...prevCitiesArray,
      { name: value, data: savedCityWeather },
    ]);

    localStorage.setItem(value, JSON.stringify(savedCityWeather));
    setIsSaved(true);
  };

  return (
    <motion.div
      className="bg-base-900 font-nunito p-2 w-screen h-screen relative"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.7, ease: easeInOut }}
    >
      <div className="bg-base-800 w-full p-3 rounded-xl">
        <div
          className={`${bgImage} bg-cover bg-no-repeat rounded-lg flex flex-col justify-center gap-16`}
        >
          <div className="flex justify-between items-center px-5 w-full">
            <ArrowLeft
              onClick={() => {
                setValue("");
                setWeatherPage(false);
              }}
              size={24}
              className="text-base-100 cursor-pointer"
            />
            <div className="text-base-100 flex flex-col gap-0.5 p-4 items-center">
              <p className="text-heading-sm">{value}</p>
              <p className="text-xs">{weatherDate}</p>
            </div>
            <div className=" w-6 h-6 relative">
              {isSaved ? (
                <Check size={24} className="z-0 absolute text-green-400" />
              ) : (
                <Plus
                  size={24}
                  className="z-0 absolute text-base-100 cursor-pointer"
                  onClick={handleSaveWeather}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 self-end p-5">
              <div>
                <p className="text-heading-xl text-base-100">{temp}ºc</p>
              </div>
              <div>
                <p className="text-base-100 text-heading-sm">{minMaxTemp}</p>
                <p className="text-base-100 text-sm">{weatherDesc}</p>
              </div>
            </div>
            <div className="flex">
              <img src={currentImg} className="animate-pulse w-40 h-40" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-800 rounded-xl p-3 w-full mt-2">
        <Hourly
          hourly={hourly}
          weatherPage={weatherPage}
          sunriseTime={sunriseTime}
          sunsetTime={sunsetTime}
          currentTimeZone={currentTimeZone}
          currentTimeZoneOffset={currentTimeZoneOffset}
          setCurrentTimeZoneOffset={setCurrentTimeZoneOffset}
        />
      </div>
      <div className="bg-base-800 px-4 rounded-xl mt-2 flex flex-col justify-center">
        <div className="flex items-center justify-between border-b border-base-700 py-4">
          <div className="flex gap-3 items-center">
            <ThermometerSimple size={24} className="text-base-500" />
            <p className="text-base-200 text-hedaing-xs">Thermal sensation</p>
          </div>
          <div>
            <p className="text-base-100 text-heading-sm">
              {feelsLikeTemperature}ºc
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-base-700 py-4">
          <div className="flex gap-3 items-center">
            <CloudRain size={24} className="text-base-500" />
            <p className="text-base-200 text-heading-xs">Probability of rain</p>
          </div>
          <div>
            <p className="text-base-100 text-heading-sm">{rain}%</p>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-base-700 py-4">
          <div className="flex gap-3 items-center">
            <Wind size={24} className="text-base-500" />
            <p className="text-base-200 text-heading-xs">Wind speed</p>
          </div>
          <div>
            <p className="text-base-100 text-heading-sm">{windSpeed} km/h</p>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-base-700 py-4">
          <div className="flex gap-3 items-center">
            <Drop size={24} className="text-base-500" />
            <p className="text-base-200 text-heading-xs">Air humidity</p>
          </div>
          <div>
            <p className="text-base-100 text-heading-sm">{humidity}%</p>
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-3 items-center">
            <SunDim size={24} className="text-base-500" />
            <p className="text-base-200 text-heading-xs">UV Index</p>
          </div>
          <div>
            <p className="text-base-100 text-heading-sm ">{uv}</p>
          </div>
        </div>
      </div>
      <div className="bg-base-800 flex justify-around items-center my-2 p-3 rounded-xl">
        {forecast.slice(1, 6).map((data, index) => {
          const { temp, weather, dt } = data;
          const { max, min } = temp;
          let dayOrNight;
          if (
            currentLocalTime >= sunriseTime &&
            currentLocalTime < sunsetTime
          ) {
            // (sunrise to sunset)
            dayOrNight = "day";
          } else {
            // (sunset to sunrise)
            dayOrNight = "night";
          }
          const iconOfDay = weather[0].main.toLocaleLowerCase();
          const forecastImg = `/${iconOfDay}-${dayOrNight}.svg`;
          const date = new Date(dt * 1000);
          const dayOfWeek = date.toLocaleDateString([], {
            weekday: "long",
          });
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center basis-16"
            >
              <p className="text-base-200 text-heading-xs">
                {dayOfWeek.slice(0, 3)}
              </p>
              <div>
                <div className="flex basis-20 items-center justify-center">
                  <img src={forecastImg} alt="Weather Icon" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-base-100 text-heading-xs">
                    {max.toFixed()}ºc
                  </p>
                  <p className="text-base-400 text-heading-xs">
                    {min.toFixed()}ºc
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

LocationPage.propTypes = {
  currentWeather: PropTypes.shape({
    feels_like: PropTypes.shape({
      morn: PropTypes.number,
      day: PropTypes.number,
      eve: PropTypes.number,
      night: PropTypes.number,
    }),
    temp: PropTypes.shape({
      day: PropTypes.number,
      max: PropTypes.number,
      min: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    pop: PropTypes.number,
    wind_speed: PropTypes.number,
    humidity: PropTypes.number,
    uvi: PropTypes.number,
    dt: PropTypes.number,
    sunrise: PropTypes.number,
    sunset: PropTypes.number,
  }),
  value: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired,
  hourly: PropTypes.array.isRequired,
  weatherPage: PropTypes.bool.isRequired,
  currentHourly: PropTypes.object.isRequired,
  currentTimeZone: PropTypes.string.isRequired,
  currentTimeZoneOffset: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  setWeatherPage: PropTypes.func.isRequired,
  setIsSaved: PropTypes.func,
  setCitiesArray: PropTypes.func.isRequired,
  setCurrentTimeZoneOffset: PropTypes.func,
};
