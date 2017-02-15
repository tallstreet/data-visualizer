import {
  summerizeSizeCountry,
  summerizeMonthCountry,
  summerizeManufacturersByGender,
  summerizeManufacturersByCountry
} from './transform';

export default {
  API_PATH: 'sales.csv',
  COLOURS: [
    "#5d7f3c",
    "#8f55ce",
    "#8fb43c",
    "#d275e0",
    "#55ba63",
    "#d2439e",
    "#4eb5a0",
    "#d4416a",
    "#5fa0d9",
    "#ce4934",
    "#5a70da",
    "#c3a649",
    "#9b489d",
    "#de853b",
    "#6362a5",
    "#976630",
    "#b78fd5",
    "#d57b71",
    "#dd82b2",
    "#9b4869"
  ],
  GRAPHS: [
    {
      title: 'Manufacturers By Gender',
      function: summerizeManufacturersByGender
    },
    {
      title: 'Manufacturers By Country',
      function: summerizeManufacturersByCountry
    },
    {
      title: 'Sizes By Country',
      function: summerizeSizeCountry
    },
    {
      title: 'Months By Country',
      function: summerizeMonthCountry
    }
  ]
}
