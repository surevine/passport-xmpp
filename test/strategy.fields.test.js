/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('handling a request with valid credentials in body using custom field names', function() {
    var strategy = new Strategy({ jidField: 'jabberid', passwordField: 'passwd' }, function(jid, password, done) {
      if ((jid == 'johndoe@example.com') && (password == 'secret')) {
        return done(null, { id: '1234' }, { scope: 'read' });
      }
      return done(null, false);
    });
    
    var user
      , info;
    
    before(function(done) {
      chai.passport(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.jabberid = 'johndoe@example.com';
          req.body.passwd = 'secret';
        })
        .authenticate();
    });
    
    it('should supply user', function() {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });
    
    it('should supply info', function() {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });
  });
  
  describe('handling a request with valid credentials in body using custom field names with object notation', function() {
    var strategy = new Strategy({ jidField: 'user[jid]', passwordField: 'user[password]' }, function(jid, password, done) {
      if ((jid === 'johndoe@example.com') && (password === 'secret')) {
        return done(null, { id: '1234' }, { scope: 'read' });
      }
      return done(null, false);
    });
    
    var user
      , info;
    
    before(function(done) {
      chai.passport(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.user = {};
          req.body.user.jid = 'johndoe@example.com';
          req.body.user.password = 'secret';
        })
        .authenticate();
    });
    
    it('should supply user', function() {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });
    
    it('should supply info', function() {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });
  });
  
});
