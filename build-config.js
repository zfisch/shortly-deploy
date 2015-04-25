module.exports = {
  webroot: 'public',
  build_dir: 'public/dist',
  src: {
    js: [
      'app/**/*.js',
      'lib/**/*.js',
      'server-config.js',
      'server.js',
      'public/client/**/*.js'
    ]
  },
  vendor: {
    js: [
      'public/lib/**/*.js'
    ]
  }
}
