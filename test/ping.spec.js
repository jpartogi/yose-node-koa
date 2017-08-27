var chai = require('chai');
var expect = chai.expect;
var ping = require('../app/ping');

describe('Passing the ping level:', function() {
   
    it('returns the expected pong', function(done) {
        let ctx = { body:{} };

        var result = ping(ctx);

        expect(ctx.body).to.eql( { alive: true } );

        done();
    });
   
});