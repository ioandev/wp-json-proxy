import path from 'path'
require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env')
})

import latest from './helpers/latest'
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
    // throws if it can't find it
    config(website)

    res.type('json');

    res.write(await latest(website))
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
    // throws if it can't find it
    config(website)

    res.type('json');

    res.write(await latest(website))
    res.end()
  }
  catch(e) {
    console.log(e)
    res.json({"error": "Unexpected error has occured"})
  }
})

app.listen(port, async () => {
  for (const website of websites) {
      await latest(website)
  }
  
  console.log(`Example app listening at http://localhost:${port}`)
})