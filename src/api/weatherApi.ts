import axios from 'axios';

import globalConfig from '../config/global';

const { BASE_URL } = globalConfig;

export async function getCurrentWeather({
  cityName,
  language,
  units,
}: {
  cityName: string;
  language: string;
  units: string;
}) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/weather/current?city=${cityName}&language=${language}&unitsSystem=${units}`,
    );
    return data;
  } catch (error) {
    return null;
  }
}
export async function getForecastWeather({
  cityName,
  language,
  units,
}: {
  cityName: string;
  language: string;
  units: string;
}) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/weather/forecast?city=${cityName}&language=${language}&unitsSystem=${units}`,
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getUVIndex({ cityName }: { cityName: string }) {
  try {
    const { data } = await axios.get(`${BASE_URL}/uvIndex?city=${cityName}`);
    return data;
  } catch (error) {
    return null;
  }
}

export async function getTimezone({ cityName }: { cityName: string }) {
  try {
    const { data } = await axios.get(`${BASE_URL}/timezone?city=${cityName}`);
    return data;
  } catch (error) {
    return null;
  }
}

export async function getImage({ cityName }: { cityName: string }) {
  try {
    const { data } = await axios.get(`${BASE_URL}/image?city=${cityName}`);
    return data;
  } catch (error) {
    return 'src/assets/default_image.jpg';
  }
}
