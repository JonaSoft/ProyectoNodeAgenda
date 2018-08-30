var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Operaciones = require('./insertarUsuario.js');

MongoClient.connect(url, function(err,db){
	if (err)console.log(err)
		console.log("conexion establecida con la base de datos");
		Operaciones.insertarRegistro(db, function(error,result){
			if (err)console.log(err)
		});
db.close()
})