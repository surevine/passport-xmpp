/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , proxyquire = require('proxyquire')
  , server = require('./bootstrap/xmpp-server');


describe('Strategy', function() {
  
  describe.only('failing authentication with bad \'preferred\' value', function() {

    it('Report expected \'preferred\' value', function(done) {
      var fakeClient = function(options) {
        expect(options.body.preferred).to.equal('UNKNOWN');
        done()
      }
      var Strategy = proxyquire('../lib/strategy', { './xmpp': fakeClient });
      var strategy = new Strategy();

      chai.passport(strategy)
            .success(function() {
              done('error');
            })
            .error(function(error) {
               done(error);
            })
            .req(function(req) {
              req.body = {};
              req.body.jid = 'johndoe@localhost';
              req.body.password = 'secret';
              req.body.preferred = 'UNKNOWN';
            })
            .authenticate();
        });
    });
  
});
