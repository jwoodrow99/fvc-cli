const path = require('path');
const kleur = require('kleur');
const helper = require('./helper');
const bodyParser = require('body-parser');
const open = require('open');

// Command Files
const saveCMD = require('./app/save.js');
const restoreCMD = require('./app/restore.js');
const destroyCMD = require('./app/destroy.js');

const express = require('express');
const app = express();

function main(port){

    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        index(req, res);
    });

    app.get('/json', (req, res) => {
        json(req, res);
    });

    app.post('/save',  (req, res) => {
        save(req, res);
    });

    app.post('/restore', (req, res) => {
        restore(req, res);
    });

    app.post('/init', (req, res) => {
        init(req, res);
    });

    app.post('/destroy', (req, res) => {
        destroy(req, res);
    });

    app.listen(port || 3800);

    console.log(kleur.green(`Starting FVC GUI server on. `) + kleur.yellow(`localhost:${port || 3800}`));

    open(`http://localhost:${port || 3800}`);
}

function index(req, res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
}

function json(req, res){
    res.json(helper.readLog());
}

function save(req, res){
    saveCMD(req.body.message);
    res.status(200).json(helper.readLog());
}

function restore(req, res){
    if(req.body.full){
        restoreCMD.full(req.body.archive_id);
    } else {
        restoreCMD.restore(req.body.archive_id);
    }

    res.status(200).json(helper.readLog());
}

function destroy(req, res){
    destroyCMD(req.body.archive_id, true);
    res.status(200).json(helper.readLog());
}

module.exports = {
    main
};

