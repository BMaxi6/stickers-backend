const fs = require('fs');
const stickers = require('./stickers-countries.json')
const path = 'src/stickers-countries.json'
const stickersFull = require('./stickers-full-countries.json')
const bodyParser = require('body-parser')
var cors = require('cors')

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
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json())
 
//Request
app.get('/', (req, res) => {    
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(stickers));
})

app.get('/full-obj', (req, res) => {    
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(stickersFull));
})

app.post('/save', (req, res) => {
    let objJs = JSON.stringify({
        countries: req.body.countries,
        dashboard: req.body.dashboard
    })
    try {
        fs.writeFileSync(path, objJs);
        console.log("File written successfully");
        res.send('POST saved')
    } catch(err) {
        console.error(err);
        res.status(400).send('POST CAN\'T BE SAVED')
    }
})
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});