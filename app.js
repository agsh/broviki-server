/**
 * Created by Andrew D.Laptev<a.d.laptev@gmail.com> on 18.01.16.
 */

const config = require('config.json')
	, bodyParser = require('body-parser')
	, session = require('express-session')
	, express = require('express')
	, app = express()
	, NedbStore = require('connect-nedb-session')(session) // TODO replace
	;

app.use(session({
	secret: config.secret
	, resave: false
	, saveUninitialized: true
	, cookie: {
		path: '/'
		, secure: true
		, maxAge: 5 * 24 * 3600 * 1000
	}
	, store: new NedbStore({ filename: __dirname + '/db/sessions.db' })
}));

