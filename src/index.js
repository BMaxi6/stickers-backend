const fs = require('fs');
const stickers = require('./stickers-countries.json')
const bodyParser = require('body-parser')

const express = require('express');
const app = express();
const morgan=require('morgan');
const req = require('express/lib/request');
const res = require('express/lib/response');
 
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json())
 
//Nuestro primer WS Get
app.get('/', (req, res) => {    
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(stickers));
})

app.post('/save', (req, res) => {
    console.log(req.body)
    fs.writeFileSync(stickers, JSON.stringify(req.body));
    res.send('POST saved')
})
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});