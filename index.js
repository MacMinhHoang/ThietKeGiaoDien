var express = require('express'),
    exphbs = require('express-handlebars'),
    express_handlebars_sections = require('express-handlebars-sections'),
    bodyParser = require('body-parser'),
    path = require('path'),
    session = require('express-session');
//var wnumb = require('wnumb');

var handle404MDW = require('./middle-wares/handle404');

var startController = require('./controllers/startController'),
    HomePage = require('./controllers/HomePage'),
    Quiz = require('./controllers/Quiz'),
    PvP = require('./controllers/PvP'),
    Result = require('./controllers/Result');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'layout',
    layoutsDir: 'views/',
    helpers: {
        section: express_handlebars_sections(),
        // number_format: n => {
        //     var nf = wnumb({
        //         thousand: ','
        //     });
        //     return nf.to(n);
        // }
    }
}));

app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.redirect('/start');
});

app.use('/start', startController);

app.use('/home', HomePage);

app.use('/quiz', Quiz);

app.use('/pvp', PvP);

app.use('/result', Result);

app.use(handle404MDW);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});