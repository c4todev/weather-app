import PropTypes from "prop-types";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

export default function Hourly({
  hourly,
  weatherPage,
  sunriseTime,
  sunsetTime,
  currentTimeZone,
  currentTimeZoneOffset,
}) {
  const [citySunriseTime, setCitySunriseTime] = useState(null);
  const [citySunsetTime, setCitySunsetTime] = useState(null);
  useEffect(() => {
    const sunriseMoment = moment.tz(sunriseTime, "HH:mm", currentTimeZone);
    const sunsetMoment = moment.tz(sunsetTime, "HH:mm", currentTimeZone);
    setCitySunriseTime(sunriseMoment);
    setCitySunsetTime(sunsetMoment);
  }, [sunriseTime, sunsetTime, currentTimeZone]);

  useEffect(() => {
    const sunriseMoment = moment.tz(sunriseTime, "HH:mm", currentTimeZone);
    const sunsetMoment = moment.tz(sunsetTime, "HH:mm", currentTimeZone);
    setCitySunriseTime(sunriseMoment);
    setCitySunsetTime(sunsetMoment);
  }, [sunriseTime, sunsetTime, currentTimeZone]);

  if (!weatherPage || !hourly || !citySunriseTime || !citySunsetTime)
    return null;

  const convertTimezone = (dt, currentTimeZoneOffset, index) => {
    if (index === 0) {
      return "Now";
    }

    const targetLocalTime = moment
      .unix(dt)
      .utc()
      .add(currentTimeZoneOffset, "seconds");

    return targetLocalTime.format("HH:mm");
  };

  return (
    <div className="bg-base-800 bg-cover rounded-lg py-[17px] flex items-center overflow-x-scroll hide-scrollbar ">
      {hourly.slice(0, 25).map((hour, index) => {
        const { weather, temp } = hour;
        const displayTime = convertTimezone(
          hour.dt,
          currentTimeZoneOffset,
          index
        );

        const targetLocalTime = moment
          .unix(hour.dt)
          .utc()
          .add(currentTimeZoneOffset, "seconds");
        const cityHour = targetLocalTime.hour();

        let weatherImg;
        if (
          cityHour >= citySunriseTime.hour() &&
          cityHour < citySunsetTime.hour()
        ) {
          // Gündüz saati
          weatherImg = weather[0].main.toLocaleLowerCase() + "-day";
        } else {
          // Gece saati
          weatherImg = weather[0].main.toLocaleLowerCase() + "-night";
        }

        const imgSrc = `${weatherImg}.svg`;
        return (
          <div
            key={index}
            className={`border-gradient-left first:border-none hide-scrollbar scroll-smooth`}
          >
            <div
              className={`items-center px-5 flex flex-col bg-cover bg-center bg-no-repeat rounded lg:px-8`}
            >
              <p className="text-base-100 text-heading-sm text-nowrap">
                {displayTime}
              </p>
              <img className="h-10 max-w-10" src={imgSrc} alt="Weather Icon" />
              <p className="text-base-100 text-sm">{temp.toFixed()}ºc</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Hourly.propTypes = {
  hourly: PropTypes.arrayOf(
    PropTypes.shape({
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          main: PropTypes.string.isRequired,
        })
      ).isRequired,
      temp: PropTypes.number.isRequired,
      dt: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentTimeZone: PropTypes.string.isRequired,
  currentTimeZoneOffset: PropTypes.number.isRequired,
  weatherPage: PropTypes.bool.isRequired,
  sunriseTime: PropTypes.string,
  sunsetTime: PropTypes.string,
};
