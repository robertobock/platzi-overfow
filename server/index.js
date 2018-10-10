import Debug from 'debug'
import app from './app'
import mongoose from "mongoose";
import {mongoUrl} from "./config";
const PORT = 3000;

const debug = Debug('platzi-overflow:root')
async function start() {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true })
  app.listen(PORT, ()=>{
    debug(`Escuchando desde el puerto ${PORT}`)
  })
}
start()
