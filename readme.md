## Collection of Server/Database Common Functions


```javascript

app.get('/post(s)?/all', function(req, res) {
  mongoclient.connect(url, function(err, db) {
    find_all('post', db).then(function(resolve, reject) {
      res.send(resolve)
      db.close()
    })
  })
})


let find_all = function(collection_title, db, callback) {
  return new Promise(function(resolve, reject) {
    db.collection(collection_title).find({}).toArray(function(err, docs) {
      docs ? resolve(docs) : reject()
    });
  })
}
```
