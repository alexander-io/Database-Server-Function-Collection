let express = require('express')
let app = express()

let mongo = require('mongodb')
let assert = require('assert')
let mongoclient = mongo.MongoClient


let url = 'mongodb://localhost:27017/blog'

mongoclient.connect(url, function(err, db) {
  assert.equal(null, err)
  console.log('connected to db');
  post({eh:'eh'}, 'post', db, console.log)

  update({eh:'eh'}, {meh:'asdasd'}, 'post', db)

  findDocuments('post', db)
  // console.dir(findDocuments('post', db));
  db.close()


})

let post = function(entry, collection_title, db, callback) {
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
let update = function(query, update_content, collection_title, db, callback) {
  let collection = db.collection(collection_title)

  collection.updateOne(query, { $set: update_content}, function(err, result) {
    if (result.result.nModified == 1) {
      console.log('modified one document successfully');
    } else if (result.result.n == 1) {
      console.log('found matching element, noting to update');
    } else { console.log('no matching element found for update'); }
    // console.log(result);
    if (callback) {
      callback(result);
    }
  })
}

let delete_doc = function(query, collection_title, db, callback) {
  let collection = db.collection(collection_title)

  collection.deleteOne(query, function(err, result) {
    console.log(result);
    if (callback) {
      callback(result)
    }
  })
}

var findDocuments = function(collection_title, db, callback) {
  console.log('attempting to find');
  // Get the documents collection
  var collection = db.collection(collection_title);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    if (callback) {
      callback(docs)
    }
    console.log(docs);
    return docs
  });
}



// curl --data "user_id=123&post_id=123&title=darkside" localhost:3000/user/123/post/123/title/darkside
app.post('/user/:user_id/post/:post_id/title/:title', function(req, res, next) {
  console.log(req.params);
  next()
}, function(req, res) {
  res.send(req.params)
})

// EXAMPLE of posting with $ curl
// curl --data "user_id=123" localhost:3000/users/:user_id
// app.post('/users/:user_id', function(req, res, next) {
//   console.log('request params : ', req.params);
//   next()
// }, function(req, res) {
//   res.send('hello world')
// })


app.listen(3000, function(){
  console.log('listening on port');
})
