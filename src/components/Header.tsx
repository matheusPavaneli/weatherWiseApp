import { FaSearch } from 'react-icons/fa';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { weatherDataRequest } from '../features/weatherSlice';
import IReceivedPayload from '../interfaces/IReceivedPayload';
import IWeather from '../interfaces/IWeather';
import normalizeString from '../utils/normalizeString';

function Header() {
  const weatherState = useSelector((state: IWeather) => state.weather);
  const dispatch = useDispatch();
  const [unitsSystem, setUnitsSystem] = useState('metric');
  const [language, setLanguage] = useState('en');
  const [city, setCity] = useState('');
  const [lastRequested, setLastRequested] = useState({
    cityName: '',
    unitsSystem: '',
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference
      ? savedPreference === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const fetchData = async () => {
      const browserLanguage = navigator.language;
      setLanguage(browserLanguage.startsWith('pt') ? 'pt_br' : 'en');
    };

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('darkMode', darkMode.toString());

    fetchData();
  }, [language, darkMode, city, dispatch, unitsSystem]);

  const toggleUnitsSystem = () => {
    setUnitsSystem((prevSystem) =>
      prevSystem === 'metric' ? 'imperial' : 'metric',
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!city) return;

    const normalizedCurrentCity = normalizeString(
      weatherState.timezone?.cityName || '',
    );
    // Verifica se tanto a cidade quanto o sistema de unidades são iguais aos da última requisição
    if (
      city === normalizedCurrentCity &&
      unitsSystem === lastRequested.unitsSystem
    )
      return;

    const payload: IReceivedPayload = {
      cityName: city,
      language,
      unitsSystem,
    };
    dispatch(weatherDataRequest(payload));
    // Atualiza o estado com os dados da última requisição
    setLastRequested({ cityName: city, unitsSystem });
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-2 text-gray-800 dark:text-white font-jetbrains bg-white dark:bg-gray-800">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-wide mb-4 sm:mb-0 text-primary-100 dark:text-gray-100">
        Weather Wise
      </h1>

      <form
        className="flex items-center w-full sm:w-auto"
        onSubmit={handleSubmit}
        role="search"
      >
        <label htmlFor="search-input" className="sr-only">
          Search city
        </label>
        <div className="relative w-full">
          <input
            id="search-input"
            type="text"
            placeholder="Enter city name..."
            required
            onChange={(e) => setCity(normalizeString(e.target.value))}
            className="py-2 w-full sm:w-80 pl-2 pr-10 text-left font-light rounded-lg focus:outline-none border-primary-100 placeholder-gray-500 dark:placeholder-gray-400 border dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 ease-in-out dark:text-black"
          />
          <button
            type="submit"
            aria-label="Search city"
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-primary-100"
          >
            <FaSearch className="text-primary-100 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          </button>
        </div>
        <button
          type="button"
          onClick={toggleUnitsSystem}
          className="ml-4 text-primary-100 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label={`Switch to ${unitsSystem === 'metric' ? 'Imperial' : 'Metric'} units`}
        >
          {unitsSystem === 'metric' ? 'metric' : 'imperial'}
        </button>
        <button
          type="button"
          className="ml-4"
          aria-label="Toggle theme"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <MdDarkMode className="w-6 h-6 text-primary-100 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          ) : (
            <MdLightMode className="w-6 h-6 text-primary-100 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          )}
        </button>
      </form>
    </header>
  );
}

export default Header;
