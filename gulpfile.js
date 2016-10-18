var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver');
    del =require('del');
    electron = require('gulp-atom-electron'),
    symdest = require('gulp-symdest');
    sass=require('gulp-sass');

var config ={
  sourceDir: 'src',
  buildDir: 'build',
  packagesDir:'packages',
  npmDir: 'node_modules',
  publicDir:'public'
};

// run init tasks
gulp.task('frontend', [
  'frontend:dependencies',
  'frontend:js',
  'frontend:html',
  'frontend:css',
  'frontend:sass',
  'frontend:images']);

// run development task
gulp.task('dev',
['dev:watch', 'dev:serve']);

//clean
gulp.task('clean',
['clean:build','clean:package']);

//package electron
gulp.task('package', [
  'package:osx',
  'package:linux',
  'package:windows'
]);

// serve the build dir
gulp.task('dev:serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('dev:watch', function () {
  gulp.watch('src/**/*.js', ['frontend:js']);
  gulp.watch('src/**/*.html', ['frontend:html']);
  gulp.watch('src/**/*.css', ['frontend:css']);
});

// move dependencies into build dir
gulp.task('frontend:dependencies', function () {
  return gulp.src([
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/systemjs/dist/system-csp-production.src.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/es6-shim/es6-shim.map',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

// transpile & move js
gulp.task('frontend:js', function () {
  return gulp.src('src/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'));
});

// move html
gulp.task('frontend:html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('frontend:css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
});

gulp.task('frontend:sass', function () {
  return gulp.src(config.sourceDir + '/**/*.scss')
    .pipe(sass({
      style: 'compressed',
      includePaths: [
        config.sourceDir + '/styles',
        config.npmDir + '/bootstrap-sass/assets/stylesheets'
      ]
    }))
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('frontend:images', function () {
  return gulp.src('src/images')
    .pipe(gulp.dest('build'))
});

gulp.task('clean:build',function(){
  return del(config.buildDir + '/**/*', { force: true });
});

gulp.task('clean:package',function(){
  return del(config.packagesDir + '/**/*', { force: true });
});

//elctron
gulp.task('electron',function(){
  return gulp.src([
    config.sourceDir+'/electron/main.js',
    config.sourceDir+'/electron/package.json'
  ]).pipe(gulp.dest(config.buildDir));
});

//packages
gulp.task('package:osx', function() {
  return gulp.src(config.buildDir + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'darwin'
    }))
    .pipe(symdest(config.packagesDir + '/osx'));
});

gulp.task('package:linux', function() {
  return gulp.src(config.buildDir + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'linux'
    }))
    .pipe(symdest(config.packagesDir + '/linux'));
});

gulp.task('package:windows', function() {
  return gulp.src(config.buildDir + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'win32'
    }))
    .pipe(symdest(config.packagesDir + '/windows'));
});
