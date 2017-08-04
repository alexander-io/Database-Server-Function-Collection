let assert = require('assert')

exports.post = function(entry, collection_title, db, callback) {
  let collection = db.collection(collection_title)
  collection.insert(entry, function(err, result) {
    assert.equal(err, null)
    // callback(result)
  })
}

/*
 * query, object with a property and value specified; ex : {post : 'build a computer'}
 * update_content, object with property and value specified; ex : {new_branch : 'new brannch is here'}
 * collection_title, title of the collection
 * db
 * callback
 */
exports.update = function(query, update_content, collection_title, db, callback) {
  let collection = db.collection(collection_title)

  collection.updateOne(query, { $set: update_content}, function(err, result) {
    if (result.result.nModified == 1) {
      console.log('modified one document successfully');
    } else if (result.result.n >= 1) {
      console.log('found ' + result.result.n + ' matching element, noting to update');
    } else { console.log('no matching element found for update'); }
    // console.log(result);
    if (callback) {
      callback(result);
    }
  })
}

exports.delete_doc = function(query, collection_title, db, callback) {
  let collection = db.collection(collection_title)

  collection.deleteOne(query, function(err, result) {
    console.log(result);
    if (callback) {
      callback(result)
    }
  })
}

// console.log('attempting to find');
// Get the documents collection
// Find some documents
// console.log(docs);

exports.find_all = function(collection_title, db, callback) {
  return new Promise(function(resolve, reject) {
    db.collection(collection_title).find({}).toArray(function(err, docs) {
      docs ? resolve(docs) : reject()
    });
  })
}

exports.find_one = function(query, collection_title, db, callback) {

  let collection = db.collection(collection_title)
  let ret_val = null


  ret_val = collection.find(query).toArray(function(err, docs) {
    if (callback) {
      callback(docs)
    }
    return docs
    // if (docs) {
    //   console.log('docs exist');
    //   resolve(docs)
    // }
    // reject()


  })
  return ret_val


}
