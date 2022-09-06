const withTM = require('next-transpile-modules')(['backend'])

module.exports = withTM({
  reactStrictMode: true
})
