/*
* grunt-extjs-dependencies
* https://github.com/cpak/grunt-extjs-dependencies
*
* Copyright (c) 2013 christoferpak@gmail.com
* Licensed under the MIT license.
*/

'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('extjs_dependencies', 'Uses falafel to figure out in what order to load your ExtJs app files.', function() {
        var opts = this.options(),
            mapper = require('./lib/mapper').init(grunt, opts),
            numFiles, deps;

        grunt.log.writeln('Adding ' + opts.src.length + ' directories to classpath...');

        numFiles = mapper.addDir(opts.src);

        grunt.log.ok('Done, found ' + numFiles + ' files.');

        grunt.log.writeln('Resolving dependencies...');
        deps = mapper.resolveDependencies(opts.resolveFrom);

        grunt.log.ok('Done, dependency graph has ' + deps.length + ' files.');

        grunt.verbose.writeln(deps.join("\n"));

        grunt.config.set('extjs_dependencies_' + this.target, deps);
    });
};
