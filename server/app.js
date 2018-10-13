import express from 'express'
import bodyParser from 'body-parser'  // the name doesnt matter because im importing the default export from module
import { question, auth } from './routes'
import path from 'path'
const app = express()
if(process.env.NODE_ENV === 'development') {
  app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next()
  })
}

if(process.env.NODE_ENV === "production"){
  app.use('/', express.static(path.join(process.cwd(), 'dist/platy-overflow')))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/questions', question)
app.use('/api/auth', auth)
export default app
