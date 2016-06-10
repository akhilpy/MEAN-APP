'use strict';

import _ from 'lodash';
import Transaction from '../transaction/transaction.model';

export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var reference = req.body['response[transaction_reference]'];
  var state = req.body.state;

  Transaction.findOneAndUpdate(
    {'details.transaction_reference': reference},
    {$set: { 'details.state':  state }},
    function(err, transaction) {
      if(err) {
        res.status(200).json({});
      }
      res.status(200).json(transaction);
    }
  );
}
