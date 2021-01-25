const fs = require("fs-extra");
const path = require('path');
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');

const express = require('express');
const app = express();

function main(port){

    app.get('/', (req, res) => {
        index(req, res);
    });

    app.get('/save',  (req, res) => {
        save(req, res);
    });

    app.get('/restore', (req, res) => {
        restore(req, res);
    });

    app.get('/init', (req, res) => {
        init(req, res);
    });

    app.get('/destroy', (req, res) => {
        destroy(req, res);
    });

    app.listen(port || 3800);

    console.log(kleur.green(`Starting FVC GUI server on. `) + kleur.yellow(`localhost:${port || 3800}`));
}

function index(req, res){
    res.send('FVC Archive Interface');
}

function save(req, res){
    res.send('SAVE');
}

function restore(req, res){
    res.send('RESTORE');
}

function init(req, res){
    res.send('INIT');
}

function destroy(req, res){
    res.send('DESTROY');
}

module.exports = {
    main,
};

