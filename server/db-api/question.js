import { Question } from '../models'
import Debug from 'debug'
const debug = new Debug('platzi-overflow:db-api:question')
export default {
  findAll: async (sort = '-createdAt') => {
    return Question.find().populate('answers').sort(sort)
  },
  findById : async (_id) => {
    return Question.findOne({_id})
      .populate('user')
      .populate({
        path:'answers',
        options:{
          sort: '-createdAt'
        },
        populate:{
          path: 'user',
          model: 'User'
        }
      })
  },
  create: async (q) => {
    const question = new Question(q)
    return question.save()
  },
  createAnswer: async (q, a) => {
    const savedAnswer = await a.save()
    q.answers.push(savedAnswer)
    await q.save()
    return savedAnswer
  }
}
