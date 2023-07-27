/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add more options here
    ace: {
      themes  : ['cobalt', 'ambiance', 'chaos'],
      modes   : ['python', 'javascript'],
      workers : ['javascript']
    }
  });
  return app.toTree([]);
};
