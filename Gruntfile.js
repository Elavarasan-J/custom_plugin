module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'assets/css/style.css' : 'assets/scss/style.scss'
				}
			}
		},
        coffee: {
          compile: {
            files: {
              'assets/js/main.js': ['assets/js/coffee/*.coffee']
            }
          }
        },  
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
            js: {
				files: '**/*.coffee',
				tasks: ['coffee']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.registerTask('default',['watch']);
}    