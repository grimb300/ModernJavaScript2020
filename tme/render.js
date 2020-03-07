const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async (filename) => {
  const filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable'
  });

  // Return a promise that will get resolved once everything is loaded
  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      resolve(dom);
    });
  });
};

module.exports = render;
