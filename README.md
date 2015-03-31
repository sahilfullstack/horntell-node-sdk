Horntell SDK for NodeJS
=======================

This SDK allows you to easily integrate Horntell in your NodeJS applications.

## Requirements

**NodeJS 0.10.x or later.**

## Installation

You can install the SDK using NPM. Add this to your `package.json` file.

```json
{
	"dependencies": {
		"horntell": "0.1.x"
	}
}
```

Then, pull the package using the following command:

```
npm install
```

## Getting Started

You need to `init`ialize the SDK with the app's key and secret, which you can find in your account at [http://app.horntell.com](http://app.horntell.com). Sample usage looks like this.

```js
'use strict';

var horntell = require('horntell');

horntell.app.init('YOUR_APP_KEY', 'YOUR_APP_SECRET');

horntell.profile.create({
	uid : '1337',
	first_name : 'John',
	last_name : 'Doe',
	signedup_at : 1383350400
});
```

## Documentation

Please see [http://docs.horntell.com/api](http://docs.horntell.com/api/?node) for up-to-date documentation.
