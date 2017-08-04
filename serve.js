let express = require('express')
let app = express()

let mongo = require('mongodb')
let assert = require('assert')
let mongoclient = mongo.MongoClient
let url = 'mongodb://localhost:27017/blog'

let db_func = require('./db.js')
// db_func.post()
// db_func.update()
// db_func.find_all()
// db_func.find_one()
// db_func.delete_doc()
let glob = null

let set_glob = function(docs) {
  console.log('setting global');
  glob = docs
}

// connect to the mongo client
// mongoclient.connect(url, function(err, db) {
//   // assert.equal(null, err)
//   console.log('connected to db');
//   db.close()
//   console.log('closed db connection');
// })



// curl --data "user_id=123&post_id=123&title=darkside" localhost:3000/user/123/post/123/title/darkside
app.post('/user/:user_id/post/:post_id/title/:title', function(req, res, next) {
  console.log(req.params);
  next()
}, function(req, res) {
  res.send(req.params)
})



app.get('/post/:post_title', function(req, res, next) {
  console.log(req.params);
  next()
}, function(req, res) {
  res.send(req.params)
})

app.get('/', function(req, res, next) {

  console.log('got request from :', req.ip);

  mongoclient.connect(url, function(err, db) {
    console.log('connected to db');
    let resolution = db_func.find_all('post', db)

    resolution.then(function(resolve, reject) {
      res.send(resolve)
      db.close()
    })
  })


  // access db returns a promise to resolve the database requested entry (if it exists)
  // let access_db = function() {
  //   return new Promise(function(resolve, reject) {
  //     mongoclient.connect(url, function(err, db) {
  //       console.log('connected to db');
  //
  //       // db_func.find_all('post', db, set_glob)
  //
  //       let find_all = function(collection_title, db, callback, resolve) {
  //         var collection = db.collection(collection_title);
  //         // Find some documents
  //         collection.find({}).toArray(function(err, docs) {
  //           resolve(docs)
  //         });
  //       }
  //
  //       find_all('post', db, set_glob, resolve)
  //
  //
  //
  //
  //       db.close()
  //       console.log('closed db connection');
  //       // next()
  //     })
  //   })
  // }

  // let a = access_db()
  // a.then(function(resolve, reject) {
  //   console.log('in promise');
  //   console.log(resolve[0]);
  //   res.send(resolve[0])
  //   // next()
  // })


  // res.send('hello world')

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
