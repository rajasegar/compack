var assert = require('assert');
var exec = require('child_process').exec;
var fs = require('fs');
var mocha = require('mocha');
var path = require('path');
var spawn = require('child_process').spawn;
var rimraf = require('rimraf');

var binPath = path.resolve(__dirname,'../bin/compack');
var tempDir = path.resolve(__dirname, '../temp');

describe('compack(1)', function() {
    mocha.before(function(done) {
        this.timeout(30000);
        cleanup(done);
    });

    mocha.after(function(done) {
        this.timeout(30000);
        cleanup(done);
    });

    describe('(no args)',function() {
        var dir;
        var files;
        var output;

        mocha.before(function(done) {
           /* 
            createEnvironment(function(err,newDir) {
                if(err) return done(err);
                dir = newDir;
                done();
            });
            */
            done();
        });

        mocha.after(function(done) {
            this.timeout(30000);
            cleanup(dir,done);
        });

        it('should bundle the component',function(done) {
            done();
        });
    });

    describe('--create',function() {

        mocha.before(function(done) {
            this.timeout(30000);
            cleanup(done);
        });

        it('should create the boilerplate',function(done) {
            run(tempDir,['--create','my-component'],function() {
                console.log("created boilerplate");
                done();
            });
        });

    });

});

function cleanup(dir, callback) {
    if(typeof dir === 'function') {
        callback = dir;
        dir = tempDir;
    }
/*
    rimraf(tempDir, function(err) {
        callback(err);
    });
    */
    callback();
}

function run(dir,args,callback) {
    var argv = [binPath].concat(args);
    var exec = process.argv[0];
    var stderr = '';
    var stdout = '';

    var child = spawn("../bin/compack",args, {
        cwd:tempDir,
        env:process.env
    });

    child.stdout.on('data', function(data) {
        console.log(data);
    });

    child.stderr.on('data',function(data) {
        console.log(data);
    });

    child.on('close',function(code) {
        console.log("child process exited with code: ", code);
    });
}

function createEnvironment(){
}
