import http from 'http'

import path from 'path'
require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env')
})

import generateOutput from './outputGenerator'
import getLatest from './cache'

import { config, websites } from '../config'

const express = require('express')
var cors = require('cors')
const app = express()


const port = process.env.PORT
if (port == undefined) {
    throw "port env variable could not be found"
}

app.use(cors({
    origin: "*"
}))


app.get('/:website/all', async (req, res) => {
  const { website } = req.params
  try {
    let configNow = config(website)

    res.type('json');

    res.write(await getLatest(generateOutput(website)))
    res.end()
  }
  catch(e) {
    console.log(e)
    res.json({"error": "Unexpected error has occured"})
  }
})

app.get('/all', async (req, res) => {
  const website = "ioanblog"
  try {
    let configNow = config(website)

    res.type('json');

    res.write(await getLatest(generateOutput(website)))
    res.end()
  }
  catch(e) {
    console.log(e)
    res.json({"error": "Unexpected error has occured"})
  }
})

app.listen(port, async () => {
    for (const website of websites) {
        await getLatest(generateOutput(website))
    }
    
    console.log(`Example app listening at http://localhost:${port}`)
})


/*
async function server(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.url)
    
    if (req.url == "/favicon.ico") {
        res.statusCode = 400;
        res.end();
        return
    }
    
    if (req.url != "/all") {
        console.error(`Invalid url received: ${req.url}`)
        res.write(`Url ${req.url} not allowed.`)
        res.statusCode = 400;
        res.end();
        return
    }

    try {
        res.setHeader('Content-Type', 'application/json');
        res.write(await getLatest(generateOutput))
        res.end()
    } catch (ex) {
        console.error(`An error has occured: ${ex.message}`)
        res.write(`An error has occured.`)
        res.statusCode = 500;
        res.end();
    }
}

async function run() {

    let port = process.env.PORT
    if (port == undefined) {
        throw "port env variable could not be found"
    }
    console.log(`Listening on port ${port}`)
    http.createServer(server).listen(port);
}
console.log('process.argv', process.argv);
run()*/