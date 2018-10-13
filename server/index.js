import Debug from 'debug'
import app from './app'
import mongoose from "mongoose";
import {mongoUrl, port} from "./config";


const debug = Debug('platzi-overflow:root')
async function start() {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true})
  app.listen(port, ()=>{
    debug(`Escuchando desde el puerto ${port}`)
    console.log('Escuchando desde el puerto ' +port)
  })
}
start()
