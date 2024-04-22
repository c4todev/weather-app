import { Trash } from "@phosphor-icons/react";
import PropTypes from "prop-types";

export default function LocationCards({
  fetchWeather,
  citiesArray,
  setCitiesArray,
}) {
  const handleRemove = (name) => {
    localStorage.removeItem(name);
    setCitiesArray((prevCitiesArray) =>
      prevCitiesArray.filter((city) => city.name !== name)
    );
  };

  return (
    <ul
      className={`flex flex-col gap-2.5 px-8 mt-2 font-nunito cursor-pointer justify-center z-0 w-full md:max-w-screen-md`}
    >
      {citiesArray.map((city, id) => {
        const weatherSvg = city.data.weatherImg;
        const handleSaveCityFetch = () => {
          fetchWeather(city.name);
        };
        return (
          <li
            className={`flex flex-row items-center rounded-lg ${city.data.bgImage} relative`}
            key={id}
          >
            <div
              onClick={handleSaveCityFetch}
              className="flex items-center w-full justify-between px-5 h-[58px]"
            >
              <p className="text-base-100 text-heading-sm">{city.name}</p>
              <div className="flex items-center gap-1">
                <p className="text-base-100 text-heading-sm">
                  {city.data.day_temp}ºc
                </p>
                <img className="w-10" src={weatherSvg} />
              </div>
            </div>
            <div
              onClick={() => handleRemove(city.name)}
              className="flex items-center px-5"
            >
              <Trash
                className="text-base-200 hover:text-red-600 cursor-pointer"
                size={24}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

LocationCards.propTypes = {
  fetchWeather: PropTypes.func.isRequired,
  citiesArray: PropTypes.array.isRequired,
  setCitiesArray: PropTypes.func.isRequired,
};
