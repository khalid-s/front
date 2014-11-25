'use strict';

module.exports = function(grunt) {
  // autoload tasks
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('front.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['vendor/dist/*']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      all: {
        src: ['vendor/libs/iknsa/main.js'],
        dest: 'vendor/dist/concat/all.concat.js'
      },
      dist: {
        src: ['vendor/libs/contrib/<%= pkg.name %>.js'],
        dest: 'vendor/dist/concat/<%= pkg.name %>.concat.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      all: {
        src: '<%= concat.all.dest %>',
        dest: 'vendor/dist/all.min.js'
      },
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'concat:all', 'uglify:all']);

};
