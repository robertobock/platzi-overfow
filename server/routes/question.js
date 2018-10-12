import express from "express"
import Debug from 'debug'
import {required} from '../midlewares'
import {question} from '../db-api'
import {handleError} from '../utils'
const debug = Debug('platzi-overflow:questions')
import {questionMiddleware} from '../midlewares'
import {Answer, User} from "../models";
const app = express.Router()
// GET /api/questions/
app.get('/', async (req, res)=>{
  try{
    debug(req.query)
    const questions = await question.findAll(req.query.sort)
    res.status(200).json(questions)
  }catch(error) {
    handleError(error,res)
  }

})
// GET /api/questions/id
app.get('/:id', questionMiddleware, async (req, res)=>{
  try {
    res.status(200).json(req.question)
  }catch (error) {
    handleError(error,res)
  }

})
// POST /api/questions/
app.post('/', required, async (req, res)=>{
  const {title, description, icon} = req.body
  const q = {
    title,
    description,
    icon,
    user: req.user._id
  }
  try {
    const savedQuestion = await question.create(q)
    debug(`savedQuestion is ${savedQuestion}`)
    res.status(201).json(savedQuestion)
  }catch(error){
    handleError(error,res)
  }
})
// POST /api/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, async (req, res)=>{
  const q = req.question
  const {description} = req.body
  const a = new Answer({description, user: new User(req.user)})
  const answer = await question.createAnswer(q, a)
  res.status(201).json(answer)
})
export default app
