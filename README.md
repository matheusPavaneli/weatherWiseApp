# WeatherApp

WeatherApp is a cutting-edge weather forecasting application that provides real-time weather information, future forecasts, UV index, and timezone data. This project is designed to seamlessly consume data from its dedicated backend. For more details about the backend, visit [WeatherApp Backend](https://github.com/matheusPavaneli/weatherAppBackend).

## Getting Started

### Prerequisites

Before you begin, ensure you have Git installed on your machine. For installation instructions, please visit [Git's official site](https://git-scm.com/downloads).

### Clone the Repository

Follow these steps to get a local copy running:

```bash
git clone https://github.com/matheusPavaneli/weatherWiseApp.git
```

Navigate to the project directory:

```bash
cd weatherApp
```

### Setting Up Environment Variables

Configure the required environment variables by setting `BASE_URL` in the `config` file:

```javascript
BASE_URL: 'YOUR_BASE_URL'
```

### Installing Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### Running the Application

Start the application with:

```bash
npm run dev
```

## Features

- **Current Weather and Forecasts:** AAccess real-time weather conditions and forecasts every 3 hours for any city in the world.
- **City Imagery:** Retrieves beautiful images corresponding to the city name.
- **UV Index Information:** Provides current UV index data to ensure user safety under the sun.
- **City, State, and Country Details:** Delivers detailed information on city, state, and country.
- **Dark/Light Mode:** Allows users to switch between dark and light theme preferences.
- **Imperial/Metric System:** Users can choose between imperial and metric units for temperature and wind speed.

## Technologies Used

- **Axios:** Handles HTTP requests.
- **Cors:** Ensures security through cross-origin request protocols.
- **ChartJS & React-chartjs-2:** Powers the creation of dynamic and responsive charts.
- **ReactJS:** Facilitates the development of user interfaces.
- **React-icons:** Provides a wide array of icons.
- **React-redux & Redux-saga:** Manages application state and handles asynchronous operations.
- **TailwindCSS:** Offers utility-first CSS framework for rapid UI development.

## Final Observations

The WeatherApp aims to deliver weather data swiftly and efficiently by consuming a specifically designed backend. This project emphasizes quick information retrieval, user-friendly interfaces, and responsive design, making it an exemplary addition to any portfolio.