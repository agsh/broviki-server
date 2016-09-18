/**
 * Created by Andrew D.Laptev<a.d.laptev@gmail.com> on 18.01.16.
 */

'use strict';

const config = require('./config')
	, bodyParser = require('body-parser')
	, session = require('express-session')
	, express = require('express')
	, app = express()
	, NedbStore = require('connect-nedb-session')(session) // TODO replace
	, expressJwt = require('express-jwt')
	, jwt = require('jsonwebtoken')
	;

/*app.use(session({
	secret: config.secret
	, resave: false
	, saveUninitialized: true
	, cookie: {
		path: '/'
		, secure: true
		, maxAge: 5 * 24 * 3600 * 1000
	}
	, store: new NedbStore({ filename: __dirname + '/db/sessions.db' })
}));*/

app.use('/api', expressJwt({secret: config.secret}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
	res.send('hello');
});

app.post('/authenticate', function (req, res) {
	//TODO validate req.body.username and req.body.password
	//if is invalid, return 401
	if (!(req.body.username === 'user' && req.body.password === 'password')) {
		res.send(401, 'Wrong user or password');
		return;
	}

	var profile = {
		first_name: 'John',
		last_name: 'Doe',
		email: 'john@doe.com',
		id: 123
	};

	// We are sending the profile inside the token
	var token = jwt.sign(profile, config.secret, { expiresInMinutes: 60*5 });

	res.json({ token: token });
});

app.get('/api/login', (req, res) => {
	res.send('login');
});

app.listen(45005);