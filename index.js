const {NlpManager} = require('node-nlp');
const express = require('express');
const manager = new NlpManager(({languages: ['es']}));

const app = express();
//contexto que va a tomar el modelo para contestar en el apartado de respuestas
manager.addDocument('es', 'Hola', 'saludo');
manager.addDocument('es', 'Que hay', 'saludo');
manager.addDocument('es', 'Como estas?', 'saludo');
manager.addDocument('es', 'Que rollo', 'saludo');
manager.addDocument('es', 'Buenos dias', 'saludo');
manager.addDocument('es', 'Informacion de la institucion', 'escuela');
manager.addDocument('es', 'Cuantas carreras tienen?', 'carrerasinf');
manager.addDocument('es', 'Cuales son esas carreras?', 'carrerasinf');



// agregar respuestas 
manager.addAnswer('es', 'saludo', 'Hola!');
manager.addAnswer('es', 'saludo', 'Que tal?');
manager.addAnswer('es', 'saludo', 'Buen dia!');
manager.addAnswer('es', 'saludo', 'Buenas noches!');
manager.addAnswer('es', 'saludo', 'Buenas tardes!');
manager.addAnswer('es', 'escuela', 'El ITSS inicia sus actividades el 4 de Septiembre del año 2000, en las instalaciones de la Escuela Primaria Lic. Tomas Garrido Canabal del Municipio de Teapa, Tabasco; con una matrícula inicial de 211 alumnos distribuidos en las 3 carreras que se ofertan: Lic. En Administración, Licenciatura en Informática e Ingeniería en Bioquímica, atendidos por 10 docentes y 17 administrativos. Actualmente en el ITSS se ofertan 7 carreras, todas a nivel de Ingeniería de las cuales 5 de ellas acreditadas en calidad de los programas académicos: Administración, Informática, Bioquímica, Electromecánica e Industrial; una más en proceso de acreditación: Agronomía.');
manager.addAnswer('es', 'carrerasinf', 'Siete ingenierias, de las cuales, 5 ya estan acreditadas');
manager.addAnswer('es', 'carrerasinf', 'Ing. Informatica, Ing. Electromecanica, Ing. Industrial, Ing. en Energias Renovables, Ing. en Administracion de empresas, Ing. Bioquimica y Ing. Agronomia.');

//entrenando al modelo
manager.train().then(async ()=>{
    manager.save();
    //ruta
    app.get('/bot', async (req, res)=> {
        let response = await manager.process('es', req.query.message);
        res.send(response.answer);
    });

    app.listen(3000);
    
    
});