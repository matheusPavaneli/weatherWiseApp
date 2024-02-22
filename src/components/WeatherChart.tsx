import { useRef, useEffect } from 'react';
import createChart from '../utils/createCharts';
import IForecastWeatherData from '../interfaces/IForecastWeatherData';

const WeatherChart = ({
  weatherData,
}: {
  weatherData: IForecastWeatherData[];
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chart = createChart(ctx, weatherData);
        return () => {
          if (!chart) return;
          chart.destroy();
        };
      }
    }
  }, [weatherData]);

  return (
    <div className="w-full h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default WeatherChart;
