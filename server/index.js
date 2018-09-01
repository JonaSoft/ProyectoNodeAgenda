const http = require('http'),
      express = require('express'),
      path = require('path'),     
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

let rutas = require('./routers/rutas.js');
let rutaimagenes = path.join(__dirname,'../') + '/client/img/';
let rutaestilos = path.join(__dirname,'../') + '/client/css/';
let rutajs = path.join(__dirname,'../') + '/client/js/';

const PORT = 3000
const app = express()

const Server = http.createServer(app)
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/agenda')


app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/',rutas)


app.use(express.static(rutaestilos));
app.use(express.static(rutaimagenes));
app.use(express.static(rutajs));

Server.listen(PORT, function() {
  console.log(`Servidor listo en el puerto: ${PORT}`); 
})
