var express = require('express'),
    exphbs = require('express-handlebars'),
    express_handlebars_sections = require('express-handlebars-sections'),
    bodyParser = require('body-parser'),
    path = require('path');
//var wnumb = require('wnumb');

var handle404MDW = require('./middle-wares/handle404');

var homeController = require('./controllers/homeController');
var HomePage = require('./controllers/HomePage');
var Quiz = require('./controllers/Quiz');
var PvP = require('./controllers/PvP');

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

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use('/home', homeController);

app.get('/', (req, res) => {
    res.redirect('/homePage');
});

app.use('/homePage', HomePage);

app.get('/', (req, res) => {
    res.redirect('/quiz');
});

app.use('/quiz', Quiz);

app.get('/', (req, res) => {
    res.redirect('/pvp');
});

app.use('/pvp', PvP);

app.use(handle404MDW);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});