let express = require('express')
let app = express()

let mongo = require('mongodb')
let mongoclient = mongo.MongoClient
let url = 'mongodb://localhost:27017/blog'

let path = require('path')
// db_func.post()
// db_func.update()
// db_func.find_all()
// db_func.find_one()
// db_func.delete_doc()
let db_func = require('./db.js')

// let glob = null
//
// let set_glob = function(docs) {
//   console.log('setting global');
//   glob = docs
// }

// connect to the mongo client
// mongoclient.connect(url, function(err, db) {
//   // assert.equal(null, err)
//   console.log('connected to db');
//   db.close()
//   console.log('closed db connection');
// })

// curl --data "user_id=123&post_id=123&title=darkside" localhost:3000/user/123/post/123/title/darkside
// app.post('/user/:user_id/post/:post_id/title/:title', function(req, res, next) {
//   console.log(req.params);
//   next()
// }, function(req, res) {
//   res.send(req.params)
// })

// handle request for all post json objects, query db and send data
app.get('/post(s)?/all', function(req, res) {
  mongoclient.connect(url, function(err, db) {
    // db_func.find_all() returns a promise to resolve the query data
    db_func.find_all('post', db).then(function(resolve, reject) {
      res.send(resolve)
      db.close()
    })
  })
})


// handle request for all user json objects, query db and send data
app.get('/user(s)?/all', function(req, res) {
  mongoclient.connect(url, function(err, db) {
    // find_all() returns a promise to resolve the data from the base
    db_func.find_all('user', db).then(function(resolve, reject) {
      res.send(resolve) // send the data as a response
      db.close()
    })
  })
})

// send the index
app.get('/', function(req, res, next) {
  console.log('got request from :', req.ip);
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

// send the style
app.get('/style.css', function(req, res) {
  console.log('got request for style css');
  res.sendFile(path.join(__dirname + '/public/css/style.css'))
})

// send the material components css
app.get('/material-components-web.css', function(req, res) {
  console.log('got request for material components css');
  res.sendFile(path.join(__dirname + '/' + 'node_modules/material-components-web/dist/material-components-web.css'))
})

// send materialize js to requester
app.get('/materialize.min.js', function(req, res) {
  console.log('got request for materialize js');
  res.sendFile(path.join(__dirname + '/' + 'node_modules/materialize-css/dist/js/materialize.min.js'))
})

// send materialize css to requester
app.get('/materialize.min.css', function(req, res) {
  console.log('got request for materialize js');
  res.sendFile(path.join(__dirname + '/' + 'node_modules/materialize-css/dist/css/materialize.min.css'))
})

// send the material components js
app.get('/material-components-web.js', function(req, res) {
  console.log('got request for material components web');
  res.sendFile(path.join(__dirname + '/' + 'node_modules/material-components-web/dist/material-components-web.js'))
})

// send jquery to requester
app.get('/jquery.min.js', function(req,res) {
  console.log('got request for jquery');
  res.sendFile(path.join(__dirname + '/' + 'node_modules/jquery/dist/jquery.min.js'))
})

app.get('/fonts/roboto/Roboto-Regular.woff2', function(req, res) {
  res.sendFile(path.join(__dirname + '/' + 'node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff2'))
})

app.get('/fonts/roboto/Roboto-Regular.woff', function(req, res) {
  res.sendFile(path.join(__dirname + '/' + 'node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff'))
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
