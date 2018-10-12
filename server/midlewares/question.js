import {question} from '../db-api'
import Debug from 'debug'
const debug = Debug('platzi-overflow:middleware:questions')
export const questionMiddleware = async (req, res, next) =>{
  const { id } = req.params
  debug(req.params)
  const q = await question.findById(id)
  req.question = q
  next()
}
