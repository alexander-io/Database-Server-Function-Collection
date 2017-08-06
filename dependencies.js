let path = require('path')
// let express = require('express')
// let app = express()

exports.serve_dependencies = function(app){
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
}
