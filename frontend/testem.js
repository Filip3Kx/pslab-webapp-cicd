/* eslint-env node */
module.exports = {
  test_page        : 'tests/index.html?hidepassed',
  disable_watching : true,
  launch_in_ci     : [
    'PhantomJS'
  ],
  "launchers": {
    "PhantomJS": {
      "command": "/var/lib/jenkins/jobs/test/workspace/frontend/node_modules/phantomjs-prebuilt/bin/phantomjs",
      "protocol": "browser",
      "args": ["-f", "tests/index.html", "-p"]
    }
  },
  launch_in_dev: [
    'PhantomJS',
    'Chrome'
  ],
};
