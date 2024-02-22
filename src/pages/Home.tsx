import { BsCloudsFill, BsSunrise, BsSunset } from 'react-icons/bs';
import { PiWindLight } from 'react-icons/pi';
import { GoSun } from 'react-icons/go';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import IWeather from '../interfaces/IWeather';
import WeatherChart from '../components/WeatherChart';

function Home() {
  const weatherState = useSelector((state: IWeather) => state.weather);
  return (
    <main className="flex justify-center min-h-screen px-6 font-jetbrains">
      <section className="w-full max-w-full-lg p-8">
        <Header />
        <div className="pt-2 flex justify-center h-96 relative">
          <figure className="w-full h-full rounded-xl relative">
            <img
              src={weatherState.cityImage?.urls.full}
              alt="city image"
              className="w-full h-full rounded-xl object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 px-6 py-4">
              <BsCloudsFill
                color="white"
                className="w-10 h-10"
                aria-label="Cloudy Weather Icon"
              />
              <p className="text-white text-8xl">
                {weatherState.currentWeatherData?.temp}°
              </p>
              <p className="text-white text-xl">
                {weatherState.timezone?.cityName}, {''}
                {weatherState.timezone?.regionName}, {''}
                {weatherState.timezone?.countryName}
              </p>
            </figcaption>
            <figcaption className="absolute bottom-0 right-0 px-6 py-4 text-end">
              <p className="text-white text-2xl">Time</p>
              <p className="text-white text-xl font-extrabold">
                {weatherState.timezone?.formatted}
              </p>
            </figcaption>
          </figure>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 w-full">
          <div className="border border-primary-100 rounded-2xl p-4 w-full h-auto pt-8 md:h-60 grid gap-4 grid-cols-2 grid-rows-2">
            <div className="relative flex items-start">
              <PiWindLight className="w-8 h-8 text-primary-200 md:w-12 md:h-12" />
              <div className="flex flex-col pl-4">
                <span className="font-thin">Humidity</span>
                <span className="font-semibold">
                  {weatherState.currentWeatherData?.humidity}%
                </span>
              </div>
            </div>
            <div className="relative flex items-start">
              <BsSunrise className="w-8 h-8 text-primary-200 md:w-12 md:h-12" />
              <div className="flex flex-col pl-4">
                <span className="font-thin">Sunrise</span>
                <span className="font-semibold">
                  {' '}
                  {weatherState.currentWeatherData?.sunrise} am
                </span>
              </div>
            </div>
            <div className="relative flex items-start">
              <GoSun className="w-8 h-8 text-primary-200 md:w-12 md:h-12" />
              <div className="flex flex-col pl-4">
                <span className="font-thin">UV index</span>
                <span className="font-semibold">
                  {' '}
                  {weatherState.uv?.uv} Of 10
                </span>
              </div>
            </div>
            <div className="relative flex items-start">
              <BsSunset className="w-8 h-8 text-primary-200 md:w-12 md:h-12" />
              <div className="flex flex-col pl-4">
                <span className="font-thin">Sunset</span>
                <span className="font-semibold">
                  {' '}
                  {weatherState.currentWeatherData?.sunset} pm
                </span>
              </div>
            </div>
          </div>
          <div className="border  border-primary-100 rounded-2xl w-full h-full p-5 col-span-1 row-span-2 md:col-span-2">
            {weatherState.forecastWeatherData ? (
              <WeatherChart weatherData={weatherState.forecastWeatherData} />
            ) : (
              <p>chart</p>
            )}
            <div className="flex flex-row justify-between text-sm px-4 pt-4">
              {weatherState.forecastWeatherData?.map((day) => (
                <div key={day.dt} className="flex flex-col items-center">
                  <span>{day.dt}</span>
                  <img
                    src={day.icon}
                    alt=""
                    className='"text-center w-12 h-12 pt-2 text-primary-200"'
                  />
                  <span className="text-xl font-semibold text-center">
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
