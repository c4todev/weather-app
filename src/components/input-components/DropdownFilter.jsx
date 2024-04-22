import { SpinnerGap } from "@phosphor-icons/react";
import PropTypes from "prop-types";

export default function DropdownFilter({
  result,
  value,
  fetchWeather,
  debouncedInput,
  setValue,
  setDropdown,
}) {
  return (
    <div className="rounded-lg bg-base-500 mt-2 font-nunito flex flex-col justify-center absolute top-[58px] left-0 mx-8 right-0 shadow-lg z-10">
      {value && !debouncedInput ? (
        <div className="w-full border-b last:border-none border-[#1e1e29] px-5 py-[17px] flex justify-center items-center">
          <SpinnerGap size={24} className={`text-product animate-spin`} />
        </div>
      ) : value && debouncedInput ? (
        result.slice(0, 5).map((item, id) => {
          const { city, iso2 } = item;
          return (
            <a
              onClick={() => {
                setValue(`${item.city}, ${item.iso2}`);
                fetchWeather(`${item.city}, ${item.iso2}`);
                setDropdown(false);
              }}
              className="w-full border-b last:border-none border-[#1e1e29] px-5 py-[17px] cursor-pointer"
              key={id}
            >
              <span className="text-base-100 text-md">
                {city}, {iso2}
              </span>
            </a>
          );
        })
      ) : null}
    </div>
  );
}

DropdownFilter.propTypes = {
  result: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  fetchWeather: PropTypes.func.isRequired,
  setDropdown: PropTypes.func.isRequired,
  debouncedInput: PropTypes.string.isRequired,
};
