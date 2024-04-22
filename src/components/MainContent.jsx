export default function MainContent() {
  return (
    <div className="font-nunito flex flex-col items-center gap-1 mt-48">
      <p className="text-heading-md md:text-heading-lg text-base-100">
        Welcome to <span className="text-product">TypeWeather</span>
      </p>
      <p className="text-sm text-base-200 md:text-md">
        Choose a location to see the weather forecast
      </p>
    </div>
  );
}
