module.exports.insertarRegistro = function (db, callback){
	var dbo = db.db("agenda");
	
	var myobj =([
			{id:1,nombre:"Carlos Barrera", email:"carlos_b@gmail.com",psw:"12345"}
		]);
	var myobj1 =([
			{id:1,titulo:"Visita a padres", allDay:false,start:"2018-09-20",end:"2018-09-20",email:"carlos_b@gmail.com"},
			{id:2,titulo:"Paseo al Parque", allDay:false,start:"2018-09-24",end:"2018-09-24",email:"carlos_b@gmail.com"}
		]);

	dbo.collection("usuarios").insert(myobj, function(err,res){
		if (err) throw err;
			console.log("Resultado: "+ myobj.length +" usuario(s) adicionado(s)");
	
	});
	dbo.collection("eventos").insert(myobj1, function(err,res){
		if (err) throw err;
			console.log("Resultado: "+ myobj1.length +" evento(s) adicionado(s)");
			console.log("Ahora invoca por consola al index.js. Adios...")
	})  
}