const gulp = require('gulp')
const rimraf = require('rimraf')
const webpack = require('webpack')
const runSequence = require('run-sequence')
const webpackConfig = require('./webpack.config')

gulp.task('build', (cb) => {
  runSequence('clean', ['copy-statics', 'webpack-build'], cb)
})

gulp.task('webpack-build-production', (cb) => {
  const compiler = webpack(webpackConfig('production'))
  compiler.run((err, stats) => {
    console.log(stats.toString(true))
    cb(err)
  })
})

gulp.task('webpack-build', (cb) => {
  const compiler = webpack(webpackConfig('development'))
  compiler.run((err, stats) => {
    console.log(stats.toString(true))
    cb(err)
  })
})

gulp.task('webpack-watch', (cb) => {
  const compiler = webpack(webpackConfig('development'))
  compiler.watch({}, (_, stats) => {
    console.log(stats.toString(true))
  })
})

gulp.task('clean', (cb) => {
  rimraf('dist', cb)
})

gulp.task('copy-statics', (cb) => {
  gulp.src(['src/manifest.json', 'src/background.js'])
    .pipe(gulp.dest('dist'))
  cb()
})
