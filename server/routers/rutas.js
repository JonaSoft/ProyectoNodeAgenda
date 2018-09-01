const Router = require ('express').Router();
let session = require('express-session');
Router.use(session({
    secret:'Es un secreto',
    resave:true,
    saveUninitialized:true
}));




let path = require('path');
const usuarios = require('../models/modeloUsuario.js');
const eventos = require('../models/modeloEvento.js');



let viewsPath = path.join(__dirname,'../','../') + './client/';

Router.get('/', function(req, res) {
  res.sendFile(viewsPath + 'index.html')
})

Router.get('/main.html', function(req, res) {
  res.sendFile(viewsPath + "main.html");
});


Router.post('/login', function(req, res) {
    let correo = req.body.user;
    let password = req.body.pass;
    usuarios.find({email:correo, psw:password}).count().exec(function(err, count){
       if (count==1) {
            req.session.user= correo;
            
            res.send("Validado")
        }else{
            res.send("No Validado"+ count)
        }  
    })    
})



Router.get('/events/all', function(req, res) {
    eventos.find({email:req.session.user}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
})


Router.post('/events/delete/:eventId', function(req, res) {

    console.log(req.params.eventId);    
    eventos.remove({id:req.params.eventId}).exec(function(err){
        if (err) {           
            res.json(err)
        }
        res.json("Evento eliminado");
    })

})


Router.post('/events/new', function(req, res) {
        eventos.findOne({}).sort({id:-1}).exec(function(err, doc){
        idNuevo = doc.id+1;        
         let eventoNuevo = new eventos({
           id: idNuevo,
           title:req.body.title,
           allDay:req.body.allDay,
           start:  req.body.start,
           end: req.body.end,
           email: req.session.user
        });
        eventoNuevo.save(function(error) {        
            console.log(error);
            if (error) {
                    res.send("-1");    
            }
            res.send(""+idNuevo.toString());
            
        })                
    })     
})



Router.post('/events/update', function(req, res) {     
    res.send("Se ha actualizado el evento");
    eventos.update({id:req.body.id},{start:req.body.start, end:req.body.end}).then((rawResponse)=>{
        console.log (rawResponse);
        res.send("Se ha actualizado el evento");
    }).catch((err)=>{
        res.send("Ocurrio un error en la actualizacion");
    });
 
})



Router.post('/logout', function (req, res) {
  req.session.destroy();
  res.send("Sesión Cerrada!!!");
});


module.exports = Router

