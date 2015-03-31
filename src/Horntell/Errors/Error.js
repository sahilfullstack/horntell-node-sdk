'use strict';

function Error(error) {

	if( ! (this instanceof Error))
		return new Error(error);

	this._error = error;
}

Error.prototype = {

	getMessage: function() {
		return this._error.message;
	},

	getStatusCode: function() {
		return this._error.statusCode;
	},

	getType: function() {
		return this._error.type;
	}
}

module.exports = Error;