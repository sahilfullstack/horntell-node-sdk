'use strict';

function Error(error) {

	if( ! (this instanceof Error))
		return new Error(error);

	this._error = error;
}

Error.prototype = {

	getData: function() {
		return this._error.data.error;
	},

	getCode: function() {
		return this._error.code;
	}
}

module.exports = Error;