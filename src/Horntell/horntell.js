'use strict';

var resources = {
	App: require('./App'),
	Profile: require('./Profile'),
	Horn: require('./Horn'),
	Campaign: require('./Campaign')
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

function Horntell() {

	if ( ! (this instanceof Horntell)) {
		return new Horntell();
	}

	this.errors = {};

	this._prepResources();
	this._prepErrors();
}

Horntell.prototype = {

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

module.exports = Horntell();
