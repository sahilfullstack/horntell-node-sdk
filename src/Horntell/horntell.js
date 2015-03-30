'use strict';

Horntell.BASE = 'https://api.horntell.com';
Horntell.VERSION = 'v1';
Horntell.KEY = null;
Horntell.SECRET = null;

var resources = {
	Profile: require('./Profile'),
	Horn: require('./Horn'),
	Campaign: require('./Campaign'),
	Activity: require('./Activity')
},

errors = {
	AuthenticationError: require('./Errors/AuthenticationError'),
	Error: require('./Errors/Error'),
	ForbiddenError: require('./Errors/ForbiddenError'),
	InvalidRequestError: require('./Errors/InvalidRequestError'),
	NetworkError: require('./Errors/NetworkError'),
	NotFoundError: require('./Errors/NotFoundError'),
	ServiceError: require('./Errors/ServiceError')
};

function Horntell(key, secret, version) {

	if (!(this instanceof Horntell)) {
		return new Horntell(key, secret);
	}

	this._api = {
		key: Horntell.KEY,
		secret: Horntell.SECRET,
		base: Horntell.BASE,
		version: Horntell.VERSION
	};

	this.errors = {};

	this._prepResources();
	this._prepErrors();
	this.setCredentials(key, secret);
	this.setApiVersion(version);
}

Horntell.prototype = {

	setBase: function(base) {
		this._setApiField('base', base);
	},

	setApiVersion: function(version) {
		if (version) {
			this._setApiField('version', version);
		}
	},

	setCredentials: function(key, secret) {
		if (key, secret) {
			this._setApiField('key', key);
			this._setApiField('secret', secret);
		}
	},

	getCredentials: function()
	{
		return {
			key: this._getApiField(key),
			secret: this._getApiField(secret)
		}
	},

	setKey: function(key) {
		if(key)
			this._setApiField('key', key);
	},

	setSecret: function(secret) {
		if(secret)
			this._setApiField('secret', secret);
	},

	getBase: function(base) {
		return this._getApiField(base);
	},

	getApiVersion: function(version) {
		return this._getApiField(version);
	},

	getKey: function(key) {
		return this._getApiField(key);
	},

	getSecret: function(secret) {
		return this._getApiField(secret);
	},

	_setApiField: function(key, value) {
		this._api[key] = value;
	},

	_getApiField: function(key) {
		return this._api[key];
	},

	_prepResources: function() {
		for (var name in resources) {
			this[
			name[0].toLowerCase() + name.substring(1)
			] = new resources[name](this);
		}
	},

	_prepErrors: function() {
		for (var name in errors) {
			this.errors[name] = errors[name];
		}
	}

};

module.exports = Horntell;
