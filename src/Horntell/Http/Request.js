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
		options = {
			data: data,
			headers: {
				'Accept' : 'application/vnd.horntell.' + this._horntell.getVersion() +'+json',
				'Content-Type' : 'application/json'
			},
			username: this._horntell.getKey(),
			password: this._horntell.getSecret()
		};

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
			self._responseHandler(response, raw, deferred);
		});
	},

	post: function(url, options, deferred) {
		var self = this;

		REST.post(url, options).on('complete', function(response, raw) {
			self._responseHandler(response, raw, deferred);
		});
	},

	put: function(url, options, deferred) {
		var self = this;

		REST.put(url, options).on('complete', function(response, raw) {
			self._responseHandler(response, raw, deferred);
		});
	},

	delete: function(url, options, deferred) {
		var self = this;

		REST.del(url, options).on('complete', function(response, raw) {
			self._responseHandler(response, raw, deferred);
		});
	},

	_responseHandler: function(response, raw, deferred) {
		if(response instanceof Error){
			deferred.reject(new this._horntell.errors.NetworkError({code: null, data: {message: 'Could not connect to Horntell. Please check your network connection and try again. If the problem persists, please get in touch with us at hello@horntell.com.', type: 'network_error', code: null}}));
		}

		if(raw.statusCode == 204) {
			deferred.resolve(Response({code: raw.statusCode, data: null}));
		} else {
			if(response.data)
				deferred.resolve(Response({code: raw.statusCode, data: response.data}));
			else if(response.error)
				deferred.reject(this._errorHandler(response, raw));
		}

		return deferred.promise;
	},

	_errorHandler: function(response, raw) {
		switch(raw.statusCode) {
			case 400:
				return new this._horntell.errors.InvalidRequestError({code: raw.statusCode, data: response});
				break;

			case 401:
				return new this._horntell.errors.AuthenticationError({code: raw.statusCode, data: response});
				break;

			case 403:
				return new this._horntell.errors.ForbiddenError({code: raw.statusCode, data: response});
				break;

			case 404:
				return new this._horntell.errors.NotFoundError({code: raw.statusCode, data: response});
				break;

			case 500:
				return new this._horntell.errors.ServiceError({code: raw.statusCode, data: response});
				break;

			default:
				return this._handleUnknownError(response, raw);
		}
	},

	_handleUnknownError: function(response, raw) {

		switch(floor(raw.statusCode/100)) {
			case 4:
				return new this._horntell.errors.InvalidRequestError({code: raw.statusCode, data: response});
				break;

			case 5:
				return new this._horntell.errors.ServiceError({code: raw.statusCode, data: response});
				break;

			default:
				return new this._horntell.errors.Error({code: raw.statusCode, data: response});
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
	}
}

module.exports = Request;