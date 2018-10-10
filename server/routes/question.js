import express from "express"
import Debug from 'debug'
import {questionMiddleware, questionsMiddleware, required} from '../midlewares'
const debug = Debug('platzi-overflow:questions')

const app = express.Router()
// GET /api/questions/
app.get('/', questionsMiddleware, (req, res)=>{
  res.status(200).json(req.questions)
})
// GET /api/questions/id
app.get('/:id', questionMiddleware, (req, res)=>{
  res.status(200).json(req.question)
})
// POST /api/questions/
app.post('/', required, questionsMiddleware, (req, res)=>{
  const question = req.body
  question._id = + new Date()
  question.createdAt = new Date()
  question.user = req.user
  req.questions.push(question)
  debug(req.questions)
  res.status(201).json(question)
})
// POST /api/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, (req, res)=>{
  const question = req.question
  const answer = req.body
  answer.user = req.user
  answer.createdAt = new Date()
  question.answers.push(answer)
  res.status(201).json(answer)
})
export default app
