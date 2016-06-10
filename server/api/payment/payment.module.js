import config from '../../config/environment';

var validator = require('validator');
var NodeRSA = require('node-rsa');
var Client = require('node-rest-client').Client;
var md5 = require('md5');

//global variables
var hdrs = {'Content-Type': 'application/x-www-form-urlencoded'};
var option_auth = {};
var body = {};
var url = '';

var Payments = function() {};

function make_input(input){
	var output = '';
	var bool = true;
	if(typeof input === 'object'){
		for (var p in input) {
			if (input.hasOwnProperty(p)) {
				if (typeof(input[p]) == 'string' || typeof(input[p]) == 'number') {
					if(bool){
						output = p+'='+input[p];
						bool = false;
					}else{
						output += '&'+p+'='+input[p];
					}
				}
			}
		}
	}
	return output;
}

function transact_post(callback) {
	var client = new Client(option_auth);
	var args = {
		data: make_input(body),
		headers: hdrs
	};
	option_auth = {};
	body = {};
	var req_time = new Date();
	client.post(url, args, function(data, res){
		if(res.statusCode == 404){
			return callback({code:404, error:'invalid_request', error_description:'possible invalid url'},404,1);
		}
		var res_time = new Date();
		var expire = req_time.getSeconds() - res_time.getSeconds();
		return callback(data, res.statusCode, expire);
	}).on('error',function(err){
		return callback({'code':500, 'error':'internal_error', 'error_description':'internal server down'},500,1);
	});
}

function trnact_url(method){
	switch (method) {
		case 'ANU':
			return config.payments.url+config.payments.prefix.auth+'/newUser';
			break;
		case 'ABA':
			return config.payments.url+config.payments.prefix.auth+'/addBankAccount';
			break;
		case 'VBA':
			return config.payments.url+config.payments.prefix.api+'/verifyBankAccount';
			break;
		case 'GPT':
			return config.payments.url+config.payments.prefix.auth+'/getPublicToken';
			break;
		case 'SLG':
			return config.payments.url+config.payments.prefix.log+'/successLog';
			break;
		case 'ELG':
			return config.payments.url+config.payments.prefix.log+'/errorLog';
			break;
		case 'WLG':
			return config.payments.url+config.payments.prefix.log+'/webhookLog';
			break;
		case 'FIL':
			return config.payments.url+config.payments.prefix.log+'/filterLog';
			break;
		case 'CBF':
			return config.payments.url+config.payments.prefix.api+'/collectBusinessFee';
			break;
		case 'AFI':
			return config.payments.url+config.payments.prefix.api+'/addFundsToIND';
			break;
		case 'WFI':
			return config.payments.url+config.payments.prefix.api+'/withdrawFundsFromIND';
			break;
		case 'COF':
			return config.payments.url+config.payments.prefix.api+'/collectOfferFunds';
			break;
		case 'SLF':
			return config.payments.url+config.payments.prefix.api+'/sendLoanFunds';
			break;
		case 'CBR':
			return config.payments.url+config.payments.prefix.api+'/chargeBorrowerRepayment';
			break;
		default:
			return config.payments.url;
			break;
	}
}

function auth_token_req(user, pass, callback){
	url = config.payments.url+config.payments.prefix.token;
	body = {grant_type:'password', username:user, password:pass};
	transact_post(function(data, code, time){
		if (code == 200){
			if (time <= 60){
				return callback(false, data);
			}else{
				return callback(true, {'code':'508','error':'response_timeout','error_description':'access_token request timeout'});
			}
		}else{
			return callback(true, data);
		}
	});
}

Payments.prototype.addNewUser = function(input, callback) {
  var client_id = config.payments.client.id;
	var client_password = config.payments.client.password;
	var user = config.payments.user;
	var pass = config.payments.password;
	option_auth = {user:config.payments.client.id, password:config.payments.client.password};
	delete hdrs.Authorization;

	var user_details = {};
	var account_details = {};
	var usrnme, usrpwd, usreml;
	var insnum, brnnum, accnum;

	if(!input.username){
		return callback(true, {'code':412,'error':'username','error_description':'username required'});
	}else{
		usrnme = validator.trim(input.username);
		if(!validator.isAlphanumeric(usrnme)){
			return callback(true, {'code':412,'error':'username','error_description':'username valid only letters and numbers'});
		}else if(!validator.isLength(usrnme, 5, 30)){
			return callback(true, {'code':412,'error':'username','error_description':'username should contain minimum of 5 or maximum of 20 characters'});
		}
	}

	if(!input.password){
		return callback(true, {'code':412,'error':'password','error_description':'password required'});
	}else{
		usrpwd = validator.trim(input.password);
		if(!validator.isLength(usrpwd, 8, 256)){
			return callback(true, {'code':412,'error':'password','error_description':'invalid password'});
		}
	}

	if(!input.email){
		return callback(true, {'code':412,'error':'email','error_description':'email required'});
	}else{
		usreml = validator.trim(input.email);
		if(!validator.isEmail(usreml)){
			return callback(true, {'code':412,'error':'email','error_description':'invalid email'});
		}else{
			user_details = {username:usrnme, password:usrpwd, email:encodeURIComponent(usreml)};
		}
	}

	if(!input.institution_number){
		return callback(true, {'code':412,'error':'institution_number','error_description':'institution_number required'});
	}else{
		insnum = validator.trim(input.institution_number);
		if(!validator.isNumeric(insnum) || !validator.isLength(insnum, 3, 3)){
			return callback(true, {'code':412,'error':'institution_number','error_description':'invalid institution_number'});
		}
	}

	if(!input.branch_number){
		return callback(true, {'code':412,'error':'branch_number','error_description':'branch_number required'});
	}else{
		brnnum = validator.trim(input.branch_number);
		if(!validator.isNumeric(brnnum) || !validator.isLength(brnnum, 4, 5)){
			return callback(true, {'code':412,'error':'branch_number','error_description':'invalid branch_number'});
		}
	}

	if(!input.account_number){
		return callback(true, {'code':412,'error':'account_number','error_description':'account_number required'});
	}else{
		accnum = validator.trim(input.account_number);
		if(!validator.isNumeric(accnum) || !validator.isLength(accnum, 1, 12)){
			return callback(true, {'code':412,'error':'account_number','error_description':'invalid account_number '});
		}
	}

	auth_token_req(config.payments.user, config.payments.password, function(err, res){
		if(!err){
			user_details.method = 'ADM';
			body = user_details;
			hdrs.Authorization = 'Bearer '+res.access_token;
			url = trnact_url('ANU');
			transact_post(function(data){
				if(data.code === 200){
					if(typeof data.public_token === 'string'){
						var key = new NodeRSA();
						var keydata = data.public_token;
						key.importKey(keydata,'pkcs8-public');
						insnum = key.encrypt(insnum,'base64','utf8');
						brnnum = key.encrypt(brnnum,'base64','utf8');
						accnum = key.encrypt(accnum,'base64','utf8');
						account_details = {institution_number:insnum, branch_number:brnnum, account_number:accnum, email:encodeURIComponent(usreml)};
						account_details.method = 'ADM';
						body = account_details;
						url = trnact_url('ABA');
						transact_post(function(response){
							if(response.code === 200){
								//response.public_token = keydata;
								response.description = 'bank account added successfully';
							}
							return callback(false, response);
						});
					}else{
						return callback(true,{'code':500,'error':'server_error','error_description':'authentication token error'});
					}
				}else{
					return callback(true, data);
				}
			});
		}else{
			return callback(true, res);
		}
	});
};

Payments.prototype.updateBankAccount = function(input,callback){
	var client_id = config.payments.client.id;
	var client_password = config.payments.client.password;
	var user = config.payments.user;
	var pass = config.payments.password;
	option_auth = {user:config.payments.client.id, password:config.payments.client.password};
	delete hdrs.Authorization;

	var account_details = {};
	var user_details = {};
	var insnum, brnnum, accnum, usreml;

	if (!input)
		return callback(true, {code:400, error:'invalid_request',error_description:'invaild or missing parameters'});

	if(input.email){
		usreml = validator.trim(input.email);
		if(!validator.isEmail(usreml))
			return callback(true, {'code':412,'error':'email','error_description':'invalid email'});
		else
			user_details = {email:usreml};
	}else{
		return callback(true, {'code':412,'error':'email','error_description':'email required'});
	}

	if(input.institution_number){
		insnum = validator.trim(input.institution_number);
		if(!validator.isNumeric(insnum) || !validator.isLength(insnum, 3, 3)){
			return callback(true, {'code':412,'error':'institution_number','error_description':'invalid institution_number'});
		}
	}else{
		return callback(true, {'code':412,'error':'institution_number','error_description':'institution_number required'});
	}

	if(input.branch_number){
		brnnum = validator.trim(input.branch_number);
		if(!validator.isNumeric(brnnum) || !validator.isLength(brnnum, 4, 5)){
			return callback(true, {'code':412,'error':'branch_number','error_description':'invalid branch_number'});
		}
	}else{
		return callback(true, {'code':412,'error':'branch_number','error_description':'branch_number required'});
	}

	if(input.account_number){
		accnum = validator.trim(input.account_number);
		if(!validator.isNumeric(accnum) || !validator.isLength(accnum, 1, 12)){
			return callback(true, {'code':412,'error':'account_number','error_description':'invalid account_number'});
		}
	}else{
		return callback(true, {'code':412,'error':'account_number','error_description':'account_number required'});
	}

	auth_token_req(config.payments.user, config.payments.password, function(err, res){
		if(!err){
			user_details.method = 'ADM';
			body = user_details;
			hdrs.Authorization = 'Bearer '+res.access_token;
			url = trnact_url('GPT');
			transact_post(function(data){
				if(data.code === 200){
					if(typeof data.public_token === 'string'){
						var key = new NodeRSA();
						var keydata = data.public_token;
						key.importKey(keydata,'pkcs8-public');
						insnum = key.encrypt(insnum,'base64','utf8');
						brnnum = key.encrypt(brnnum,'base64','utf8');
						accnum = key.encrypt(accnum,'base64','utf8');
						account_details = {institution_number:insnum, branch_number:brnnum, account_number:accnum, email:encodeURIComponent(usreml)};
						account_details.method = 'ADM';
						body = account_details;
						url = trnact_url('ABA');
						transact_post(function(response){
							if(response.code === 200)
								response.description = 'bank account updated successfully';
							return callback(false, response);
						});
					}else{
						return callback(true,{'code':500,'error':'server_error','error_description':'authentication token error'});
					}
				}else{
					return callback(true, data);
				}
			});
		}else{
			return callback(true, res);
		}
	});
}

Payments.prototype.performTransact = function(input, callback){
	var usrnme = '';
	var usrpwd = '';
	var usreml = '';
	var user_details = {};
	if(input.username && input.password && input.email){
		usrnme = validator.trim(input.username);
		usrpwd = validator.trim(input.password);
		usreml = validator.trim(input.email);
		if(!validator.isAlphanumeric(usrnme))
			return callback(true, {'code':412,'error':'username','error_description':'username valid only letters and numbers'});
		else if(!validator.isLength(usrnme, 5, 30))
			return callback(true, {'code':412,'error':'username','error_description':'username should contain minimum of 5 or maximum of 20 characters'});
		else if(!validator.isLength(usrpwd, 8, 256))
			return callback(true, {'code':412,'error':'password','error_description':'invalid password'});
		else if(!validator.isEmail(usreml))
			return callback(true, {'code':412,'error':'email','error_description':'invalid email'});
		else if(!input.method)
			return callback(false, {code:412, error:'method',error_description:'method required'});
	}else{
		return callback(true, {'code':400,'error':'invalid_request','error_description':'username or password or email required'});
	}

	if(!(input.business_name || input.first_name && input.last_name)){
		return callback(true, {'code':412,'error':'business_name','error_description':'business_name or first_name and last_name required'});
	}else{
		if(input.business_name){
			var usrbnm = validator.trim(input.business_name);
			user_details.business_name = usrbnm;
		}else if(input.first_name && input.last_name){
			var usrfnm = validator.trim(input.first_name);
			var usrlnm = validator.trim(input.last_name);
			user_details.first_name = usrfnm;
			user_details.last_name = usrlnm;
		}else{
			return callback(true, {'code':412,'error':'invalid_request','error_description':'business_name or first_name or last_name required'});
		}
	}

	var method_code = '';
	switch(input.method){
		case "CBF":
			method_code = "CBF";
			option_auth = {user:config.payments.business.id, password:config.payments.business.password};
			break;
		case "AFI":
			method_code = "AFI";
			option_auth = {user:config.payments.addFunds.id, password:config.payments.addFunds.password};
			break;
		case "WFI":
			method_code = "WFI";
			option_auth = {user:config.payments.withdrawFunds.id, password:config.payments.withdrawFunds.password};
			break;
		case "COF":
			method_code = "COF";
			option_auth = {user:config.payments.collectFunds.id, password:config.payments.collectFunds.password};
			break;
		case "SLF":
			method_code = "SLF";
			option_auth = {user:config.payments.sendFunds.id, password:config.payments.sendFunds.password};
			break;
		case "CBR":
			method_code = "CBR";
			option_auth = {user:config.payments.borrower.id, password:config.payments.borrower.password};
			break;
		default:
			method_code = false;
			break;
	}

	delete hdrs.Authorization;

	if(!method_code){
		return callback(false, {code:412, error:'method', error_description:'invalid method'});
	}

	usrpwd = md5(usrpwd);

	auth_token_req(usrnme, usrpwd, function(err, res){
		delete input.username;
		delete input.password;
		if(!err){
			hdrs.Authorization = 'Bearer '+res.access_token;
			url = trnact_url(method_code);
			body = input;
			transact_post(function(data){
				return callback(false, data);
			});
		}else{
			return callback(true, res);
		}
	});
}

Payments.prototype.getLogdetails = function(input, callback){
	if (!input.method)
		return callback(false, {code:412, error:'method',error_description:'method required'});

	var method_code = input.method;

	if(!(method_code === 'SLG' || method_code === 'ELG' || method_code === 'WLG')){
		return callback(false, {code:412, error:'method', error_description:'invalid method'});
	}

	option_auth = {user:config.payments.client.id, password:config.payments.client.password};
	delete hdrs.Authorization;
	auth_token_req(config.payments.user, config.payments.password, function(err, res){
		if(!err){
			hdrs.Authorization = 'Bearer '+res.access_token;
			url = trnact_url(method_code);
			body = {method:'ADM'};
			transact_post(function(data){
				return callback(false, data);
			});
		}else{
			return callback(true, res);
		}
	});
}

Payments.prototype.filterLogdetails = function(input, callback){
	var filters = {};
	if(!Object.keys(input).length)
		return callback(true, {code:400, error:'invalid_request', error_description:'missing filter parameters'});

	if('start_date' in input && 'end_date' in input){
		delete input.date;
		var start_date = new Date(input.start_date);
		var end_date = new Date(input.end_date);
		if(start_date != 'Invalid Date' && end_date != 'Invalid Date'){
			if(start_date >= end_date){
				return callback(true, {code:412, error:'start_date', error_description:'start_date should less than end_date'});
			}else{
				filters.start = input.start_date;
				filters.end = input.end_date;
			}
		}else{
			return callback(true, {code:412, error:'start_date', error_description:'invaild start_date or end_date'});
		}
	}

	if(input.date){
		delete input.start_date;
		delete input.end_date;
		if(new Date(input.date) != 'Invalid Date')
			filters.date = input.date;
		else
			return callback(true, {code:412, error:'date', error_description:'invaild date'});
	}

	if(input.status)
		filters.status = input.status;
	if(input.method)
		filters.type = input.method;
	if(input.token)
		filters.token = input.token;
	if(input.state)
		filters.state = input.state;
	if(input.email)
		filters.email = input.email;
	if(input.user_id)
		filters.user_id = input.user_id;
	if(input.offer_id)
		filters.offer_id = input.offer_id;
	if(input.loan_id)
		filters.loan_id = input.loan_id;
	if(input.repayment_id)
		filters.repayment_id = input.repayment_id;
	if(input.repayment_fees_id)
		filters.repayment_fees_id = input.repayment_fees_id;

	if(!Object.keys(filters).length)
		return callback(true, {code:400, error:'invalid_request', error_description:'missing or invaild filter parameters'});

	option_auth = {user:config.payments.client.id, password:config.payments.client.password};
	delete hdrs.Authorization;
	auth_token_req(config.payments.user, config.payments.password, function(err, res){
		if(!err){
			hdrs.Authorization = 'Bearer '+res.access_token;
			url = trnact_url('FIL');
			body = filters;
			body.method = 'ADM';
			transact_post(function(data){
				return callback(false, data);
			});
		}else{
			return callback(true, res);
		}
	});
}

Payments.prototype.verifyBankAccount = function(input, callback){
	var client_id = config.payments.client.id;
	var client_password = config.payments.client.password;
	var user = config.payments.user;
	var pass = config.payments.password;
	option_auth = {user:config.payments.client.id, password:config.payments.client.password};
	delete hdrs.Authorization;

	var user_details = {};
	var usreml,usrbun,usrbnm,usrfnm,usrlnm;

	if (!Object.keys(input).length)
		return callback(true, {code:400, error:'invalid_request',error_description:'invaild or missing parameters'});

	if(input.email){
		usreml = validator.trim(input.email);
		if(!validator.isEmail(usreml))
			return callback(true, {'code':412,'error':'email','error_description':'invalid email'});
		else
			user_details.email = usreml;
	}else{
		return callback(true, {'code':412,'error':'email','error_description':'email required'});
	}

	if(!input.user_id) {
		return callback(true, {'code':412,'error':'user_id','error_description':'user_id required'});
	} else {
		usrbun = validator.trim(input.user_id);
		user_details.user_id = usrbun;
	}

	if(!(input.business_name || input.first_name && input.last_name)){
		return callback(true, {'code':412,'error':'business_name','error_description':'business_name or first_name and last_name required'});
	}else{
		if(input.business_name){
			usrbnm = validator.trim(input.business_name);
			user_details.business_name = usrbnm;
		}else if(input.first_name && input.last_name){
			usrfnm = validator.trim(input.first_name);
			usrlnm = validator.trim(input.last_name);
			user_details.first_name = usrfnm;
			user_details.last_name = usrlnm;
		}else{
			return callback(true, {'code':412,'error':'invalid_request','error_description':'business_name or first_name or last_name required'});
		}

		option_auth = {user:config.payments.client.id, password:config.payments.client.password};
		delete hdrs.Authorization;
		auth_token_req(config.payments.user, config.payments.password, function(err, res){
			if(!err){
				hdrs.Authorization = 'Bearer '+res.access_token;
				url = trnact_url('VBA');
				body = user_details;
				body.method = 'ADM';
				transact_post(function(data){
					return callback(false, data);
				});
			}else{
				return callback(true, res);
			}
		});
	}
}

module.exports = Payments;
