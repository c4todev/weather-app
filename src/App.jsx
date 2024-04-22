import { useState } from "react";
import LocationPage from "./components/location-components/LocationPage";
import Main from "./components/Main";
import { AnimatePresence } from "framer-motion";

function App() {
  const [value, setValue] = useState(""); // Kullanıcının arama değeri
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [weatherPage, setWeatherPage] = useState(false); // Hava durumu sayfasının görünürlüğü
  const [currentWeather, setCurrentWeather] = useState(null); // Şu anki hava durumu
  const [currentHourly, setCurrentHourly] = useState(null); // Şu anki saatlik hava durumu
  const [forecast, setForecast] = useState(null); // Hava durumu tahmini
  const [hourly, setHourly] = useState(null); // Saatlik hava durumu
  const [currentTimeZoneOffset, setCurrentTimeZoneOffset] = useState(0); // Aranan değerden gelen timezone_offset
  const [currentTimeZone, setCurrentTimeZone] = useState("");
  const keyNames = Object.keys(localStorage); // LocalStorage'daki anahtarlar (şehir isimleri)
  const [citiesArray, setCitiesArray] = useState(
    keyNames.map((key) => ({
      name: key,
      data: JSON.parse(localStorage.getItem(key)),
    }))
  ); // Kaydedilmiş şehirlerin listesi

  return (
    <div className="h-screen w-screen overflow-x-hidden flex items-center bg-base-900 bg-pattern bg-center bg-cover bg-no-repeat sm:bg-contain sm:bg-center hide-scrollbar">
      <Main
        loading={loading}
        value={value}
        citiesArray={citiesArray}
        weatherPage={weatherPage}
        currentHourly={currentHourly}
        setCurrentTimeZone={setCurrentTimeZone}
        currentTimeZoneOffset={currentTimeZoneOffset}
        setValue={setValue}
        setHourly={setHourly}
        setLoading={setLoading}
        setForecast={setForecast}
        setCitiesArray={setCitiesArray}
        setWeatherPage={setWeatherPage}
        setCurrentHourly={setCurrentHourly}
        setCurrentWeather={setCurrentWeather}
        setCurrentTimeZoneOffset={setCurrentTimeZoneOffset}
      />
      <AnimatePresence>
        {weatherPage && (
          <LocationPage
            value={value}
            hourly={hourly}
            forecast={forecast}
            weatherPage={weatherPage}
            currentHourly={currentHourly}
            currentWeather={currentWeather}
            currentTimeZoneOffset={currentTimeZoneOffset}
            setValue={setValue}
            setWeatherPage={setWeatherPage}
            setCitiesArray={setCitiesArray}
            currentTimeZone={currentTimeZone}
            setCurrentTimeZone={setCurrentTimeZone}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
