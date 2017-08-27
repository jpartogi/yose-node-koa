var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var Nightmare = require('nightmare');		

var app = require('../app');

describe('Passing the hello yose level:', function() {

	beforeEach(function(done){
		server = app.listen(3000);
		done();
	});

    it('should return the Hello Yose', function (done) {
        new Nightmare()
            .goto('http://localhost:3000/')
            .evaluate(function () {
                return document.querySelector('h1').innerText;
            })
            .then(function(result){
      			expect(result).to.equal('Hello Yose');
      			done();
    		});
    });
   

   afterEach(function(done){
   		server.close();
   		done();
   });

});