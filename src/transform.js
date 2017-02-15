import { timeFormat, isoParse } from 'd3-time-format';

function summerizeKeyColumn(acc, val, fields) {
  const key = val[fields[0]];
  const column = val[fields[1]];
  if (!acc[key]) {
    acc[key] = {
      [column]: parseInt(val.count, 10)
    }
  } else {
    if (!acc[key][column]) {
      acc[key][column] = parseInt(val.count, 10);
    } else {
      acc[key][column] += parseInt(val.count, 10);
    }
  }
  return acc;
}

function transform(summary) {
  const data = [];
  const keys = Object.keys(summary);
  const allColumns = keys.reduce((acc, val) => {
    return Object.assign(acc, summary[val]);
  }, {});
  const columns = Object.keys(allColumns);
  columns.forEach(column => {
    const obj = { column };
    keys.forEach(key => {
      if (summary[key][column]) {
        obj[key] = summary[key][column];
      }
    });
    data.push(obj);
  });
  return {
    keys, 
    columns,
    data
  }
}

export function summerizeMonthCountry(data) {
  return transform(data.reduce((acc, val) => {
    val.month = timeFormat("%B")(isoParse(val.date));
    return summerizeKeyColumn(acc, val, ['month', 'country']);
  }, {}));
}

export function summerizeSizeCountry(data) {
  return transform(data.reduce((acc, val) => {
    return summerizeKeyColumn(acc, val, ['size', 'country']);
  }, {}));
}


export function summerizeManufacturersByGender(data) {
  return transform(data.reduce((acc, val) => {
    return summerizeKeyColumn(acc, val, ['gender', 'manufacturer']);
  }, {}));
}

export function summerizeManufacturersByCountry(data) {
  return transform(data.reduce((acc, val) => {
    return summerizeKeyColumn(acc, val, ['manufacturer', 'country']);
  }, {}));
}
