import { FaSearch } from 'react-icons/fa';
import { MdLightMode } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { weatherDataRequest } from '../features/weatherSlice';
import IReceivedPayload from '../interfaces/IReceivedPayload';

function Header() {
  const dispatch = useDispatch();
  const [unitsSystem, setUnitsSystem] = useState('metric');
  const [language, setLanguage] = useState('en');
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const browserLanguage = navigator.language;
      setLanguage(browserLanguage.startsWith('pt') ? 'pt-br' : 'en');
    };

    const payload: IReceivedPayload = {
      cityName: 'Miami',
      language: language,
      unitsSystem: unitsSystem,
    };
    dispatch(weatherDataRequest(payload));

    fetchData();
  }, [dispatch, language, unitsSystem]);
  const toggleUnitsSystem = () => {
    setUnitsSystem((prevSystem) =>
      prevSystem === 'metric' ? 'imperial' : 'metric',
    );
  };

  const HandleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload: IReceivedPayload = {
      cityName: city,
      language: language,
      unitsSystem: unitsSystem,
    };
    dispatch(weatherDataRequest(payload));
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-2 text-primary-100 font-jetbrains">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-wide mb-4 sm:mb-0">
        Weather Wise
      </h1>

      <form className="flex items-center w-full sm:w-auto" role="search">
        <label htmlFor="search-input" className="sr-only">
          Search city
        </label>
        <div className="relative w-full">
          <input
            id="search-input"
            type="text"
            placeholder="Enter city name..."
            required
            onChange={(e) => setCity(e.target.value)}
            className="py-2 w-full sm:w-80 pl-2 pr-10 text-left font-light rounded-lg focus:outline-none placeholder-primary-100 border border-primary-100 focus:border-primary-200 hover:border-primary-200 hover:transition-colors duration-300 ease-in-out"
          />
          <button
            type="submit"
            aria-label="Search city"
            className="absolute top-1/2 transform -translate-y-1/2 right-3"
            onClick={HandleSubmit}
          >
            <FaSearch className="hover:text-primary-200" />
          </button>
        </div>
        <button
          type="button"
          onClick={toggleUnitsSystem}
          className="ml-4"
          aria-label={`Switch to ${unitsSystem === 'metric' ? 'Imperial' : 'Metric'} units`}
        >
          {unitsSystem === 'metric' ? 'metric' : 'imperial'}
        </button>
        <button className="ml-4" aria-label="Toggle light mode">
          <MdLightMode className="w-6 h-6 sm:h-12 sm:w-6 hover:text-primary-200" />
        </button>
      </form>
    </header>
  );
}

export default Header;
