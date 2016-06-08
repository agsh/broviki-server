/**
 * Created by Andrew D.Laptev<a.d.laptev@gmail.com> on 18.01.16.
 */

'use strict';

const 
	bodyParser = require('body-parser')
	, config = require('config.json')	
	, express = require('express')
	, session = require('express-session')
	, NedbStore = require('connect-nedb-session')(session) // TODO replace	
	;

let app = express()
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

var server = http.createServer(app);

server.listen(config.port);
server.on('error', onError);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}