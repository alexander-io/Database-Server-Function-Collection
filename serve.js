let express = require('express')
let app = express()

let mongo = require('mongodb')
let mongoclient = mongo.MongoClient
let url = 'mongodb://localhost:27017/blog'
let path = require('path')

var bodyParser = require('body-parser');

// db_func.post()
// db_func.update()
// db_func.find_all()
// db_func.find_one()
// db_func.delete_doc()
let db_func = require('./db.js')
let dependencies = require('./dependencies.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

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

// curl --data "user=claybeard" localhost:3000/user/claybeard
app.post('/user', function(req, res) {
  console.log(req.body);
  let admin_password = 'totoro'

  if (req.body.admin_password == admin_password) {
    res.send(req.body)
  } else {
    res.send('incorrect pass')
  }
})

// send the index
app.get('/', function(req, res, next) {
  console.log('got request from :', req.ip);
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

// css, js, fonts, assets?
dependencies.serve_dependencies(app)


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
