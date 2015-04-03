'use strict';

var crypto = require('crypto');

function App() {

	if( ! (this instanceof App))
		return new App();

	this.base = 'https://api.horntell.com';
	this.version = 'v1';
	this.key = null;
	this.secret = null;
}

App.prototype = {

	init: function(key, secret) {
		this.setKey(key);
		this.setSecret(secret);
	},

	hash: function(uid) {
		return crypto.createHmac('sha256', this.getSecret()).update(uid).digest('hex');
	},

	setBase: function(base) {
		if(base) {
			this._setAppField('base', base);
		}
	},

	setVersion: function(version) {
		if(version) {
			this._setAppField('version', version);
		}
	},

	setKey: function(key) {
		if(key)
			this._setAppField('key', key);
	},

	setSecret: function(secret) {
		if(secret)
			this._setAppField('secret', secret);
	},

	getBase: function() {
		return this._getAppField('base');
	},

	getVersion: function() {
		return this._getAppField('version');
	},

	getKey: function() {
		return this._getAppField('key');
	},

	getSecret: function() {
		return this._getAppField('secret');
	},

	_setAppField: function(key, value) {
		this[key] = value;
	},

	_getAppField: function(key) {
		return this[key];
	}
}

module.exports = App;
