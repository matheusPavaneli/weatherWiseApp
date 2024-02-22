import { Chart, registerables } from 'chart.js';
import IForecastWeatherData from '../interfaces/IForecastWeatherData';
Chart.register(...registerables);

export default (
  ctx: CanvasRenderingContext2D,
  data: IForecastWeatherData[],
) => {
  if (!ctx || !data) return;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((day) => day.dt),
      datasets: [
        {
          label: 'Temperature',
          data: data.map((day) => day.temp),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
        {
          label: 'Precipitation',
          data: data.map((day) =>
            day && day.rain ? day.rain.toString() : '0',
          ),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          yAxisID: 'y1',
        },
        {
          label: 'Wind Speed',
          data: data.map((day) =>
            day && day.windSpeed ? day.windSpeed.toString() : '0',
          ),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          yAxisID: 'y2',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          beginAtZero: true,
          grid: {
            drawOnChartArea: false,
          },
        },
        y2: {
          type: 'linear',
          display: true,
          position: 'right',
          beginAtZero: true,
          grid: {
            drawOnChartArea: false,
          },

          afterFit: (scale) => {
            scale.width = scale.width + 50;
          },
        },
      },
    },
  });
};
