'use strict';

module.exports = function(grunt) {
  // autoload tasks
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('front.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['js/dist/*']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      jq: {
        src: ['js/vendor/contrib/libs/jquery-1.11.1/dist/jquery.js'],
        dest: 'js/dist/concat/jq.concat.js'
      },
      all: {
        src: ['js/vendor/iknsa/libs/main.js'],
        dest: 'js/dist/concat/all.concat.js'
      },
      dist: {
        src: ['js/vendor/contrib/libs/<%= pkg.name %>.js'],
        dest: 'js/dist/concat/<%= pkg.name %>.concat.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      jq: {
        src: '<%= concat.jq.dest %>',
        dest: 'js/dist/jq.min.js'
      },
      all: {
        src: '<%= concat.all.dest %>',
        dest: 'js/dist/all.min.js'
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
  grunt.registerTask('default', ['jshint', 'clean', 'concat:jq', 'concat:all', 'uglify:jq', 'uglify:all']);

};
