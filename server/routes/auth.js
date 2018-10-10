import express from 'express'
import Debug from 'debug'
import {findUserByEmail, comparePasswords, createToken, users} from '../midlewares'
import {secret} from '../config'
const debug = new Debug('platzi-overflow:auth')
const app = express.Router()

const handleError = (res, error) => {
  return res.status(401).json({
    message: 'Login failed',
    error: error || 'Email and password dom\'t match'
  })
}
// POST api/auth/
app.post('/signin', (req, res, next) => {
  const { email, password } = req.body
  const user = findUserByEmail(email)
  if(!user) {
    debug(`User mail ${email} not found`)
    return handleError(res)
  }
  if(!comparePasswords(user, password)){
    debug(`Provided password ${password} not match with user password ${user.password}`)
    return handleError(res, 'Email and password does not match')
  }
  const token = createToken(user)
  res.status(200).json({
    message:'Login succeded',
    token,
    userId:user.userId,
    email:user.email,
    firstName: user.firstName,
    lastName: user.lastName
  })
})

app.post('/signup', (req, res) => {
  const {firstName, lastName, email, password} = req.body
  const user = {
    _id: +new Date(),
    firstName,
    lastName,
    email,
    password
  }
  users.push(user)
  const token = createToken(user)
  res.status(201).json({
    message: 'User saved',
    token,
    firstName,
    lastName,
    email
  })
})
export default app
