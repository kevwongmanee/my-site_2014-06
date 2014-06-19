module.exports = function(grunt) {

	var SRC = "./src/",
		DIST = "./dist/";
        SERVER_PORT = "8000";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// config: grunt.file.readJSON('config.json'),

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: SERVER_PORT,
                    base: DIST,
                    livereload: true
                }
            }
        },

        watch: {
            scss: {
                options: {
                    livereload: false
                },
                files: [SRC + 'scss/**/*.scss'],
                tasks: 'sass'
            },
            css: {
                options: {
                    livereload: true
                },
                files: DIST + 'css/*.css'
            },
            htmlDist: {
                options: {
                    livereload: true
                },
                files: DIST + '*.html'
            },
            htmlSrc: {
                options: {
                    livereload: false
                },
                files: SRC + 'html/*.html',
                tasks: ['htmlhint', 'copy:html']
            },
            // jsSrc: {
            //     options: {
            //         livereload: false
            //     },
            //     files: SRC + 'js/**/*.js',
            //     tasks: ['jshint:source', 'concat:local']
            // },
            // jsDist: {
            //     options: {
            //         livereload: true
            //     },
            //     files: DIST + 'js/*.js'
            // },
            imagesSrc: {
                options: {
                    livereload: false
                },
                files: SRC + 'images/*',
                tasks: 'copy:images'
            },
            imagesDist: {
                options: {
                    livereload: true
                },
                files: DIST + 'images/*'
            }
        },

        sass: {
            dist: {
                files: [{
                    src : ['*.scss'],
                    cwd : SRC + 'scss',
                    dest : DIST + 'css',
                    ext : '.css',
                    expand : true
                }],
                options: {
                    style: 'compressed'
                }
            }
        },

        copy: {
            // javascript: {
            //     files: [
            //         {
            //             expand: true,
            //             src: [SRC + 'js/foundation.offcanvas.js'], // apparently required for latest version of jQuery from bower
            //             flatten: true,
            //             dest: DIST + 'js'
            //         }
            //     ]
            // },
            html: {
                files: [
                    {
                        expand: true,
                        src: [SRC + 'html/*.html'],
                        flatten: true,
                        dest: DIST
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        src: [SRC + 'images/*'],
                        flatten: true,
                        dest: DIST + 'images'
                    }
                ]
            },
            pdf: {
                files: [
                    {
                        expand: true,
                        src: [SRC + 'pdf/*'],
                        flatten: true,
                        dest: DIST + 'pdf'
                    }
                ]
            }
        },

        // concat: {
        //     options: {
        //         separator: ';\n',
        //         banner: '/*! <%= pkg.name %> - Build Date: <%= grunt.template.today("mm-dd-yyyy, h:MM:ss TT") %> */\n'
        //     },
        //     local: {
        //         src: [
        //             SRC + 'js/**/*.js',
        //         ],
        //         dest: DIST + 'js/app.min.js'
        //     }
        // },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - Build Date: <%= grunt.template.today("mm-dd-yyyy, h:MM:ss TT") %> */\n',
                compress: {
                    drop_console: true
                }
            },
            local: {
                options: {
                    compress: {
                        drop_console: false
                    }
                },
                files: {
                    'dist/js/app.min.js' : [
                        SRC + 'js/lib/custom.modernizr.js',
                        SRC + 'js/lib/jquery.js',
                        SRC + 'js/vendor/foundation.min.js'
                        
                    ]
                }
            }
        },

        // jshint: {
        //     options: {
        //         '-W099': true // ignore warnings about mixed spaces and tabs
        //     },
        //     source: [
        //         SRC + 'js/*.js',
        //     ],
        //     grunt: {
        //         options: {
        //             '-W099': true // ignore warnings about mixed spaces and tabs
        //         },
        //         src: 'Gruntfile.js'
        //     }
        // },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    // 'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: [
                    SRC + 'html/*.html',
                ]
            }
        },

    });

    // Load all Grund tasks via matchdep:
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Default task(s).
    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build-local', ['newer:copy','newer:sass','uglify:local']);
    // grunt.registerTask('build-local', ['newer:copy','newer:sass','uglify:local']);
    // grunt.registerTask('build-dev', ['newer:copy','newer:sass','uglify:dev']);
    // grunt.registerTask('build-prod', ['newer:copy','newer:sass','uglify:prod']);
};