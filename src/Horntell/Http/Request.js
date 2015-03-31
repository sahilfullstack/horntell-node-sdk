'use strict';

var Promise = require('bluebird'),
REST = require('restler'),
Response = require('./Response');

function Request(horntell) {

	if( ! (this instanceof Request))
		return new Request(horntell);

	this._horntell = horntell;
}

Request.prototype = {

	send: function(method, path, data, callback) {

		var url = this._horntell.getBase() + path,
		options = this._getOptions(data);

		var deferred = this._createDeferred(callback);
		switch(method) {
			case 'GET':
				this.get(url, options, deferred);
				break;

			case 'POST':
				this.post(url, options, deferred);
				break;

			case 'PUT':
				this.put(url, options, deferred);
				break;

			case 'DELETE':
				this.delete(url, options, deferred);
				break;

			default:
				this.get(url, options, deferred);
		}
		return deferred.promise;
	},

	get: function(url, options, deferred) {
		var self = this;

		REST.get(url, options).on('complete', function(response, raw) {
			self._requestHandler(response, raw, deferred);
		});
	},

	post: function(url, options, deferred) {
		var self = this;

		REST.post(url, options).on('complete', function(response, raw) {
			self._requestHandler(response, raw, deferred);
		});
	},

	put: function(url, options, deferred) {
		var self = this;

		REST.put(url, options).on('complete', function(response, raw) {
			self._requestHandler(response, raw, deferred);
		});
	},

	delete: function(url, options, deferred) {
		var self = this;

		REST.del(url, options).on('complete', function(response, raw) {
			self._requestHandler(response, raw, deferred);
		});
	},

	_requestHandler: function(response, raw, deferred) {
		if(response == null || response.data) {
			deferred.resolve(this._responseHandler(response, raw));
		} else {
			deferred.reject(this._errorHandler(response, raw));
		}

		return deferred.promise;
	},

	_responseHandler: function(response, raw) {

		if(raw.statusCode == 204) {
			//When response status code is 204 and null received in response, eg horn created, campaign triggered.
			return Response(raw);
		} else {
			//When data received in response, eg. profile created or updated.
			return Response(raw);
		}
	},

	_errorHandler: function(response, raw) {

		// In case of connection aborted, parse, encoding, decoding failed or some other unhandled errors.
		if(response.code === 'ENOTFOUND')
			return new this._horntell.errors.NetworkError;

		switch(raw.statusCode) {
			case 400:
				return new this._horntell.errors.InvalidRequestError({statusCode: raw.statusCode, data:response});
				break;

			case 401:
				return new this._horntell.errors.AuthenticationError({statusCode: raw.statusCode, data:response});
				break;

			case 403:
				return new this._horntell.errors.ForbiddenError({statusCode: raw.statusCode, data:response});
				break;

			case 404:
				return new this._horntell.errors.NotFoundError({statusCode: raw.statusCode, data:response});
				break;

			case 500:
				return new this._horntell.errors.ServiceError({statusCode: raw.statusCode, data:response});
				break;

			default:
				return this._handleUnknownError(response, raw);
		}
	},

	_handleUnknownError: function(response, raw) {

		switch(Math.floor(raw.statusCode/100)) {
			case 4:
				return new this._horntell.errors.InvalidRequestError({statusCode: raw.statusCode, data:response});
				break;

			case 5:
				return new this._horntell.errors.ServiceError({statusCode: raw.statusCode, data:response});
				break;

			default:
				return new this._horntell.errors.Error({statusCode: raw.statusCode, data:response});
		}
	},

	_createDeferred: function(callback) {
		var deferred = Promise.defer();

		if (callback) {
			// Callback, if provided, is a simply translated to Promise'esque:
			// (Ensure callback is called outside of promise stack)
			deferred.promise.then(function(response) {
				setTimeout(function(){ callback(null, response) }, 0);
			}, function(error) {
				setTimeout(function(){ callback(error, null); }, 0);
			});
		}

		return deferred;
	},

	_getOptions: function(data) {

		return {
			data: data,
			headers: {
				'Accept' : 'application/vnd.horntell.' + this._horntell.getVersion() +'+json',
				'Content-Type' : 'application/json'
			},
			username: this._horntell.getKey(),
			password: this._horntell.getSecret()
		};
	}
}

module.exports = Request;