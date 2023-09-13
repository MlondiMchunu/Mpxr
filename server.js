var express = require('express')
var config = require('./server/configure')
var app = express()

//process.env.PORT is an environment setting set on actual machine
//for default port value to the server
app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app)

//app.get('/', function(req, res) {
//res.send('<h2>Hello World</h2>');
//console.log(req)
//console.log("Website loaded!")

/* while ('/') {
     count += 1
     console.log("Page loaded " + count + " times")
 }*/
//});
var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});