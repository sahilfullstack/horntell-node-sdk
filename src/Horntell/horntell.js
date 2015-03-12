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

	this._prepResources();
	this.setCredentials(key, secret);
	this.setApiVersion(version);
}

Horntell.prototype = {

	setBase: function(base) {
		this._setApiField('base', base);
	},

	setPort: function(port) {
		this._setApiField('port', port);
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

	setKey: function(key) {
		if(key)
			this._setApiField('key', key);
	},

	setSecret: function(secret) {
		if(secret)
			this._setApiField('secret', secret);
	},

	// setTimeout: function(timeout) {
	// 	this._setApiField(
	// 		'timeout',
	// 		timeout == null ? Stripe.DEFAULT_TIMEOUT : timeout
	// 		);
	// },

	// setHttpAgent: function(agent) {
	// 	this._setApiField('agent', agent);
	// },

	_setApiField: function(key, value) {
		this._api[key] = value;
	},

	getApiField: function(key) {
		return this._api[key];
	},

	_prepResources: function() {

		for (var name in resources) {
			this[
			name[0].toLowerCase() + name.substring(1)
			] = new resources[name](this);
		}

	}

};

module.exports = Horntell;
