'use strict';

var Request = require('./Http/Request');

function Activity(horntell) {
	this._request = Request(horntell);
}

Activity.prototype = {

	/**
	 * Creates activity for single profile
	 *
	 * @param  string uid
	 * @param  object activity
	 * @param  function callback
	 */

	create: function(uid, activity, callback) {
		return this._request.send('POST', '/profiles/' + uid + '/activities', activity, callback);
	}
}

module.exports = Activity;
