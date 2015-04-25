module.exports = function(grunt) {

  ////////////////////////////////////////////////////
  // Task Configuration
  ////////////////////////////////////////////////////

  var _ = grunt.util._;
  var buildConfig = module.require('./build-config.js');
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        stripBanners: true,
        separator: '; \n//======================================\n'
      },
      vendor: {
            src: '<%= vendor.js %>',
            dest: '<%= build_dir %>/vendor.js'
          },
      src: {
        src: '<%= src.js %>',
        dest: '<%= build_dir %>/built.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      vendor: {
        options: {
          beautify: false
        },
        files: {
          '<%= build_dir %>/vendor.min.js': ['<%= build_dir %>/vendor.js']
        }
      },
      src: {
        options: {
          beautify: false
        },
        files: {
          '<%= build_dir %>/built.min.js': ['<%= build_dir %>/built.js']
        }
      }
    },

    jshint: {
      files: '<%= src.js %>',
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          '<%= build_dir %>/**/*.js'
        ]
      }
    },

    cssmin: {
      combine: {
        files: {
          '<%= build_dir %>/styles.min.css': ['<%= webroot %>/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  };

  grunt.initConfig(_.extend(taskConfig, buildConfig));

  ////////////////////////////////////////////////////
  // Module Dependencies -- Vendor Tasks
  ////////////////////////////////////////////////////

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  ////////////////////////////////////////////////////
  // Custom Tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'test',
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
