const chai = require('chai');
const jsdom = require('jsdom').jsdom;
require('ignore-styles');
require('babel-polyfill');
require('babel-register')({
  ignore: (filename) => {
    return (/node_modules/.test(filename) || !new RegExp(process.cwd()).test(filename));
  },
  presets: ['es2015']
});

global.assert = chai.assert;
global.NODE_ENV = 'development';

global.document = jsdom(`<html><head><title></title></head>
<body>
    <nav></nav>
    <h1></h1>
    <div class="loader">Loading...</div>
    <svg width="960" height="500" />
  </body>
</html>`, {
  url: 'http://localhost'
});
global.window = Object.create(document.defaultView);
global.navigator = {
  userAgent: 'node.js'
};
global.window.matchMedia = () => {
  return {
    matches: true
  };
};
