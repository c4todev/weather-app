import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

export async function citySearch(value) {
  if (!value) return [];
  try {
    const response = await axios.get(apiURL);
    const data = response.data.data;
    const allCities = data
      .map((country) =>
        country.cities.map((city) => ({
          city: city.normalize("NFC"),
          iso2: country.iso2.normalize("NFC"),
        }))
      )
      .flat();

    const replacedValue = replaceCharacters(value);

    const filteredCities = allCities.filter((item) => {
      const replacedCity = replaceCharacters(item.city);
      const replacedIso2 = replaceCharacters(item.iso2);
      return (
        replacedCity.includes(replacedValue) ||
        replacedIso2.includes(replacedValue)
      );
    });

    return filteredCities;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function replaceCharacters(str) {
  return str
    .replace(/i/g, "ı")
    .replace(/ı/g, "i")
    .replace(/I/g, "İ")
    .replace(/İ/g, "i")
    .toLowerCase();
}
