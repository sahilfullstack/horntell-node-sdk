'use strict';

function Error(message, code, type) {

	if( ! (this instanceof Error))
		return new Error(message, code, type);

	this._message = message;
	this._code = code;
	this._type = type;
}

Error.prototype = {

	getMessage: function() {
		return this._message;
	},

	getCode: function() {
		return this._statusCode;
	},

	getType: function() {
		return this._type;
	}
}

module.exports = Error;