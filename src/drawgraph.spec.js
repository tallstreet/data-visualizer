import { drawGraph } from './drawgraph';
import { assert } from 'chai';

describe('drawGraph', () => {
  const data = {
    columns: ['Germany', 'Austria'],
    keys: ['14', '28', '32'],
    data: [
      { "14": 2, "28": 42, column: "Germany"},
      { "28": 8, "32": 7, column: "Austria"}
    ]
  };
  
  it('should render the title', () => {
    drawGraph(data, 'Title');
    assert.equal(document.getElementsByTagName('h1')[0].textContent, 'Title');
  });

  it('should render a graph', () => {
    drawGraph(data, 'Title');
    assert.equal(document.getElementsByTagName('svg')[0].textContent, 'GermanyAustria051015202530354045Sales142832GermanyAustria051015202530354045Sales142832');
  });
});