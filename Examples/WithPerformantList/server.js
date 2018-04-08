var express = require('express');
var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

/* serve static files */
app.use('/', express.static(__dirname , {maxAge: '1h'}));

/* Routing */
app.get('/', function (req, res, next) {
    res.sendFile('index.html', {root: __dirname});
});

app.set('port', (process.env.PORT || 9000));

app.listen(app.get('port'), function () {
    console.log('ready on port ' + app.get('port'));
});
