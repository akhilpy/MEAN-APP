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
    return res.send({message:{error:'invalid_request', error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }

	payments.addNewUser(req.body, function(err, data){
		var result = {};
		delete data.code;
		result.message = data;
		result.status = (err) ? 'error' : 'success';
		res.send(result);
	});
}

// updates a bank account
export function updateAccount(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
    return res.send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.updateBankAccount(req.body, function(err, data){
		var result = {};
		delete data.code;
		result.message = data;
		result.status = (err) ? 'error' : 'success';
		res.send(result);
	});
}

// creates a transaction
export function transaction(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
    return res.send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.performTransact(req.body, function(err, data){
		var result = {};
		if(data.code){
			delete data.code;
			result.message = data;
			result.status = (err) ? 'error' : 'success';
		}else{
			result = data;
		}
		res.send(result);
	});
}

// requests logs
export function logs(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
	  return res.send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.getLogdetails(req.body, function(err, data){
		console.log(err);
		var result = {};
		if(data.code){
			delete data.code;
			result.message = data;
			result.status = (err) ? 'error' : 'success';
		}else{
			result = data;
		}
		res.send(result);
	});
}

// requests filtered logs
export function logsFiltered(req, res) {
  if (!req.is('application/x-www-form-urlencoded')) {
	  return res.send({message:{error:'invalid_request',error_description:'Content type must be application/x-www-form-urlencoded.'}, status:'error'}).end;
  }
	payments.filterLogdetails(req.body, function(err, data){
		var result = {};
		if(data.code){
			result.message = data;
			result.status = (err) ? 'error' : 'success';
			result.status = (data.code !== 200) ? 'error' : 'success';
			delete data.code;
		}else{
			result = data;
		}
		res.send(result);
	});
}
