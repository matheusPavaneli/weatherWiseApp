interface IDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface IScales {
  y: {
    beginAtZero: boolean;
  };
}

interface IChartData {
  labels: string[];
  datasets: IDataset[];
}

interface IChartOptions {
  scales: IScales;
}

export default interface IChartConfiguration {
  type: string;
  data: IChartData;
  options: IChartOptions;
}
