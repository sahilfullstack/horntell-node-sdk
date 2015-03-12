'use strict';

var Error = require('./Error'),
Util = require('util');

function InvalidRequestError(error) {

	if( ! (this instanceof InvalidRequestError))
		return new InvalidRequestError(error);

	this._error = error
}

Util.inherits(InvalidRequestError, Error);

module.exports = InvalidRequestError;