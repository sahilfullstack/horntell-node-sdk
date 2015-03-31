'use strict';

var Error = require('./Error'),
Util = require('util');

function NetworkError(error) {

	if( ! (this instanceof NetworkError))
		return new NetworkError(error);

	if(error === undefined) {
		error = {
			statusCode: null,
			data: {
				error : {
				 	message: 'Could not connect to Horntell. Please check your network connection and try again. If the problem persists, please get in touch with us at hello@horntell.com',
				 	type: 'network_error',
				  	code: null
				}
			}
		};

	}

	this._error = error
}

Util.inherits(NetworkError, Error);

module.exports = NetworkError;