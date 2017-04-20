'use strict';

function list (db, requestDef, callback) {
  db.request({
    method: 'GET',
    url: requestDef
  }, callback);
}

exports.list = list;
