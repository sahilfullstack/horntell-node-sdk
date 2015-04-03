'use strict';

var Request = require('./Http/Request');

function Campaign(horntell) {
	this._request = Request(horntell);
}

Campaign.prototype = {

	/**
	 * Triggers campaign for single profile
	 *
	 * @param  string uid
	 * @param  string campaignId
	 * @param  function callback
	 */

	toProfile: function(uid, campaignId, meta, callback) {
		if(meta === undefined || meta === null) meta = {};

		return this._request.send('POST', '/profiles/' + uid + '/campaigns/' + campaignId, {meta: meta}, callback);
	},

	/**
	 * Triggers campaign for multiple profiles
	 *
	 * @param  array profiles
	 * @param  string campaignId
	 * @param  function callback
	 */

	toProfiles: function(profiles, campaignId, meta, callback) {
		if(meta === undefined || meta === null) meta = {};

		var data = {
			profile_uids: profiles,
			meta: meta
		};

		return this._request.send('POST', '/profiles/campaigns/' + campaignId, data, callback);
	}
}

module.exports = Campaign;
