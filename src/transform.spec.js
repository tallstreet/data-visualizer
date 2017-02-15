import { summerizeMonthCountry, summerizeSizeCountry, summerizeManufacturersByGender, summerizeManufacturersByCountry } from './transform';
import { assert } from 'chai';

describe('transform', () => {
  const data = [
    {
      manufacturer: 'The Hipster Jeans Company',
      gender: 'M',
      date: '2016-01-01',
      color: 'Acid Wash',
      style: 'Relaxed',
      country: 'Germany',
      size: '28',
      count: 20
    },
    {
      manufacturer: 'The Hipster Jeans Company',
      gender: 'M',
      date: '2016-01-02',
      color: 'Acid Wash',
      style: 'Relaxed',
      country: 'Germany',
      size: '28',
      count: 22
    },
    {
      manufacturer: 'Wrangled Jeans',
      gender: 'M',
      date: '2016-01-01',
      color: 'Acid Wash',
      style: 'Relaxed',
      country: 'Austria',
      size: '32',
      count: 7
    },
    {
      manufacturer: 'Wrangled Jeans',
      gender: 'F',
      date: '2016-01-01',
      color: 'Straight Leg',
      style: 'Relaxed',
      country: 'Germany',
      size: '14',
      count: 2
    },
    {
      manufacturer: 'Wrangled Jeans',
      gender: 'M',
      date: '2016-01-01',
      color: 'Straight Leg',
      style: 'Relaxed',
      country: 'Austria',
      size: '28',
      count: 8
    }
  ];

  describe('summerizeSizeCountry', () => {
    it('should generate data for d3 grouped by size and country', () => {
      const output = summerizeSizeCountry(data);
      assert.deepEqual(output, {
        columns: ['Germany', 'Austria'],
        keys: ['14', '28', '32'],
        data: [
          { "14": 2, "28": 42, column: "Germany"},
          { "28": 8, "32": 7, column: "Austria"}
        ]
      });
    });
  });

  describe('summerizeMonthCountry', () => {
    it('should generate data for d3 grouped by month and country', () => {
      const output = summerizeMonthCountry(data);
      assert.deepEqual(output, {
        columns: ['Germany', 'Austria'],
        keys: ['January'],
        data: [
          { "January": 44, column: "Germany"},
          { "January": 15, column: "Austria"}
        ]
      });
    });
  });


  describe('summerizeManufacturersByGender', () => {
    it('should generate data for d3 grouped by manufacturer and gender', () => {
      const output = summerizeManufacturersByGender(data);
      assert.deepEqual(output, {
        columns: ['The Hipster Jeans Company', 'Wrangled Jeans'],
        keys: ['M', 'F'],
        data: [
          { "M": 42, column: "The Hipster Jeans Company"},
          { "M": 15, "F": 2, column: "Wrangled Jeans"}
        ]
      });
    });
  });


  describe('summerizeManufacturersByCountry', () => {
    it('should generate data for d3 grouped by manufacturer and country', () => {
      const output = summerizeManufacturersByCountry(data);
      assert.deepEqual(output, {
        columns: ['Germany', 'Austria'],
        keys: ['The Hipster Jeans Company', 'Wrangled Jeans'],
        data: [
          { "The Hipster Jeans Company": 42, "Wrangled Jeans": 2, column: "Germany"},
          { "Wrangled Jeans": 15, column: "Austria"}
        ]
      });
    });
  });
})