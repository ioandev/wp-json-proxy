import http from 'http'

import path from 'path'
require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env' + (process.env.DEBUG ? ".dev" : ""))
})

import generateOutput from './outputGenerator'
import getLatest from './cache'

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
    await getLatest(generateOutput)

    let port = process.env.PORT
    if (port == undefined) {
        throw "port env variable could not be found"
    }
    console.log(`Listening on port ${port}`)
    http.createServer(server).listen(port);
}
console.log('process.argv', process.argv);
run()