import { BsCloudsFill, BsSunrise, BsSunset } from 'react-icons/bs';
import { PiWindLight } from 'react-icons/pi';
import { GoSun } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import Header from '../components/Header';
import defaultImage from '../assets/default_image.jpg';
import IWeather from '../interfaces/IWeather';
import WeatherChart from '../components/WeatherChart';

function Home() {
  const weatherState = useSelector((state: IWeather) => state.weather);

  if (!weatherState.currentWeatherData) {
    return (
      <main className="flex justify-center min-h-screen px-4 sm:px-6 lg:px-8 font-jetbrains bg-white dark:bg-gray-800">
        <section className="w-full max-w-6xl p-4 md:p-8 bg-white dark:bg-gray-800 rounded-lg">
          <Header />
          <div className="flex justify-center items-center h-screen">
            <div className="text-center text-black dark:text-white">
              {weatherState.isLoading ? (
                <AiOutlineLoading3Quarters className="text-6xl animate-spin text-primary-100 dark:text-white" />
              ) : (
                <p className="text-primary-100 dark:text-white">
                  Waiting for a city to arrive <br />
                  (◕‿◕)
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex justify-center min-h-screen px-4 sm:px-6 lg:px-8 font-jetbrains bg-white dark:bg-gray-800">
      <section className="w-full max-w-6xl p-4 md:p-8 bg-white dark:bg-gray-800 rounded-lg">
        <Header />
        <div className="pt-2 flex justify-center relative">
          <figure className="w-full h-96 rounded-xl overflow-hidden relative">
            <img
              src={
                weatherState.cityImage &&
                weatherState.cityImage.urls &&
                weatherState.cityImage.urls.full
                  ? weatherState.cityImage.urls.full
                  : defaultImage
              }
              alt="city image"
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 px-6 py-4">
              <div className="flex items-center">
                <BsCloudsFill
                  color="white"
                  className="w-10 h-10"
                  aria-label="Cloudy Weather Icon"
                />
                <p className="text-white text-sm md:text-base lg:text-lg pl-3">
                  {weatherState.currentWeatherData?.description}
                </p>
              </div>

              <p className="text-white text-3xl md:text-4xl lg:text-6xl">
                {weatherState.currentWeatherData?.temp}°
              </p>
              <p className="text-white text-sm md:text-base lg:text-lg">
                {weatherState.timezone?.cityName}, {''}
                {weatherState.timezone?.regionName}, {''}
                {weatherState.timezone?.countryName}
              </p>
            </figcaption>
            <figcaption className="absolute bottom-0 right-0 px-6 py-4 text-end">
              <p className="text-white text-lg md:text-xl lg:text-2xl">Time</p>
              <p className="text-white text-base md:text-lg lg:text-xl font-bold">
                {weatherState.timezone?.formatted}
              </p>
            </figcaption>
          </figure>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="info-box border h-auto lg:h-52 border-primary-100 rounded-2xl p-4 flex flex-wrap justify-between items-center bg-white dark:bg-gray-800 dark:border-white">
            <div className="w-full lg:w-1/2 p-2 flex items-center">
              <PiWindLight className="w-8 h-8 text-primary-200 dark:text-white" />
              <div className="ml-2">
                <span className="block font-thin text-gray-600 dark:text-white">
                  Humidity
                </span>
                <span className="block font-semibold dark:text-white">
                  {weatherState.currentWeatherData?.humidity}%
                </span>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-2 flex items-center">
              <BsSunrise className="w-8 h-8 text-primary-200 dark:text-white" />
              <div className="ml-2">
                <span className="block font-thin text-gray-600 dark:text-white">
                  Sunrise
                </span>
                <span className="block font-semibold dark:text-white">
                  {weatherState.currentWeatherData?.sunrise} am
                </span>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-2 flex items-center">
              <GoSun className="w-8 h-8 text-primary-200 dark:text-white" />
              <div className="ml-2">
                <span className="block font-thin text-gray-600 dark:text-white">
                  UV index
                </span>
                <span className="block font-semibold dark:text-white">
                  {weatherState.uv?.uv} of 10
                </span>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-2 flex items-center">
              <BsSunset className="w-8 h-8 text-primary-200 dark:text-white" />
              <div className="ml-2">
                <span className="block font-thin text-gray-600 dark:text-white">
                  Sunset
                </span>
                <span className="block font-semibold dark:text-white">
                  {weatherState.currentWeatherData?.sunset} pm
                </span>
              </div>
            </div>
          </div>

          <div className="forecast-chart border border-primary-100 rounded-2xl w-full h-full p-4 md:p-6 col-span-1 md:col-span-2 flex flex-col bg-white dark:bg-gray-800 dark:border-white">
            {weatherState.forecastWeatherData ? (
              <WeatherChart weatherData={weatherState.forecastWeatherData} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p>No forecast data available</p>
              </div>
            )}
            <div className="flex flex-row justify-between text-sm px-4 pt-4">
              {weatherState.forecastWeatherData?.map((day) => (
                <div key={day.dt} className="flex flex-col items-center">
                  <span className="dark:text-white">{day.dt}</span>
                  <img
                    src={day.icon}
                    alt=""
                    className='"text-center w-12 h-12 pt-2 text-primary-200"'
                  />
                  <span className="dark:text-white text-xl font-semibold text-center">
                    {day.temp}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
