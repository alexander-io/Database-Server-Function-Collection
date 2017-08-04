## Collection of Express & MongoDB Server/Database Common Functions

#### [Express JS](http://expressjs.com/ "Express")
#### [MongoDB](https://www.mongodb.com/ "Mongo")

```javascript
// $ npm init -fy && npm install --save express && npm install --save mongodb && touch serve.js

/*
 * serve.js
 */

let express = require('express'), mongo = require('mongodb'), url = 'mongodb://localhost:27017/blog'
let app = express(), mongoclient = mongo.MongoClient, port = 8080

// handle request for all posts in 'post' database collection
app.get('/post(s)?/all', function(req, res) {
  mongoclient.connect(url, function(err, db) {
    find_all('post', db).then(function(resolve, reject) {
      res.send(resolve)
      db.close()
    })
  })
})

// promise to resolve the database query for everything in specified collection
let find_all = function(collection_title, db) {
  return new Promise(function(resolve, reject) {
    db.collection(collection_title).find({}).toArray(function(err, docs) {
      docs ? resolve(docs) : reject(new Error('failed to resolve'))
    });
  })
}

app.listen(port, function(){
  console.log('I can hear', port);
})
```
