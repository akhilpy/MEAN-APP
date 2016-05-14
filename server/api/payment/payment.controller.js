/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/payments              ->  index
 * POST    /api/payments              ->  create
 * GET     /api/payments/:id          ->  show
 * PUT     /api/payments/:id          ->  update
 * DELETE  /api/payments/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Payment from './payment.model';
import Payments from './payment.module';

var payments = new Payments();

// adds a new bank account
export function addAccount(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
    return res.status(415).send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }

	payments.addNewUser(req.body, function(err, data){
    var result = {};
		if(data.code)
			res.status(data.code);
		if(data.code != 200){
			data[data.error] = data.error_description;
			delete data.error;
			delete data.error_description;
		}
		result.message = data;
		delete data.code;
		result.status = (err) ? 'error' : 'success';
		res.send(result);
	});
}

// updates a bank account
export function updateAccount(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
    return res.status(415).send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.updateBankAccount(req.body, function(err, data){
    var result = {};
		if(data.code)
			res.status(data.code);
		if(data.code != 200){
			data[data.error] = data.error_description;
			delete data.error;
			delete data.error_description;
		}
		delete data.code;
		result.message = data;
		result.status = (err) ? 'error' : 'success';
		res.send(result);
	});
}

// verifies a bank account
export function verifyAccount(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
    return res.status(415).send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.verifyBankAccount(req.body, function(err, data) {
		var result = {};
		if(data.code){
			res.status(data.code);
			result.status = (data.code == 200) ? 'success' : 'error';
			if(data.code != 200){
				data[data.error] = data.error_description;
				delete data.error;
				delete data.error_description;
			}
			delete data.code;
			result.message = data;
		}else{
			result = data;
		}
		res.send(result);
	});
}

// creates a transaction
export function transaction(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
    return res.status(415).send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.performTransact(req.body, function(err, data){
    var result = {};
		if(data.code){
			res.status(data.code);
			if(err)
				result.status = 'error';
			else
				result.status = (data.code == 200) ? 'success' : 'error';
			if(data.code != 200){
				data[data.error] = data.error_description;
				delete data.error;
				delete data.error_description;
			}
			res.status(data.code);
			delete data.code;
			result.message = data;
		}else{
			if(data.status)
				res.status = (data.status == 'error') ?  412: 200;
			result = data;
		}
		res.send(result);
	});
}

// requests logs
export function logs(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
	  return res.status(415).send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.getLogdetails(req.body, function(err, data){
    var result = {};
		if(data.code){
			if(err)
				result.status = 'error';
			else
				result.status = (data.code == 200) ? 'success' : 'error';
			if(data.code != 200){
				data[data.error] = data.error_description;
				delete data.error;
				delete data.error_description;
			}
			res.status(data.code);
			delete data.code;
			result.message = data;
		}else{
			result = data;
		}
		res.send(result);
	});
}

// requests filtered logs
export function logsFiltered(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
	  return res.status(415).send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.filterLogdetails(req.body, function(err, data){
    var result = {};
		if(data.code){
			result.message = data;
			if(err)
				result.status = 'error';
			else
				result.status = (data.code == 200) ? 'success' : 'error';
			res.status(data.code);
			delete data.code;
		}else{
			result = data;
		}
		res.send(result);
	});
}
