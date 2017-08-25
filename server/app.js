var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');
var md5 = require('blueimp-md5');

// Database, will refresh when restart
var messages = [];
var incrementalId = 0;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Allow", "*");
  next();
});

app.post('/sendMessage', sendMessage);
app.post('/sendMessage/:id', sendMessage);

app.get('/getMessages', getMessages);
app.get('/getMessages/:id', getMessages);
app.get('/getComments/:id', getComments);

app.get('/gravatarUrl', function(req, res) {
	res.send(mailToGravatar(req.query.mail));
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

/**
 * Send message with every checking
 * @param req
 * @param res
 */
function sendMessage(req, res){
	var _id = +req.params.id;
	var parentMsg = _.findWhere(messages, { _id : _id }) || null;	
	var message = new Message(req.body);
	var errors = message.isValidMessage();
	var toSaveMessage = null;
	
	if(!errors.length) {
		if(parentMsg || !req.params.id) {
			toSaveMessage = new Message({
				_id: ++incrementalId,
				mail: message.mail,
				gravatarUrl: mailToGravatar(message.mail),
				msg: message.msg,
				userName: message.userName,
				sendDate: new Date(),
				comments: []
			});
			if(parentMsg) {
				parentMsg.comments.push(toSaveMessage);
			} else {
				messages.push(toSaveMessage);
			}
		} else {
			errors.push('Cannot add comment to a comment, or not referenced id');
		}
		
	}
	if(errors.length) {
		res.status(500).send(errors);
	} else {
		res.send(toSaveMessage);
	}
}

/**
 * Get messages from ID, if ID falsy it returns every messages
 * @param req
 * @param res
 */
function getMessages(req, res) {
	var _id = +req.params.id;
	var endId = +req.query.end || undefined;
	var fromId = +req.query.from || 0;
	var msgToSend = [];
	
	var error = null;
	
	if(_id) {
		var message = _.findWhere(messages, { '_id' : _id });
		if(message) {
			msgToSend = message;
		} else {
			error = "The message is a comment or does not exist."
		}		
	} else {
		msgToSend = messages.slice(fromId, endId);
	}
	
	if(error) {
		res.status(500).send(error);
	} else {
		res.send(msgToSend);
	}		
}

/**
 * Get comments from request according to an ID
 * @param req
 * @param res
 */
function getComments(req, res) {
	var _id = +req.params.id;
	var endId = +req.query.end || undefined;
	var fromId = +req.query.from || 0;
	var comments = [];
	
	var error = null;
	
	if(_id) {
		var message = _.findWhere(messages, { _id : _id });
		if(message) {
			comments = message.comments.slice(fromId, endId);
		} else {
			error = "The message is a comment or does not exist."
		}		
	} else {
		error = "No message with that id"
	}
	
	if(error) {
		res.status(500).send(error);
	} else {
		res.send(comments);
	}		
}

/**
 * Message object
 * @param message
 * @constructor
 */
function Message(message){
	this._id = null;
	this.mail = '';
	this.gravatarUrl = '';
	this.msg = '';
	this.userName = '';
	this.sendDate = null;
	this.comments = [];

	_.extendOwn(this, message);

	this.isValidMessage = isValidMessage;

	/**
	 * Test length of fields "msg", "mail", "userName"
	 * @returns {Array}
	 */
	function isValidMessage() {
		var errors = [];
		testStringSizes('msg',message.msg, 5, 100, errors);
		testStringSizes('mail',message.mail, 3, 100, errors);
		testStringSizes('userName',message.userName, 3, 20, errors);
		return errors;
	}
}

/**
 * Test a string and return errors from size and existence
 * @param fieldName
 * @param str
 * @param min
 * @param max
 * @param errors
 */
function testStringSizes(fieldName, str, min, max, errors) {
	if(!str) {
		errors.push(fieldName + ' parameter is required');
	} else if(!_.isString(str)) {
		errors.push(fieldName + ' parameter must be string');
	} else {
		if(str.length < 5) {
			errors.push(fieldName + ' parameter is too little, min size : 5');
		}
		if(str.length > 100) {
			errors.push(fieldName + ' parameter is too long, max size : 100');
		}
	}
}

/**
 * Convert a mail address to a gravatar link
 * @param mail
 * @returns {string}
 */
function mailToGravatar(mail) {
	var mailMd5 = md5(mail);
	return 'http://www.gravatar.com/avatar/' + mailMd5 + '.jpg';
}