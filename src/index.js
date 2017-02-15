import { request } from 'd3-request';
import { csvParse } from 'd3-dsv';
import constants from './constants';
import { drawGraph } from './drawgraph';
import './index.css';

request(constants.API_PATH)
  .mimeType("text/csv")
  .response(xhr=> csvParse(xhr.responseText))
  .get(resp => drawGraph(constants.GRAPHS[0].function(resp), constants.GRAPHS[0].title, resp));
